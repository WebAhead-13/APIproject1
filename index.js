const form = document.querySelector("form");
const output = document.querySelector("output")
const cards = document.querySelector("cards")
const clear=document.querySelector(".clear")
var random=1;
var pokiName=" "
var status_flag=0;



clear.addEventListener("click" ,() => {
    cards.innerHTML= " ";
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // currentCard.style.visibility= "visible";
    // output.innerHTML = "";
    // stats.innerHTML=" ";
    // nameH.innerHTML= "";
    const formData = new FormData(event.target);
    const name = formData.get("pokemon");
    console.log(formData);
    console.log(name);
    pokiName=name;
    createCard(name)

});

 function createCard(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then((pokemonData) => {
            let card = document.createElement("div");
            card.classList.add("card");

            let stat =document.createElement("div")
            const title = document.createElement("h2");
            title.textContent = pokemonData.name;
            
            const statsArr = pokemonData.stats;
            card.appendChild(title);
            for(let i=0;i<6;i++) {
                let discr1=document.createElement("h2")

                let icon =document.createElement("img")
                icon.src = 'icon'+i+'.png'
                icon.width = 40
        
                discr1.innerHTML=statsArr[i].stat.name + " : " + statsArr[i].base_stat;
                // let discr2=document.createElement("div")
                // discr2.textContent=statsArr[i].base_stat;
                discr1.classList.add("h2"+ i)
                discr1.appendChild(icon)
                // discr2.classList.add("h2"+ i)
                // stats.appendChild(icon)

                card.appendChild(discr1)
            }   
        
            searchGif (name,card)
            
            changeButton= document.createElement("button")
            changeButton.innerHTML="get another giphy"
            changeButton.addEventListener("click" ,  (event)=>{
                random=Math.ceil(Math.random()*50);
                searchGif(pokemonData.name,card)
            })
            card.appendChild(changeButton)
            cards.appendChild(card)   
          
        })
        

        .catch((error) => {
            status_flag=0;
            console.log(error);
            if (error.message === "404") {
                output.textContent = `⚠️ Couldn't find "${name}"`;
            } else {
                output.textContent = "⚠️ Something went wrong";
            }

            
        });
    }

          
    

    function searchGif (name,currentCard) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=nD60pUVFXQt0rkotJYYIZxhUVCxdw6jx&q=${name}`)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then((pokemonData) => {
            console.log(pokemonData);
            const gif = document.createElement("img");
            gif.width=400;
            gif.height=400;
            // const specialAbility = document.createElement("div")
            // const random=Math.ceil(Math.random()*50)
            gif.src =
            pokemonData.data[random].images.downsized.url
            gif.alt = "";
            console.log(
            );

            output.appendChild(gif);

            currentCard.appendChild(gif)

        })

        .catch((error) => {
            console.log(error);
            if (error.message === "404") {
                output.textContent = `⚠️ Couldn't find "${name}"`;
            } else {
                output.textContent = "⚠️ Something went wrong";
            }
        });
    }