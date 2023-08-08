import { elements, bg_color } from "./helpers.js";

const pokemon_count = 151;

// var arrName = [];
//! Olay İzleyicileri
elements.searchBtn.addEventListener("click", handleBtn);
elements.searchInput.addEventListener("input", searchValue);
//! Fonksiyonlar
//* butona tıklanınca açılır kapanır arama çubuğu
function handleBtn() {
  elements.search.classList.toggle("active");
}
//* getPokemon fonksiyonuna 1'den 151'e kadar sayıları göndermemizin amacı id'e göre pokemonları getirmektir.
const fetchPokemons = async () => {
  for (let i = 1; i < pokemon_count; i++) {
    await getPokemon(i);
  }
};
//* API isteği
const getPokemon = async (id) => {
  // id' değişken olduğu için backtickler arasında tanımladık
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  // api isteğini attıkd
  const res = await fetch(url);
  // cevabu alıp json verisine çevirip data değişkenine aktardık
  const data = await res.json();
  const arrData = Array(data);
  // ekrana basma fonksiyonun içerisine api'dan gelen verileri gönderdik
  renderPokemonCards(arrData);
};

//* Pokemon kartlarını ekrana basma
function renderPokemonCards(pokemon) {
  // api'dan aldığımız data dizisini döndük ve ekrana bastık
  pokemon.forEach((poke) => {
    // arrName.push(poke.name);
    // id'leri karttaki yerleri için sayılarını tasarladık
    const pokemonId = poke.id.toString().padStart(3, "0");
    // pokemon type
    const pokemonType = poke.types[0].type.name;
    // pokemon divi oluşturduk.
    const pokemonDiv = document.createElement("div");
    // pokemondiv'ine class ekledik
    pokemonDiv.classList.add("pokemon");
    // pokemon cardlarının arka plan renklerini değiştirme
    const pokemonBg = bg_color[pokemonType];
    pokemonDiv.style.backgroundColor = `${pokemonBg}`;
    // markup değişkenine içeriği ekledik
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
//* Arama
function searchValue() {
  const inputValue = elements.searchInput.value.toLowerCase();
  const pokemons = document.querySelectorAll(".pokemon");

  pokemons.forEach((pokemon) => {
    const pokemonName = pokemon
      .querySelector(".poke-name")
      .textContent.toLowerCase();

    if (pokemonName.includes(inputValue)) {
      pokemon.style.display = "block";
    } else {
      pokemon.style.display = "none";
    }
  });
}
fetchPokemons();
