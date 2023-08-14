# Le memory

## Description

Aujourd'hui on va utiliser nos bases en HTML + CSS + Typescript pour faire un memory.
Un memory est un jeu de cartes dans lequel il faut retrouver les paires de cartes identiques.
Les cartes sont de dos. On décide de retourner les cartes en cliquant dessus.
On les retourne par groupe de 2. Si les 2 cartes sont identiques, elles restent retournées. Sinon, elles se retournent de nouveau et l'utilisateur doit se souvenir des cartes qu'il a déjà retournées. L'ordre ne change pas.

## Objectifs

Utiliser le Javascript dans le navigateur pour intéragir avec le DOM et l'utilisateur.
- selecteurs
- evenements
- manipulation du DOM
- requêtes HTTP

## Instructions

- Créer un nouveau projet avec vite en Vanilla + Typescript
```bash
npm init vite@latest
```
- Créer un bouton "Start" qui permet de lancer le jeu
    - Logger "Start" dans la console quand on clique sur le bouton
    - Supprimer le bouton "Start"
    - Créer un tableau de 16 cartes et stocker les 8 paires
    - Afficher les cartes dans le DOM avec des couleurs différentes
- Créer la logique du jeu
    - Retourner les cartes quand on clique dessus
    - Si les 2 cartes sont identiques, les laisser retournées
    - Si les 2 cartes sont différentes, les retourner de nouveau
    - Si toutes les cartes sont retournées, afficher un message de victoire

## Bonus

A la place des couleurs sur les cartes, afficher des images récupérées depuis une API.
https://dog.ceo/api/breeds/image/random

## Ressources



https://dog.ceo/dog-api/
