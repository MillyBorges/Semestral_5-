document.addEventListener("DOMContentLoaded", function() {
    const livrosLeitura = [
      {
        titulo: "O Pequeno Príncipe",
        capa: "https://m.media-amazon.com/images/I/71LJ4k-k9hL._SY466_.jpg",
        previa: "“O essencial é invisível aos olhos...”",
        tempo: "1h 30min",
        paginasLidas: 65,
        paginasTotal: 100
      },
      {
        titulo: "Diário de um Banana",
        capa: "https://m.media-amazon.com/images/I/71vpmzbWXkS._SY466_.jpg",
        previa: "Uma divertida jornada pelo caos da pré-adolescência!",
        tempo: "50min",
        paginasLidas: 20,
        paginasTotal: 20
      },
      {
        titulo: "Capitães da Areia",
        capa: "https://m.media-amazon.com/images/I/41Srh2of8TL._SY445_SX342_ControlCacheEqualizer_.jpg",
        previa: "Pedro Bala e os meninos de Salvador desafiam o mundo!",
        tempo: "2h 10min",
        paginasLidas: 45,
        paginasTotal: 220
      }
    ];
  
    const listaContainer = document.querySelector(".leitura-lista");
    const pontosTotalElemento = document.querySelector(".leitura-pontos-total h3");
  
    function renderizarLeituras() {
      listaContainer.innerHTML = ""; // limpa lista antes
      let pontosTotal = 0;
  
      livrosLeitura.forEach(livro => {
        pontosTotal += livro.paginasLidas;
        const card = document.createElement("div");
        card.className = "leitura-card";
        card.innerHTML = `
          <img src="${livro.capa}" alt="Capa ${livro.titulo}" class="leitura-capa" />
          <div class="leitura-info">
            <h3 class="leitura-titulo">${livro.titulo}</h3>
            <p class="leitura-previa">${livro.previa}</p>
            <div class="leitura-progressos">
              <span><i class="fas fa-clock"></i> Tempo: ${livro.tempo}</span>
              <span><i class="fas fa-file-alt"></i> Páginas lidas: ${livro.paginasLidas}/${livro.paginasTotal}</span>
              <span><i class="fas fa-star"></i> Pontos até agora: ${livro.paginasLidas}</span>
              <span><i class="fas fa-gift"></i> Pontos ao concluir: ${livro.paginasTotal}</span>
            </div>
          </div>
        `;
        listaContainer.appendChild(card);
      });
  
      pontosTotalElemento.textContent = `Total de pontos: ${pontosTotal}`;
    }
  
    renderizarLeituras();
  });
  