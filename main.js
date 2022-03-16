const barraBusqueda = document.querySelector(".search-bar");
const aplicacion = document.querySelector(".container-pokedex");
const cantidadPokemons = 493;

const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const estadisticasTraducidas = {
	hp: "PV",
	attack: "Ataque",
	defense: "Defensa",
	"special-attack": "At. Esp.",
	"special-defense": "Def. Esp.",
	speed: "Velocidad",
};

const tiposTraducidos = {
	steel: "Metal",
	water: "Agua",
	bug: "Bicho",
	dragon: "Dragón",
	electric: "Eléctrico",
	ghost: "Fantasma",
	fire: "Fuego",
	fairy: "Hada",
	ice: "Hielo",
	fighting: "Lucha",
	normal: "Normal",
	grass: "Planta",
	psychic: "Psíquico",
	rock: "Roca",
	dark: "Siniestro",
	ground: "Tierra",
	poison: "Veneno",
	flying: "Volador",
};

const coloresSegunTipos = {
	steel: "#CCCCCC",
	water: "#B0E2FF",
	bug: "#99CC33",
	dragon: "#AB82FF",
	electric: "#FFD700",
	ghost: "#778899",
	fire: "#FF7F00",
	fairy: "#FFB0FF",
	ice: "#ADD8E6",
	fighting: "#FF6A6A",
	normal: "#DDCCAA",
	grass: "#99FF66",
	psychic: "#FFB5C5",
	rock: "#CD853F",
	dark: "#A9A9A9",
	ground: "#DEB887",
	poison: "#CC88BB",
	flying: "#BAAAFF",
};

const fetchPokemons = async () => {
	for (let i = 1; i <= cantidadPokemons; i++) {
		await obtenerPokemon(i);
	}
};

const obtenerPokemon = async (id) => {
	const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
	const response = await fetch(URL);
	const pokemon = await response.json();
	renderizarCartaPokemon(pokemon);
};

fetchPokemons();

const renderizarTipos = (tipos) => {
	const elementoContenedor = document.createElement("div");
	tipos.forEach((tipo) => {
		let nuevoElemento = document.createElement("div");
		const nombreTipo = tipo.type.name;
		nuevoElemento.setAttribute("class", "pokemon-tipos");
		nuevoElemento.innerText = tiposTraducidos[nombreTipo];
		nuevoElemento.style.backgroundColor = coloresSegunTipos[nombreTipo];
		elementoContenedor.appendChild(nuevoElemento);
	});
	return elementoContenedor;
};

const renderizarCartaPokemon = (data) => {
	const cartaPokemon = document.createElement("div");
	const frenteCarta = document.createElement("div");
	const dorsoCarta = document.createElement("div");

	frenteCarta.setAttribute("class", "frente-carta");
	dorsoCarta.setAttribute("class", "dorso-carta");

	const tituloDorsoCarta = document.createElement("h3");
	tituloDorsoCarta.innerText = "Puntos base";

	cartaPokemon.appendChild(frenteCarta);
	cartaPokemon.appendChild(dorsoCarta);

	const tipos = renderizarTipos(data.types);
	const stats = renderizarEstadisticasPokemon(data.stats);

	cartaPokemon.setAttribute("class", "carta-pokemon");

	const infoCartaPokemon = `
        <img class="pokemon-sprite" src="${data.sprites.front_default}">
        <h3 class="pokemon-nombre">${capitalize(data.name)}</h3>
        <h3 class="pokemon-id">N° ${data.id}</h3>
    `;

	frenteCarta.innerHTML = infoCartaPokemon;

	frenteCarta.appendChild(tipos);

	dorsoCarta.appendChild(tituloDorsoCarta);
	dorsoCarta.appendChild(stats);

	aplicacion.appendChild(cartaPokemon);
};

const renderizarEstadisticasPokemon = (stats) => {
	const contenedor = document.createElement("div");
	stats.forEach((stat) => {
		const contenedorEstadistica = document.createElement("div");
		const nombreEstadistica = document.createElement("p");
		const valorEstadistica = document.createElement("p");
		nombreEstadistica.textContent = estadisticasTraducidas[stat.stat.name];
		valorEstadistica.textContent = stat.base_stat;
		contenedorEstadistica.appendChild(nombreEstadistica);
		contenedorEstadistica.appendChild(valorEstadistica);
		contenedor.appendChild(contenedorEstadistica);
	});
	return contenedor;
};
