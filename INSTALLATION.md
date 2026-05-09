# 📋 Guide d'Installation Python et Démarrage du Projet

## 🐍 Étape 1 : Installation Python (Windows)

### Méthode 1 : Via le Microsoft Store (Plus simple)
1. **Ouvrir le Microsoft Store** depuis le menu Démarrer
2. **Rechercher "Python 3.11"**
3. **Cliquer sur "Installer"**
4. **Attendre la fin de l'installation**

### Méthode 2 : Téléchargement manuel
1. **Aller sur** https://www.python.org/downloads/
2. **Télécharger Python 3.11 ou plus récent**
3. **Lancer l'installateur**
4. **TRÈS IMPORTANT** : Cocher ✅ **"Add Python to PATH"**
5. **Cliquer sur "Install Now"**

## 🧪 Vérification de l'installation

Ouvrez un **nouveau terminal** (ou PowerShell) et tapez :
```bash
python --version
pip --version
```

Si vous voyez les versions, Python est bien installé ! 🎉

## 📦 Étape 2 : Installation des dépendances Django

Dans votre terminal, naviguez vers le projet :
```bash
cd c:\Users\Rog\projet_depenses
```

Installez les packages nécessaires :
```bash
pip install django==4.2.7
pip install reportlab==4.0.4
```

## 🚀 Étape 3 : Démarrage de l'application

### 1. Créer la base de données
```bash
python manage.py makemigrations
python manage.py migrate
```

### 2. Créer un compte administrateur
```bash
python manage.py createsuperuser
```
- **Username** : Choisissez un nom d'utilisateur
- **Email** : Votre email
- **Password** : Choisissez un mot de passe (il ne s'affiche pas quand vous tapez)

### 3. Démarrer le serveur
```bash
python manage.py runserver
```

## 🌐 Accès à l'application

Une fois le serveur démarré, ouvrez votre navigateur :

- **Application principale** : http://127.0.0.1:8000/
- **Administration** : http://127.0.0.1:8000/admin/
- **Inscription** : http://127.0.0.1:8000/accounts/inscription/

## 🔧 Problèmes courants et solutions

### Problème : "Python n'est pas reconnu"
**Solution** : Redémarrez votre terminal après l'installation de Python

### Problème : "Permission refusée"
**Solution** : Exécutez le terminal en tant qu'administrateur

### Problème : "pip n'est pas reconnu"
**Solution** : Utilisez `python -m pip install` au lieu de `pip install`

### Problème : Le serveur ne démarre pas
**Solution** : Vérifiez que vous êtes dans le bon dossier `c:\Users\Rog\projet_depenses`

## ✅ Checklist de vérification

- [ ] Python 3.11+ installé
- [ ] Python ajouté au PATH
- [ ] Django installé
- [ ] ReportLab installé
- [ ] Makemigrations exécuté
- [ ] Migrate exécuté
- [ ] Superutilisateur créé
- [ ] Serveur démarré

## 🎯 Étapes rapides (si Python déjà installé)

```bash
cd c:\Users\Rog\projet_depenses
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

**🎉 Votre application sera fonctionnelle une fois ces étapes terminées !**
