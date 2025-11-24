const sair = document.getElementById("sair");

if (sair) {
  sair.addEventListener("click", (event) => {
    event.preventDefault();
     localStorage.clear()
     window.location.href = 'home.html'
  });
}


const token = localStorage.getItem('tokenAdm');
function isAdminToken(token) {
  if (!token) return false;
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    // Verifica se o campo role é "admin"
    return payload.role === "admin";
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return false;
  }
}

console.log("Token:", token);
console.log("É admin?", isAdminToken(token));

if (!isAdminToken(token)) {
  alert('Você precisa ser administrador para acessar esta página.');
  window.location.href = 'index.html'
}

const btnCadastroLivro = document.getElementById("cadastrar");
btnCadastroLivro.addEventListener("click", function (e) {
  e.preventDefault();

  if (!isAdminToken(token)) {
    alert('Permissão negada: apenas administradores podem cadastrar novos livros.');
    return;
  }
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const categoria = document.getElementById("categoria");
  const ano_publicacao = document.getElementById("anoPublicacao").value;
  const isbn = document.getElementById("isbn").value;
  const imagem_url = document.getElementById("capa").value;
  const previa = document.getElementById("previa").value;
  const classificacao_indicativa = document.getElementById("classificacao").value;
  const totalPaginas = document.getElementById("paginas").value;
  const categorias = Array.from(categoria.selectedOptions).map(option => option.value);

  const novoLivro = {
    titulo,
    autor,
    categorias,
    ano_publicacao,
    isbn,
    imagem_url,
    previa,
    classificacao_indicativa,
    totalPaginas
  };
 fetch("http://localhost:3000/api/livros/novoLivro", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(novoLivro)
})
  .then(async response => {
    if (response.ok) {
      window.location.href = "catalogo.html";
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro ao cadastrar livro:", errorData);
      alert(`Erro ao cadastrar livro: ${errorData.message || response.status}`);
    }
  })
  .catch(err => {
    console.error("Falha na conexão com o servidor:", err);
    alert("Falha na conexão com o servidor");
  })
})