const API_URL = "http://localhost:3000/api/livros";
const TOKEN = localStorage.getItem("tokenAdm");

const modal = document.getElementById("modal-editar");
const closeModal = document.querySelector(".close-modal");
const formEditar = document.getElementById("form-editar");
const lista = document.getElementById("livros-lista");
const btnEditar = document.getElementById("btn-salvar")

async function apiRequest(url, options = {}) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Falha na requisição:", err);
        alert("Erro de conexão com o servidor");
        throw err;
    }
}

function getLivroId(livro) {
    return livro.id_livro || livro.id || livro._id;
}

function criarCardLivro(livro) {
    const idReal = getLivroId(livro);
    if (!idReal) console.error("Livro sem ID:", livro);

    const imagemSrc = livro.imagem_url || "https://via.placeholder.com/150";

    return `
    <div class="livro-item" data-id="${idReal}">
      <img class="livro-capa" src="${imagemSrc}" alt="Capa de ${livro.titulo}">
      <div class="livro-titulo">${livro.titulo}</div>
      <div class="livro-autor">Por ${livro.autor}</div>
      <div class="livro-descricao">${livro.previa || "Sem descrição"}</div>
      <div class="livro-cat">${livro.categoria}</div>
      <button class="btn-remover">Remover</button>
      <button class="btn-editar">Editar</button>
      <small style="font-size: 10px; color: gray;">ID: ${idReal}</small>
    </div>
  `;
}

function abrirModal() {
    modal.style.display = "block";
}
function fecharModal() {
    modal.style.display = "none";
}
closeModal.addEventListener("click", fecharModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
});

lista.addEventListener("click", async (e) => {
    const livroItem = e.target.closest(".livro-item");
    if (!livroItem) return;

    const livroId = livroItem.dataset.id;
    if (!livroId) {
        alert("Erro: ID do livro não encontrado.");
        return;
    }

    if (e.target.classList.contains("btn-remover")) {
        try {
            await fetch(`${API_URL}/${livroId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            livroItem.remove();
            alert("Livro removido com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao remover livro");
        }
    }

    if (e.target.classList.contains("btn-editar")) {
        try {
            const livro = await apiRequest(`${API_URL}/${livroId}`);

            console.log(livro[0].titulo)

            document.getElementById("edit-id").value = livroId;
            document.getElementById("edit-titulo").value = livro[0].titulo || livro.titulo_livro || "";
            document.getElementById("edit-autor").value = livro[0].autor || livro.autor_livro || "";
            document.getElementById("edit-categoria").value = livro[0].categoria || livro.categoria_livro || "";
            document.getElementById("edit-imagem").value = livro[0].imagem_url || livro.imagem || "";
            document.getElementById("edit-previa").value = livro[0].previa || livro.descricao || "";

            abrirModal();
        } catch (err) {
            console.error("Erro ao carregar livro:", err);
        }
    }
});


formEditar.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita reload da página

    const livroId = document.getElementById("edit-id").value;

    const dadosAtualizados = {
        titulo: document.getElementById("edit-titulo").value || null,
        autor: document.getElementById("edit-autor").value || null,
        categoria: document.getElementById("edit-categoria").value || null,
        ano_publicacao: document.getElementById("edit-ano").value || null,
        isbn: document.getElementById("edit-isbn").value || null,
        preco: document.getElementById("edit-preco").value || null,
        quantidade_estoque: document.getElementById("edit-estoque").value || null,
        descricao: document.getElementById("edit-descricao").value || null,
        imagem_url: document.getElementById("edit-imagem").value || null,
        previa: document.getElementById("edit-previa").value || null,
        classificacao_indicativa: document.getElementById("edit-classificacao").value || null,
        totalPaginas: document.getElementById("edit-paginas").value || null,
    };

    console.log(dadosAtualizados)
    console.log(`${API_URL}/${livroId}`)

    try {
        const res = await fetch(`${API_URL}/${livroId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(dadosAtualizados),
        });

        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }

        alert("Livro atualizado com sucesso!");
        fecharModal();
        carregarLivros(); // recarrega a lista para refletir alterações
    } catch (err) {
        console.error("Erro ao salvar alterações:", err);
        alert("Erro ao salvar alterações");
    }
});
async function carregarLivros() {
    lista.innerHTML = "<p>Carregando livros...</p>";
    try {
        const livros = await apiRequest(`${API_URL}/catalogo`);
        if (!livros.length) {
            lista.innerHTML = "<p>Nenhum livro cadastrado ainda.</p>";
            return;
        }
        lista.innerHTML = livros.map(criarCardLivro).join("");
    } catch {
        lista.innerHTML = "<p>Erro ao buscar livros do catálogo.</p>";
    }
}

document.addEventListener("DOMContentLoaded", carregarLivros);
