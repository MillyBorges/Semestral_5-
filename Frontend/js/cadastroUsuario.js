const btnCadastrar = document.getElementById("cadastrar")



btnCadastrar.addEventListener("click", function (e) {
    e.preventDefault()
    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const idade =  document.getElementById("idade")
    const password = document.getElementById("password")
    const endereco = document.getElementById("endereco")
    const telefone = document.getElementById("telefone")
    const selectGeneros = document.getElementById('genero_literario');


    const preferencia_categorias = Array.from(selectGeneros.selectedOptions).map(option => option.value);
    const usuario = { 
           nome: nome.value, 
            email: email.value, 
            idade: idade.value,
            password: password.value, 
            endereco: endereco.value,       
            telefone: telefone.value, 
            nivel:0, 
            role:'user',
            preferencia_categorias
         }

         const res =  fetch('http://localhost:3000/api/usuario',  {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
          })
          window.location.href = "index.html"
})