const form = document.querySelector("form");
const output = document.querySelector("output");
const stats=document.querySelector("stats");
const nameH=document.querySelector("nameH");
const changeButton = document.querySelector(".changeButton");
const card = document.querySelector(".card")
var random=1;
var pokiName=" "
var status_flag=0;



changeButton.addEventListener("click" ,  (event)=>{
    random=Math.ceil(Math.random()*50);
    if(status_flag)
    searchGif(pokiName)
})

form.addEventListener("submit", (event) => {
    card.style.visibility= "visible";
    output.innerHTML = "";
    stats.innerHTML=" ";
    nameH.innerHTML= "";
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("pokemon");
    console.log(formData);
    console.log(name);
    pokiName=name;

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then((pokemonData) => {
            status_flag=1;
            console.log(pokemonData);
            const title = document.createElement("h2");
            title.textContent = pokemonData.name;
            nameH.appendChild(title);
            const statsArr =pokemonData.stats;
            console.log(statsArr)
            for(let i=0;i<6;i++) {
                let icon =document.createElement("img")
                icon.src = 'icon'+i+'.png'
                icon.width = 25
                console.log(icon.src)
                let stat =document.createElement("div")
                let discr1=document.createElement("h2")
                discr1.innerHTML=statsArr[i].stat.name + " : " + statsArr[i].base_stat;
                // let discr2=document.createElement("div")
                // discr2.textContent=statsArr[i].base_stat;
                discr1.classList.add("h2"+ i)
                // discr2.classList.add("h2"+ i)
                // stats.appendChild(icon)
                discr1.appendChild(icon)
                stats.appendChild(discr1)
                
                // stats.appendChild(discr2)
            }
            searchGif (name)    
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

          
    });

    function searchGif (name) {
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