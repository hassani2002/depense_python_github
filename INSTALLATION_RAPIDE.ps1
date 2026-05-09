# Script PowerShell pour installation automatique
Write-Host "========================================" -ForegroundColor Green
Write-Host "Installation Python et démarrage projet" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Vérifier si Python est installé
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python est déjà installé : $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python n'est pas installé. Installation en cours..." -ForegroundColor Red
    Write-Host "Ouverture du Microsoft Store pour installer Python..." -ForegroundColor Yellow
    
    # Ouvrir le Microsoft Store
    Start-Process "ms-windows-store://pdp/?ProductId=9NRWMJP3717K"
    
    Write-Host ""
    Write-Host "Veuillez installer Python depuis le Store, puis réexécuter ce script." -ForegroundColor Yellow
    Write-Host "Appuyez sur une touche pour quitter..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Installer les dépendances
Write-Host ""
Write-Host "📦 Installation des dépendances Django..." -ForegroundColor Yellow
pip install django==4.2.7
pip install reportlab==4.0.4

# Configuration de la base de données
Write-Host ""
Write-Host "🗄️ Configuration de la base de données..." -ForegroundColor Yellow
python manage.py makemigrations
python manage.py migrate

# Créer le superutilisateur
Write-Host ""
Write-Host "👤 Création du compte administrateur..." -ForegroundColor Yellow
python manage.py createsuperuser

# Démarrer le serveur
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "🚀 APPLICATION DISPONIBLE SUR :" -ForegroundColor Green
Write-Host "http://127.0.0.1:8000/" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur." -ForegroundColor Yellow

python manage.py runserver
