import { createContext, useContext, useState, useEffect } from 'react';

const BudgetContext = createContext();

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

// Catégories prédéfinies
const defaultCategories = [
  { id: '1', name: 'Alimentation', color: '#EF4444', icon: 'shopping-cart' },
  { id: '2', name: 'Transport', color: '#3B82F6', icon: 'car' },
  { id: '3', name: 'Logement', color: '#10B981', icon: 'home' },
  { id: '4', name: 'Loisirs', color: '#F59E0B', icon: 'film' },
  { id: '5', name: 'Santé', color: '#EC4899', icon: 'heart' },
  { id: '6', name: 'Éducation', color: '#8B5CF6', icon: 'book' },
  { id: '7', name: 'Shopping', color: '#06B6D4', icon: 'bag' },
  { id: '8', name: 'Autres', color: '#6B7280', icon: 'more-horizontal' },
];

// Moyens de paiement
const paymentMethods = [
  { id: 'cash', name: 'Espèces' },
  { id: 'card', name: 'Carte bancaire' },
  { id: 'transfer', name: 'Virement' },
  { id: 'check', name: 'Chèque' },
  { id: 'other', name: 'Autre' },
];

export function BudgetProvider({ children }) {
  // États
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [budgets, setBudgets] = useState({});
  const [monthlyBudget, setMonthlyBudget] = useState(2000);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Chargement des données depuis localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedCategories = localStorage.getItem('categories');
    const savedBudgets = localStorage.getItem('budgets');
    const savedMonthlyBudget = localStorage.getItem('monthlyBudget');
    const savedUser = localStorage.getItem('currentUser');

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
    if (savedMonthlyBudget) setMonthlyBudget(parseFloat(savedMonthlyBudget));
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Sauvegarde dans localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('monthlyBudget', monthlyBudget.toString());
  }, [monthlyBudget]);

  // Authentification
  const login = (email, password) => {
    // Simulation d'authentification (à remplacer par une vraie auth backend)
    const user = { email, name: email.split('@')[0] };
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  // CRUD Transactions
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updatedData } : t)
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // CRUD Catégories
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id, updatedData) => {
    setCategories(prev =>
      prev.map(c => c.id === id ? { ...c, ...updatedData } : c)
    );
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Gestion des budgets
  const setCategoryBudget = (categoryId, amount) => {
    setBudgets(prev => ({ ...prev, [categoryId]: amount }));
  };

  const removeCategoryBudget = (categoryId) => {
    setBudgets(prev => {
      const newBudgets = { ...prev };
      delete newBudgets[categoryId];
      return newBudgets;
    });
  };

  // Calculs et statistiques
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const getMonthlyTransactions = (month = getCurrentMonth()) => {
    return transactions.filter(t => t.date.startsWith(month));
  };

  const getTotalExpenses = (month = getCurrentMonth()) => {
    return getMonthlyTransactions(month)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const getRemainingBudget = (month = getCurrentMonth()) => {
    return monthlyBudget - getTotalExpenses(month);
  };

  const getExpensesByCategory = (month = getCurrentMonth()) => {
    const monthlyTrans = getMonthlyTransactions(month);
    const expenses = {};
    
    monthlyTrans.forEach(t => {
      if (!expenses[t.categoryId]) {
        expenses[t.categoryId] = 0;
      }
      expenses[t.categoryId] += parseFloat(t.amount);
    });
    
    return expenses;
  };

  const getCategoryBudgetProgress = (categoryId, month = getCurrentMonth()) => {
    const budget = budgets[categoryId] || 0;
    if (budget === 0) return null;
    
    const expenses = getExpensesByCategory(month);
    const spent = expenses[categoryId] || 0;
    
    return {
      budget,
      spent,
      percentage: Math.round((spent / budget) * 100),
      remaining: budget - spent,
    };
  };

  const isBudgetExceeded = (categoryId, month = getCurrentMonth()) => {
    const progress = getCategoryBudgetProgress(categoryId, month);
    return progress && progress.percentage >= 100;
  };

  const getTransactionsByPeriod = (startDate, endDate) => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  };

  // Export CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Montant', 'Catégorie', 'Moyen de paiement'];
    const rows = transactions.map(t => {
      const category = categories.find(c => c.id === t.categoryId);
      const payment = paymentMethods.find(p => p.id === t.paymentMethod);
      return [
        t.date,
        `"${t.description}"`,
        t.amount,
        category?.name || 'Inconnue',
        payment?.name || 'Inconnu',
      ].join(',');
    });
    
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${getCurrentMonth()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const value = {
    // États
    transactions,
    categories,
    budgets,
    monthlyBudget,
    currentUser,
    isAuthenticated,
    paymentMethods,
    
    // Authentification
    login,
    logout,
    
    // CRUD Transactions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    
    // CRUD Catégories
    addCategory,
    updateCategory,
    deleteCategory,
    
    // Budgets
    setMonthlyBudget,
    setCategoryBudget,
    removeCategoryBudget,
    
    // Calculs
    getCurrentMonth,
    getMonthlyTransactions,
    getTotalExpenses,
    getRemainingBudget,
    getExpensesByCategory,
    getCategoryBudgetProgress,
    isBudgetExceeded,
    getTransactionsByPeriod,
    
    // Export
    exportToCSV,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}
