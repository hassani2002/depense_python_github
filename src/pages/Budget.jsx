import { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { getCategoryIcon } from '../utils/icons';
import { Plus, Edit, Trash2, X, AlertTriangle } from 'lucide-react';

export function Budget() {
  const {
    monthlyBudget,
    setMonthlyBudget,
    budgets,
    categories,
    setCategoryBudget,
    removeCategoryBudget,
    getCategoryBudgetProgress,
    getCurrentMonth,
    getTotalExpenses,
    getExpensesByCategory,
  } = useBudget();

  const [isEditingMonthly, setIsEditingMonthly] = useState(false);
  const [monthlyBudgetValue, setMonthlyBudgetValue] = useState(monthlyBudget.toString());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryBudgetValue, setCategoryBudgetValue] = useState('');

  const currentMonth = getCurrentMonth();
  const totalExpenses = getTotalExpenses(currentMonth);
  const expensesByCategory = getExpensesByCategory(currentMonth);

  // Mettre à jour le budget mensuel
  const handleUpdateMonthlyBudget = (e) => {
    e.preventDefault();
    const value = parseFloat(monthlyBudgetValue);
    if (value > 0) {
      setMonthlyBudget(value);
      setIsEditingMonthly(false);
    }
  };

  // Ouvrir modal pour budget catégorie
  const handleSetCategoryBudget = (category) => {
    setSelectedCategory(category);
    setCategoryBudgetValue(budgets[category.id]?.toString() || '');
    setIsModalOpen(true);
  };

  // Sauvegarder budget catégorie
  const handleSaveCategoryBudget = (e) => {
    e.preventDefault();
    const value = parseFloat(categoryBudgetValue);
    if (value > 0 && selectedCategory) {
      setCategoryBudget(selectedCategory.id, value);
      setIsModalOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion budgétaire</h1>
          <p className="text-gray-500">Définissez et suivez vos budgets</p>
        </div>
      </div>

      {/* Budget mensuel global */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Budget mensuel global</h2>
          {!isEditingMonthly ? (
            <button
              onClick={() => setIsEditingMonthly(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Modifier
            </button>
          ) : null}
        </div>

        {!isEditingMonthly ? (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{monthlyBudget.toFixed(2)} €</span>
            <span className="text-gray-500">/ mois</span>
          </div>
        ) : (
          <form onSubmit={handleUpdateMonthlyBudget} className="flex gap-3">
            <input
              type="number"
              step="0.01"
              min="0"
              value={monthlyBudgetValue}
              onChange={(e) => setMonthlyBudgetValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Valider
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditingMonthly(false);
                setMonthlyBudgetValue(monthlyBudget.toString());
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
          </form>
        )}

        {/* Progression du budget global */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Dépensé: {totalExpenses.toFixed(2)} €</span>
            <span className={`font-medium ${totalExpenses > monthlyBudget ? 'text-red-600' : 'text-green-600'}`}>
              {(monthlyBudget - totalExpenses).toFixed(2)} € restants
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                totalExpenses > monthlyBudget ? 'bg-red-500' : 
                totalExpenses > monthlyBudget * 0.8 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((totalExpenses / monthlyBudget) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Budgets par catégorie */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Budgets par catégorie</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => {
            const progress = getCategoryBudgetProgress(category.id, currentMonth);
            const spent = expensesByCategory[category.id] || 0;
            const hasBudget = progress !== null;

            return (
              <div
                key={category.id}
                className={`p-4 rounded-lg border ${
                  hasBudget && progress.percentage >= 100
                    ? 'bg-red-50 border-red-200'
                    : hasBudget && progress.percentage >= 90
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleSetCategoryBudget(category)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {hasBudget && (
                      <button
                        onClick={() => removeCategoryBudget(category.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {hasBudget ? (
                  <>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{progress.spent.toFixed(0)}</span>
                      <span className="text-sm text-gray-500">/ {progress.budget.toFixed(0)} €</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          progress.percentage >= 100 ? 'bg-red-500' :
                          progress.percentage >= 90 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{progress.percentage}% utilisé</span>
                      {progress.percentage >= 90 && (
                        <AlertTriangle className={`w-3 h-3 ${progress.percentage >= 100 ? 'text-red-600' : 'text-yellow-600'}`} />
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleSetCategoryBudget(category)}
                    className="w-full py-2 text-sm text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    + Définir un budget
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de définition de budget */}
      {isModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Budget pour {selectedCategory.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategoryBudget} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Montant du budget (€)
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={categoryBudgetValue}
                  onChange={(e) => setCategoryBudgetValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              {budgets[selectedCategory.id] && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Budget actuel: <strong>{budgets[selectedCategory.id].toFixed(2)} €</strong>
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {budgets[selectedCategory.id] ? 'Modifier' : 'Définir'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
