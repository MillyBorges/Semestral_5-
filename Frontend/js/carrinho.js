// Constante que define a pontuação de cada livro
const PONTOS_POR_LIVRO = 50;
const TOTAL_LIVROS = 10; // Número inicial de itens no carrinho
const LIVROS_INICIAIS = [
    { nome: "📘 Romance: 'Amor Além das Estrelas'", pontos: PONTOS_POR_LIVRO },
    { nome: "📙 Fantasia: 'O Reino Encantado'", pontos: PONTOS_POR_LIVRO },
    { nome: "📕 Quadrinhos: 'Super Aventuras Vol.1'", pontos: PONTOS_POR_LIVRO },
    { nome: "📔 Terror: 'Noite Sombria'", pontos: PONTOS_POR_LIVRO },
    { nome: "📙 Infantil: 'O Mundo dos Sonhos'", pontos: PONTOS_POR_LIVRO },
    { nome: "📘 Romance: 'Paixão Proibida'", pontos: PONTOS_POR_LIVRO },
    { nome: "📕 Quadrinhos: 'Heróis em Ação'", pontos: PONTOS_POR_LIVRO },
    { nome: "📔 Terror: 'O Mistério do Lago'", pontos: PONTOS_POR_LIVRO },
    { nome: "📙 Infantil: 'Aventuras no Parque'", pontos: PONTOS_POR_LIVRO },
    { nome: "📘 Romance: 'Corações Cruzados'", pontos: PONTOS_POR_LIVRO }
];

const listaCarrinho = document.getElementById('listaCarrinho');
const totalPontosElement = document.getElementById('totalPontos');
const btnFinalizar = document.getElementById('btnFinalizarCompra');

const sair = document.getElementById("sair");

if (sair) {
  sair.addEventListener("click", (event) => {
    event.preventDefault();
     localStorage.clear()
     window.location.href = 'home.html'
  });
}

const token = localStorage.getItem('tokenAdm')




// =====================
// Funções de Cálculo e Renderização
// =====================

/**
 * Calcula e exibe o total de pontos somando todos os itens no carrinho.
 */
function atualizarTotal() {
    // Seleciona todos os itens que representam um livro (ou seja, que têm a classe 'item-carrinho')
    const itens = document.querySelectorAll('.lista-carrinho .item-carrinho');

    // O total é o número de itens restantes multiplicado pela pontuação fixa (50)
    const totalPontos = itens.length * PONTOS_POR_LIVRO;

    // Atualiza o texto de exibição
    totalPontosElement.textContent = `${totalPontos} Pontos`;

    // Lógica para carrinho vazio
    if (itens.length === 0) {
        listaCarrinho.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio! Adicione livros para ganhar pontos.</li>';
        btnFinalizar.disabled = true;
        btnFinalizar.textContent = 'Carrinho Vazio';
    } else {
        // Remove a mensagem de carrinho vazio se ela existir
        const vazio = document.querySelector('.carrinho-vazio');
        if (vazio) vazio.remove();
        btnFinalizar.disabled = false;
        btnFinalizar.textContent = `Finalizar Aquisição (${totalPontos} Pts)`;
    }
}

/**
 * Cria o elemento HTML de um item do carrinho
 * @param {string} nome O nome e emoji do livro.
 * @param {number} pontos A pontuação do item (50).
 * @returns {HTMLLIElement} O elemento <li> completo.
 */
function criarItemCarrinho(nome, pontos) {
    const item = document.createElement('li');
    item.classList.add('item-carrinho');
    item.setAttribute('data-pontos', pontos); // Armazena a pontuação no data attribute

    item.innerHTML = `
        <div class="nome-pontos">
            <span class="nome">${nome}</span>
            <span class="pontos-item">${pontos} Pts</span>
        </div>
        <button class="btn-remover">Remover</button>
    `;

    // Adiciona o listener ao botão de remover
    item.querySelector('.btn-remover').addEventListener('click', removerItem);

    return item;
}

/**
 * Remove o item clicado e atualiza o total.
 */
function removerItem(e) {
    const item = e.target.closest('.item-carrinho'); // Encontra o <li> pai
    if (item) {
        item.remove();
        atualizarTotal(); // Recalcula o total após a remoção
    }
}

/**
 * Função principal para inicializar o carrinho.
 */
function inicializarCarrinho() {

    // 1. Limpa e Popula a lista no HTML
    listaCarrinho.innerHTML = '';
    LIVROS_INICIAIS.forEach(livro => {
        listaCarrinho.appendChild(criarItemCarrinho(livro.nome, livro.pontos));
    });

    // 2. Calcula o total inicial
    atualizarTotal();

    // 3. Adiciona o listener ao botão finalizar
    btnFinalizar.addEventListener('click', () => {

        if (!token) {
            alert('Faça o login para continuar navegando!!!')
            window.location.href = "cadastroUsuario.html"
            return

        } else {
            alert(`Parabéns! Você adquiriu ${listaCarrinho.children.length * PONTOS_POR_LIVRO} pontos em livros.`);
        }

        // Aqui você adicionaria a lógica para limpar o carrinho e salvar os pontos.
    });
}


// =====================
// Inicialização
// =====================

// Executa a função principal ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa somente se a lista de carrinho existir na página
    if (listaCarrinho && totalPontosElement) {
        inicializarCarrinho();
    }

    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.addEventListener('mouseenter', () => {
            sidebar.classList.add('expanded');
        });

        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('expanded');
        });
    }

    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            alert('Aqui pode abrir seu sistema de chat!');
        });
    }
});