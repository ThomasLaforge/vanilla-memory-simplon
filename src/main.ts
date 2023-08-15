let timeoutId: number;
let nbCoups = 0;
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];

// Attention aux "as" qui règlent pas mal de soucis
const app = document.querySelector('#app') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;

const tilesDOM = document.createElement('div') as HTMLDivElement;
tilesDOM.classList.add('tiles');
app.append(tilesDOM)

// Promises
// fetch("https://dog.ceo/api/breeds/image/random")
// .then((response) => {
//     return response.json();
// })
// .then((data) => {
//     console.log(data);
//     document.querySelector("#image-chat")?.setAttribute("src", data.message);
// })

// Add an event listener
btnStart?.addEventListener("click", () => {
    init();
});

async function init(){
    console.log('init')
    nbCoups = 0;
    btnStart.remove();
    document.querySelectorAll(".tile").forEach( (element) => {
        element.remove();
    })

    // const tiles = new Array(16).fill('').map( (_, i) => {
    //     const tile = document.createElement("div")
    //     tile.classList.add("tile")
    //     tile.classList.add(colors[Math.floor(i / 2)])
    //     return tile
    // })

    let tiles = await Promise.all(
        new Array(8).fill('').map( async () => {
            const response = await fetch("https://dog.ceo/api/breeds/image/random")
            const data = await response.json()
            const tile = document.createElement("div")
            tile.style.backgroundImage = "url('"+data.message+"')"
            tile.classList.add("tile")
            tile.classList.add("not-revealed")

            return tile
        })
    )

    tiles = tiles.reduce( (global, tile) => [...global, tile, tile.cloneNode(true) as HTMLDivElement], [] as HTMLDivElement[])
    // Shuffle the tiles
    tiles.sort( () => Math.random() - 0.5)
    
    // Add the tiles to the app
    tiles.forEach( tile => app.appendChild(tile))

    // Select multiple elements
    let nodeList = document.querySelectorAll(".tile");
    let elements = Array.from(nodeList);
    elements.forEach( (element) => {        
        element.addEventListener("click", () => {
            if(element.classList.contains("revealed")){
                element.classList.remove("revealed")
                element.classList.add("not-revealed")
            } else {
                let revealed = document.querySelectorAll(".revealed")

                if(revealed.length === 2){
                    clearTimeout(timeoutId)
                    document.querySelectorAll(".revealed").forEach( (element) => {
                        element.classList.remove("revealed")
                        element.classList.add("not-revealed")
                    })
                }

                element.classList.remove("not-revealed")
                element.classList.add("revealed")
                revealed = document.querySelectorAll(".revealed")
                
                if(revealed.length === 2){
                    nbCoups++;
                    if ((revealed[0] as HTMLDivElement).style.getPropertyValue("background-image") === (revealed[1] as HTMLDivElement).style.getPropertyValue("background-image")) {
                        const first = revealed[0]
                        const second = revealed[1]

                        if(first.classList.item(1) === second.classList.item(1)){
                            first.classList.remove("revealed")
                            first.classList.add("found")
                            second.classList.remove("revealed")
                            second.classList.add("found")
                        }
                    } else {
                        timeoutId = setTimeout(() => {
                            document.querySelectorAll(".revealed").forEach( (element) => {
                                element.classList.remove("revealed")
                                element.classList.add("not-revealed")
                            })
                        }, 1000)
                    }
                }
            }

            if(document.querySelectorAll(".found").length === 16){
                setTimeout( () => alert("Bravo ! Partie terminée en " + nbCoups + " coups ^^"), 100)
                const history: number[] = JSON.parse(localStorage.getItem("history") as string) || []
                localStorage.setItem("history", JSON.stringify([...history, nbCoups]))
                app.appendChild(btnStart)
            }
        })
        
        tilesDOM.appendChild(element)
    })
}
