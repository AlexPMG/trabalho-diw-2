const API_URL = 'http://localhost:3001';

function verificarLogin() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  return usuarioLogado ? JSON.parse(usuarioLogado) : null;
}

// Variável global para armazenar os pokémons
let pokemons = [];

// Função para carregar pokémons do JSON Server
async function carregarPokemons() {
  try {
    const response = await fetch(`${API_URL}/pokemons`);
    if (!response.ok) throw new Error('Erro ao carregar dados');
    
    pokemons = await response.json();
    console.log('Pokémons carregados:', pokemons.length);
    return pokemons;
  } catch (error) {
    console.error('Erro ao carregar do servidor:', error);
    
    // Fallback: dados locais caso o servidor não responda
    pokemons = [
      { 
        id: 1, nome: "Bulbasaur", tipo: "Grama", cor: "success", 
        imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", 
        gif: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif", 
        imagem_carrossel: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        stats: "HP:45 | ATK:49 | DEF:49 | SPA:65 | SPD:65 | SPE:45", 
        descricao: "Bulbasaur é o inicial do tipo grama da região de Kanto.",
        evolucao: "16 para Ivysaur",
        ataque: "Vine Whip"
      },
      { 
        id: 2, nome: "Charmander", tipo: "Fogo", cor: "danger", 
        imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", 
        gif: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif",
        imagem_carrossel: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
        stats: "HP:39 | ATK:52 | DEF:43 | SPA:60 | SPD:50 | SPE:65", 
        descricao: "Charmander é o inicial do tipo fogo da região de Kanto.",
        evolucao: "16 para Charmeleon",
        ataque: "Ember"
      },
      { 
        id: 3, nome: "Squirtle", tipo: "Água", cor: "primary", 
        imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", 
        gif: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif",
        imagem_carrossel: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
        stats: "HP:44 | ATK:48 | DEF:65 | SPA:50 | SPD:64 | SPE:43", 
        descricao: "Squirtle é o inicial do tipo água da região de Kanto.",
        evolucao: "16 para Wartortle",
        ataque: "Water Gun"
      },
      { 
        id: 4, nome: "Chikorita", tipo: "Grama", cor: "success", 
        imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png", 
        gif: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/152.gif", 
        stats: "HP:45 | ATK:49 | DEF:65 | SPA:49 | SPD:65 | SPE:45", 
        descricao: "Chikorita é o inicial do tipo grama da região de Johto.",
        evolucao: "16 para Bayleef",
        ataque: "Razor Leaf"
      },
      { 
        id: 5, nome: "Cyndaquil", tipo: "Fogo", cor: "danger", 
        imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png", 
        gif: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/155.gif", 
        stats: "HP:39 | ATK:52 | DEF:43 | SPA:60 | SPD:50 | SPE:65", 
        descricao: "Cyndaquil é o inicial do tipo fogo da região de Johto.",
        evolucao: "14 para Quilava",
        ataque: "Ember"
      },
      { 
        id: 6, nome: "Totodile", tipo: "Água", cor: "primary", 
        imagem: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png", 
        gif: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/158.gif", 
        stats: "HP:50 | ATK:65 | DEF:64 | SPA:44 | SPD:48 | SPE:43", 
        descricao: "Totodile é o inicial do tipo água da região de Johto.",
        evolucao: "18 para Croconaw",
        ataque: "Bite"
      }
    ];
    return pokemons;
  }
}

function montarHome() {
  const container = document.getElementById('lista-pokemons');
  if(!container) return;

  container.innerHTML = '';
  pokemons.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <div class="card text-center bg-${p.cor} text-white h-100">
        <a href="detalhes.html?id=${p.id}" class="text-decoration-none text-white">
          <div class="card-img">
            <img src="${p.imagem}" alt="${p.nome}" class="static" 
                 onerror="this.src='https://via.placeholder.com/150/000000/FFFFFF?text=Pokemon'">
            <img src="${p.gif}" alt="${p.nome} animado" class="gif"
                 onerror="this.style.display='none'">
          </div>
          <div class="card-body">
            <h5 class="card-title">${p.nome}</h5>
            <p class="card-text">${p.tipo}</p>
            <p class="card-text"><small>${p.stats}</small></p>
          </div>
        </a>
      </div>
    `;
    container.appendChild(col);
  });
}

function montarCarrossel() {
  const destaqueContainer = document.getElementById('destaque-pokemons');
  const indicadoresContainer = document.getElementById('carousel-indicators');

  if (!destaqueContainer || !indicadoresContainer) return;

  destaqueContainer.innerHTML = '';
  indicadoresContainer.innerHTML = '';

  pokemons.slice(0,3).forEach((p,i) => {
    destaqueContainer.innerHTML += `
      <div class="carousel-item ${i===0 ? 'active' : ''}">
        <a href="detalhes.html?id=${p.id}" class="d-block">
          <img src="${p.imagem_carrossel || p.imagem}" 
               class="d-block w-100" 
               alt="${p.nome}"
               onerror="this.src='https://via.placeholder.com/800x400/000000/FFFFFF?text=${p.nome}'">
          <div class="carousel-caption">
            <h5>${p.nome}</h5>
            <p>${p.tipo}</p>
          </div>
        </a>
      </div>
    `;
    indicadoresContainer.innerHTML += `
      <button type="button" 
              data-bs-target="#carouselDestaque" 
              data-bs-slide-to="${i}" 
              ${i===0 ? 'class="active" aria-current="true"' : ''}></button>
    `;
  });
}

// Função para montar menu
function montarMenu() {
  const menu = document.getElementById('pokemon-menu');
  if (!menu) return;
  
  menu.innerHTML = '';
  pokemons.forEach(p => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `<a class="nav-link" href="detalhes.html?id=${p.id}">${p.nome}</a>`;
    menu.appendChild(li);
  });
}

async function inicializar() {
  const usuario = verificarLogin();
  
  if (usuario) {
    console.log('Usuário logado:', usuario.nome);
    // Você pode usar essas informações para personalizar a experiência
  }
  
  await carregarPokemons();
  montarHome();
  montarCarrossel();
  montarMenu();
}

// Inicializa quando o DOM estiver pronto
if (document.getElementById('lista-pokemons') || document.getElementById('destaque-pokemons')) {
  document.addEventListener('DOMContentLoaded', inicializar);
}

// Exporta para uso na página de detalhes
window.pokemons = pokemons;
window.carregarPokemons = carregarPokemons;