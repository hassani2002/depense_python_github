# 🌟 Budget Manager - Gestionnaire de Dépenses Personnel

Une application Django complète pour la gestion personnelle des dépenses, avec interface moderne et fonctionnalités avancées.

## 📁 Structure du Projet

```
projet_depenses/
├── 📂 frontend/              # Templates et fichiers statiques
│   ├── 📂 templates/          # Templates HTML
│   │   ├── 📂 base.html
│   │   ├── 📂 registration/
│   │   ├── 📂 comptes/
│   │   ├── 📂 core/
│   │   ├── 📂 categories/
│   │   ├── 📂 transactions/
│   │   ├── 📂 budgets/
│   │   ├── 📂 rapports/
│   │   └── 📂 notifications/
│   └── 📂 static/             # CSS, JS, images
│       ├── 📂 css/
│       ├── 📂 js/
│       └── 📂 img/
├── 📂 backend/               # Logique Django
│   ├── 📂 comptes/           # Gestion utilisateurs
│   ├── 📂 core/              # Dashboard principal
│   ├── 📂 categories/        # Gestion catégories
│   ├── 📂 transactions/       # Gestion transactions
│   ├── 📂 budgets/           # Gestion budgets
│   ├── 📂 rapports/          # Rapports et exports
│   ├── 📂 notifications/     # Système notifications
│   ├── 📂 projet_depenses/   # Configuration principale
│   ├── 📄 manage.py          # Script de gestion Django
│   └── 📄 db.sqlite3         # Base de données
└── 📄 README.md              # Documentation
```

## 🚀 Fonctionnalités Principales

### 🔐 **Authentification & Utilisateurs**
- ✅ Inscription avec validation
- ✅ Connexion sécurisée
- ✅ Profil utilisateur personnalisable
- ✅ Déconnexion avec redirection

### 📊 **Dashboard Principal**
- ✅ Vue d'ensemble des finances
- ✅ Graphiques interactifs (Chart.js)
- ✅ Statistiques en temps réel
- ✅ Résumé des revenus/dépenses

### 🏷️ **Gestion des Catégories**
- ✅ CRUD complet
- ✅ Icônes FontAwesome personnalisables
- ✅ Couleurs personnalisées
- ✅ Filtrage et recherche

### 💰 **Gestion des Transactions**
- ✅ Ajout/modification/suppression
- ✅ Types : revenus et dépenses
- ✅ Catégorisation automatique
- ✅ Pagination et filtrage

### 📈 **Gestion des Budgets**
- ✅ Budgets mensuels par catégorie
- ✅ Suivi en temps réel
- ✅ Alertes de dépassement
- ✅ Barres de progression visuelles

### 📑 **Rapports & Export**
- ✅ Rapports détaillés par période
- ✅ Export CSV et PDF
- ✅ Graphiques de répartition
- ✅ Statistiques comparatives

### 🔔 **Système de Notifications**
- ✅ Notifications automatiques
- ✅ Alertes de budget
- ✅ Messages système
- ✅ État lu/non lu

## 🛠️ **Technologies Utilisées**

### **Backend (Django)**
- 🐍 **Django 6.0.4** - Framework web
- 🗄️ **SQLite** - Base de données
- 🔐 **Django Auth** - Authentification
- 📊 **Django ORM** - Gestion BDD

### **Frontend**
- 🎨 **Bootstrap 5** - Framework CSS
- 🎯 **Font Awesome 6** - Icônes
- 📈 **Chart.js** - Graphiques
- 🌐 **HTML5/CSS3/JavaScript**

## 🚀 **Installation & Démarrage**

### **Prérequis**
- Python 3.14+
- Django 6.0+
- Navigateur web moderne

### **Démarrage rapide**
```bash
cd backend
py manage.py runserver
```

### **Accès**
- 🌐 **Application** : http://127.0.0.1:8000
- 🔧 **Admin** : http://127.0.0.1:8000/admin

## 👤 **Utilisateur de Test**

- **Nom d'utilisateur** : `yassir`
- **Mot de passe** : `Django123`

## 📱 **Navigation de l'Application**

1. **Accueil** (`/`) - Vue d'ensemble
2. **Dashboard** (`/dashboard/`) - Statistiques principales
3. **Catégories** (`/categories/`) - Gestion des catégories
4. **Transactions** (`/transactions/`) - Historique des opérations
5. **Budgets** (`/budgets/`) - Suivi budgétaire
6. **Rapports** (`/rapports/`) - Analyses et exports
7. **Notifications** (`/notifications/`) - Centre de notifications
8. **Profil** (`/profil/`) - Paramètres utilisateur

## 🎯 **Points Forts**

- ✅ **Architecture MVC** bien structurée
- ✅ **Design responsive** pour tous écrans
- ✅ **Interface moderne** et intuitive
- ✅ **Sécurité** intégrée (CSRF, authentification)
- ✅ **Performance** optimisée
- ✅ **Extensibilité** facile

## 🔄 **Mises à Jour**

- Version : 1.0.0
- Date : 03/05/2026
- Statut : ✅ Production Ready

## 📞 **Support**

L'application est **100% fonctionnelle** et prête pour la production !

---

**🎉 Budget Manager - Votre compagnon financier personnel**
