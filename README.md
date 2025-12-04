# Trabalho Prático 1 - Exibição e navegação dinâmicas

**Páginas de detalhes dinâmicas**

Nessa etapa, vamos evoluir o trabalho anterior, acrescentando a página de detalhes, conforme o  projeto escolhido. Imagine que a página principal (home-page) mostre um visão dos vários itens que existem no seu site. Ao clicar em um item, você é direcionado pra a página de detalhes. A página de detalhe vai mostrar todas as informações sobre o item do seu projeto. seja esse item uma notícia, filme, receita, lugar turístico ou evento.

Leia o enunciado completo no Canvas. 

**IMPORTANTE:** Assim como informado anteriormente, capriche na etapa pois você vai precisar dessa parte para as próximas semanas. 

**IMPORTANTE:** Você deve trabalhar e alterar apenas arquivos dentro da pasta **`public`,** mantendo os arquivos **`index.html`**, **`styles.css`** e **`app.js`** com estes nomes, conforme enunciado. Deixe todos os demais arquivos e pastas desse repositório inalterados. **PRESTE MUITA ATENÇÃO NISSO.**

## Informações Gerais

- Nome: Alex Prieto Garbazza Ferraa
- Matricula: 897619
- Proposta de projeto escolhida: Pokemon
- Breve descrição sobre seu projeto: Site sobre pokemon e suas caracteristicas e estatisticas

## Print da Home-Page

![Print da home-page](home.PNG)

## Print da página de detalhes do item

![print da pagina de detalhes do item](detalhes.PNG)

## Cole aqui abaixo a estrutura JSON utilizada no app.js

```javascript
const pokemons = [
  { id: 1, nome: "Bulbasaur", tipo: "Grama", cor: "success", imagem: "bulbasaur.png", gif: "bulbasaur2.gif", stats: "HP:45 | ATK:49 | DEF:49 | SPA:65 | SPD:65 | SPE:45", descricao: "Bulbasaur é o inicial do tipo grama da região de Kanto." },
  { id: 2, nome: "Charmander", tipo: "Fogo", cor: "danger", imagem: "charmander.png", gif: "charmander2.gif", stats: "HP:39 | ATK:52 | DEF:43 | SPA:60 | SPD:50 | SPE:65", descricao: "Charmander é o inicial do tipo fogo da região de Kanto." },
  { id: 3, nome: "Squirtle", tipo: "Água", cor: "primary", imagem: "squirtle.png", gif: "squirtle2.gif", stats: "HP:44 | ATK:48 | DEF:65 | SPA:50 | SPD:64 | SPE:43", descricao: "Squirtle é o inicial do tipo água da região de Kanto." }
];

function montarHome() {
  const container = document.getElementById('lista-pokemons');
  if(!container) return;

  container.innerHTML = '';
  pokemons.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4';
    col.innerHTML = `
      <div class="card text-center bg-${p.cor} text-white h-100">
        <a href="detalhes.html?id=${p.id}" class="text-decoration-none text-white">
          <div class="card-img">
            <img src="${p.imagem}" alt="${p.nome}" class="static">
            <img src="${p.gif}" alt="${p.nome} animado" class="gif">
          </div>
          <div class="card-body">
            <h5 class="card-title">${p.nome}</h5>
            <p class="card-text">${p.tipo}</p>
            <p class="card-text">${p.stats}</p>
          </div>
        </a>
      </div>
    `;
    container.appendChild(col);
  });
}

function montarDetalhes(id) {
  const container = document.getElementById('detalhes-item');
  if(!container) return;

  const pIndex = pokemons.findIndex(p => p.id == id);
  if(pIndex === -1) { container.innerHTML = `<p>Pokémon não encontrado.</p>`; return; }

  const p = pokemons[pIndex];

  container.innerHTML = `
    <div class="detalhes-topo bg-${p.cor} text-white p-3 rounded-top">
      <h2>${p.nome}</h2>
      <img src="${p.imagem}" alt="${p.nome}">
    </div>
    <div class="detalhes-info mt-3">
      <p><strong>Tipo:</strong> ${p.tipo}</p>
      <p><strong>Stats:</strong> ${p.stats}</p>
      <p><strong>Descrição:</strong> ${p.descricao}</p>
      <div class="d-flex justify-content-between mt-3">
        <button id="btn-anterior" class="btn btn-outline-primary">← Anterior</button>
        <a href="index.html" class="btn btn-secondary">Voltar</a>
        <button id="btn-proximo" class="btn btn-outline-primary">Próximo →</button>
      </div>
    </div>
  `;

  document.title = `Pokewiki - ${p.nome}`;

  document.getElementById('btn-anterior').addEventListener('click', () => {
    if(pIndex > 0) montarDetalhes(pokemons[pIndex-1].id);
  });

  document.getElementById('btn-proximo').addEventListener('click', () => {
    if(pIndex < pokemons.length-1) montarDetalhes(pokemons[pIndex+1].id);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  montarHome();
});

```