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

    // Add an event listener
    const newBtnStart = document.querySelector("#init-button") as HTMLButtonElement;
    newBtnStart.addEventListener("click", () => {
        init();
    });
}
