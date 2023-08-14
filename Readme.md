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

- Vous réaliserez ce travail par groupes de 2 développeurs
- Travaillez sur un repository github partagé
- Créer un wireframe pour le jeu
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
- Mise en ligne sur Vercel
    - Créer un compte sur Vercel
    - Lier le projet github
    - Déployer le projet
    - Tester le jeu en ligne

## Bonus

A la place des couleurs sur les cartes, afficher des images récupérées depuis une API.
https://dog.ceo/api/breeds/image/random

## Rendu

- Lien vers le repository github
- Lien vers le jeu en ligne (lien Vercel)

## Ressources

```html
<body>
    <h1>Memory</h1>
    <button id="init-button">Commencer une nouvelle partie</button>
    <div id="app"></div>
    <img id="image-chat" alt="image de chien">
    <script type="module" src="/src/main.ts"></script>
</body>
```

```ts
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];

// Attention aux "as" qui règlent pas mal de soucis
const app = document.querySelector('#app') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;

let cpt = 0;

// Promises
fetch("https://dog.ceo/api/breeds/image/random")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
    document.querySelector("#image-chat")?.setAttribute("src", data.message);
})

// Add an event listener
btnStart.addEventListener("click", () => {
    init();
});

function init(){
    console.log('init')
    btnStart.remove();
    cpt++;
    app.innerHTML = `
        <p>${cpt}</p>
        <button id="init-button">Nouveau Click</button>
    `;

    const tiles = new Array(16).fill('').map( (_, i) => {
        const tile = document.createElement("div")
        tile.setAttribute("class", "tile")
        tile.style.width ="50px"
        tile.style.height = "50px"
        tile.style.backgroundColor = colors[Math.floor(i/2)]
        return tile
    })
    // Shuffle the tiles
    tiles.sort( () => Math.random() - 0.5)
    
    // Add the tiles to the app
    tiles.forEach( tile => app.appendChild(tile))

    let nodeList = document.querySelectorAll(".tile");
    let elements = Array.from(nodeList);
    elements.forEach( (element) => {
        element.setAttribute("class", "not-revvealed")
        element.addEventListener("click", () => {
            element.setAttribute("class", "revealed")
        })
    })
    
    // Add an event listener
    const newBtnStart = document.querySelector("#init-button") as HTMLButtonElement;
    newBtnStart.addEventListener("click", () => {
        init();
    });
}

```
- https://dog.ceo/dog-api/
