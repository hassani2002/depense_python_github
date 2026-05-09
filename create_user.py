#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projet_depenses.settings')
django.setup()

from django.contrib.auth.models import User

# Créer l'utilisateur yassir avec le mot de passe Django123
try:
    user = User.objects.create_user(username='yassir', password='Django123')
    print('✅ Utilisateur "yassir" créé avec succès !')
    print(f'   Nom d\'utilisateur: yassir')
    print(f'   Mot de passe: Django123')
except Exception as e:
    print(f'❌ Erreur lors de la création de l\'utilisateur: {e}')
