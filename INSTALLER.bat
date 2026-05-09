@echo off
echo ========================================
echo Installation Python et demarrage projet
echo ========================================
echo.

echo 1. Verification de l'installation Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python n'est pas installe. Installation en cours...
    echo.
    echo Ouverture du Microsoft Store pour installer Python...
    start ms-windows-store://pdp/?ProductId=9NRWMJP3717K
    echo.
    echo Veuillez installer Python depuis le Store, puis reexecuter ce script.
    echo Appuyez sur une touche pour quitter...
    pause >nul
    exit /b 1
)

echo Python est deja installe !
echo.

echo 2. Installation des dependances Django...
pip install django==4.2.7
pip install reportlab==4.0.4

echo.
echo 3. Configuration de la base de donnees...
python manage.py makemigrations
python manage.py migrate

echo.
echo 4. Creation du compte administrateur...
python manage.py createsuperuser

echo.
echo 5. Demarrage du serveur...
echo.
echo ========================================
echo APPLICATION DISPONIBLE SUR :
echo http://127.0.0.1:8000/
echo ========================================
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur.
echo.

python manage.py runserver

pause
