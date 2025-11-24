const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

const formLogin = document.querySelector(".sign-in form");
const formRegister = document.querySelector(".sign-up form");

// Tratamento do login
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  localStorage.removeItem("tokenAdm");

  const email = formLogin.querySelector('input[name="email"]').value;
  const password = formLogin.querySelector('input[name="password"]').value;

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const { erro } = await res.json();
      alert(erro || "Falha no login");
      return;
    }

    const { token } = await res.json(); 
    localStorage.setItem("tokenAdm", token);

    const resemail = await fetch(`http://localhost:3000/api/usuario/${email}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const result = await resemail.json();

    alert(`Bem-vindo, ${result[0].nome}!`);
    localStorage.setItem("usuarioLogado", result[0].nome);
    localStorage.setItem("usuarioPerfil", result[0].email);

    window.location.href = "../html/home.html";
  } catch {
    alert("Erro de conexão com o servidor");
  }
});


// Tratamento do cadastro
formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = formRegister.querySelector('input[name="name"]').value;
  const email = formRegister.querySelector('input[name="email"]').value;
  const password = formRegister.querySelector('input[name="password"]').value;

  try {
    const res = await fetch("http://localhost:3000/api/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha: password }),
    });

    if (!res.ok) {
      const { erro } = await res.json();
      alert(erro || "Falha no cadastro");
      return;
    }

    alert("Cadastro realizado! Faça login.");
    container.classList.remove("active"); // Volta para formulário login
  } catch {
    alert("Erro de conexão com o servidor");
  }
});
