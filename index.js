const form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", (event) => {
    output.innerHTML = "";
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("pokemon");

    console.log(formData);
    console.log(name);

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then((pokemonData) => {
            console.log(pokemonData.name);
            const title = document.createElement("h2");
            title.textContent = pokemonData.name;
            const pic = document.createElement("img");
            pic.src =
                pokemonData.sprites.versions["generation-v"][
                    "black-white"
                ].animated["front_default"];
            pic.alt = "";
            console.log(
                pokemonData.sprites.versions["generation-v"]["black-white"]
                    .animated["front_default"]
            );

            output.appendChild(title);
            output.appendChild(pic);
            // output.appendChild(specialAbility)
        })

        .catch((error) => {
            console.log(error);
            if (error.message === "404") {
                output.textContent = `⚠️ Couldn't find "${name}"`;
            } else {
                output.textContent = "⚠️ Something went wrong";
            }
        });

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=nD60pUVFXQt0rkotJYYIZxhUVCxdw6jx&q=${name}`)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then((pokemonData) => {
            console.log(pokemonData);
            const gif = document.createElement("img");
            // const specialAbility = document.createElement("div")
            const random=Math.ceil(Math.random()*50)
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
});