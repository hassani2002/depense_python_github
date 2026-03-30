import { useBudget } from '../context/BudgetContext';
import { getCategoryIcon } from '../utils/icons';
import { PieChart, TrendingUp, Wallet, AlertTriangle } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export function Dashboard() {
  const {
    monthlyBudget,
    getTotalExpenses,
    getRemainingBudget,
    getExpensesByCategory,
    categories,
    getCategoryBudgetProgress,
    getCurrentMonth,
    transactions,
  } = useBudget();

  const currentMonth = getCurrentMonth();
  const totalExpenses = getTotalExpenses(currentMonth);
  const remaining = getRemainingBudget(currentMonth);
  const expensesByCategory = getExpensesByCategory(currentMonth);
  const percentageUsed = Math.round((totalExpenses / monthlyBudget) * 100);

  // Données pour le graphique circulaire
  const pieData = Object.entries(expensesByCategory).map(([categoryId, amount]) => {
    const category = categories.find(c => c.id === categoryId);
    return {
      name: category?.name || 'Inconnue',
      value: amount,
      color: category?.color || '#6B7280',
    };
  });

  // Données pour l'histogramme (top catégories)
  const barData = pieData
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Vérifier les dépassements de budget
  const exceededBudgets = categories
    .filter(cat => {
      const progress = getCategoryBudgetProgress(cat.id, currentMonth);
      return progress && progress.percentage >= 90;
    })
    .map(cat => ({
      ...cat,
      progress: getCategoryBudgetProgress(cat.id, currentMonth),
    }));

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500">{currentMonth}</p>
        </div>
      </div>

      {/* Cartes de résumé */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Budget mensuel */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Budget mensuel</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyBudget.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total dépenses */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Dépensé ce mois</p>
              <p className="text-2xl font-bold text-gray-900">{totalExpenses.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Reste à dépenser */}
        <div className={`rounded-xl shadow-sm p-6 border ${remaining >= 0 ? 'bg-white border-gray-100' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Reste à dépenser</p>
              <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {remaining.toFixed(2)} €
              </p>
            </div>
            <div className={`p-3 rounded-lg ${remaining >= 0 ? 'bg-green-100' : 'bg-red-200'}`}>
              <PieChart className={`w-6 h-6 ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
        </div>

        {/* Pourcentage utilisé */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Budget utilisé</p>
              <p className="text-2xl font-bold text-gray-900">{percentageUsed}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${percentageUsed > 100 ? 'bg-red-500' : percentageUsed > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Alertes de budget */}
      {exceededBudgets.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800">Alertes budget</h3>
              <ul className="mt-2 space-y-1">
                {exceededBudgets.map(item => (
                  <li key={item.id} className="text-sm text-yellow-700">
                    <strong>{item.name}</strong>: {item.progress.percentage}% utilisé
                    {item.progress.percentage >= 100 && ' (Dépassé!)'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Graphiques et répartition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique circulaire */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Répartition par catégorie</h2>
          {pieData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              Aucune donnée ce mois-ci
            </div>
          )}
        </div>

        {/* Histogramme */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 des dépenses</h2>
          {barData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              Aucune donnée ce mois-ci
            </div>
          )}
        </div>
      </div>

      {/* Transactions récentes */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Transactions récentes</h2>
        {recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Catégorie</th>
                  <th className="pb-3 font-medium">Paiement</th>
                  <th className="pb-3 font-medium text-right">Montant</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(transaction => {
                  const category = categories.find(c => c.id === transaction.categoryId);
                  return (
                    <tr key={transaction.id} className="border-b last:border-0">
                      <td className="py-3 text-sm text-gray-900">{transaction.date}</td>
                      <td className="py-3 text-sm text-gray-900">{transaction.description}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: category?.color }}
                          />
                          {category?.name || 'Inconnue'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500 capitalize">
                        {transaction.paymentMethod}
                      </td>
                      <td className="py-3 text-sm font-semibold text-right text-red-600">
                        -{parseFloat(transaction.amount).toFixed(2)} €
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            Aucune transaction récente
          </div>
        )}
      </div>
    </div>
  );
}
