import { elements, bg_color } from "./helpers.js";

const pokemon_count = 151;

// Dinlenme olaylarını ekle
elements.searchBtn.addEventListener("click", handleBtn);
elements.searchInput.addEventListener("input", searchValue);

// Butona tıklanınca açılır kapanır arama çubuğu
function handleBtn() {
  elements.search.classList.toggle("active");
}

// getPokemon fonksiyonuna 1'den 151'e kadar sayıları göndermemizin amacı id'e göre pokemonları getirmektir.
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

// API isteği
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const arrData = Array(data);
  renderPokemonCards(arrData);
};

// Pokemon kartlarını ekrana basma
function renderPokemonCards(pokemon) {
  pokemon.forEach((poke) => {
    const pokemonId = poke.id.toString().padStart(3, "0");
    const pokemonType = poke.types[0].type.name;
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    const pokemonBg = bg_color[pokemonType];
    pokemonDiv.style.backgroundColor = `${pokemonBg}`;
    const markup = `
      <div class="image-container">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"
          alt="first pokemon"
        />
      </div>
      <div class="poke-info">
        <span class="poke-id">#${pokemonId}</span>
        <h3 class="poke-name">${poke.name}</h3>
        <div class="small">
          <small class="poke-exp">
            <i class="fa-solid fa-lightbulb"></i> ${poke.base_experience} exp
          </small>
          <small class="poke-weight">
            <i class="fa-solid fa-lightbulb"></i> ${poke.weight} kg
          </small>
        </div>
        <div class="poke-type">
          <i class="fa-brands fa-uncharted"></i> ${pokemonType}
        </div>
      </div>
    `;
    pokemonDiv.innerHTML = markup;
    elements.poke_container.appendChild(pokemonDiv);
  });
}

// Arama
function searchValue() {
  const inputValue = elements.searchInput.value.toLowerCase();
  const pokemons = document.querySelectorAll(".pokemon");
  let rgbColors = [];

  pokemons.forEach((pokemon) => {
    const pokemonName = pokemon
      .querySelector(".poke-name")
      .textContent.toLowerCase();

    if (pokemonName.includes(inputValue)) {
      pokemon.style.display = "block";
      const colorScreen = pokemon.style.backgroundColor;

      rgbColors.push(colorScreen);
    } else {
      pokemon.style.display = "none";
    }
  });

  if (rgbColors.length > 0) {
    const avgRGB = calculateAverageRGB(rgbColors);
    elements.body.style.background = `rgb(${avgRGB.r}, ${avgRGB.g}, ${avgRGB.b})`;
  } else {
    elements.body.style.background =
      "linear-gradient(to right, #f82600 0%, #f9d423)";
  }
}

function calculateAverageRGB(colors) {
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;

  colors.forEach((color) => {
    const [r, g, b] = color.match(/\d+/g).map(Number);
    totalR += r;
    totalG += g;
    totalB += b;
  });

  const avgR = Math.floor(totalR / colors.length);
  const avgG = Math.floor(totalG / colors.length);
  const avgB = Math.floor(totalB / colors.length);

  return { r: avgR, g: avgG, b: avgB };
}

fetchPokemons();
