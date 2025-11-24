// Sidebar expand/collapse
const sidebar = document.getElementById('sidebar');
if (sidebar) {
  sidebar.addEventListener('mouseenter', () => {
    sidebar.classList.add('expanded');
  });
  sidebar.addEventListener('mouseleave', (e) => {
    e.preventDefault()
    sidebar.classList.remove('expanded');
  });
}


const perfil_ = document.querySelector('.perfil')

let usuariologado = ""

if (perfil_) {
  usuariologado = localStorage.getItem('usuarioPerfil')
  carregarPerfilUsuario()
}

// Busca dinâmica dos dados do perfil
async function carregarPerfilUsuario() {

  const resemail = await fetch(`http://localhost:3000/api/usuario/${usuariologado.replace(/"/g, '')}`);
  const result = await resemail.json();
  if (!result) throw new Error('Erro ao buscar perfil');

  document.getElementById('perfil-nome').textContent = result[0].nome || '-';
  document.getElementById('perfil-email').textContent = result[0].email || '-';
  document.getElementById('perfil-livros').textContent = perfil.livros ?? '-';
  document.getElementById('perfil-pontos').textContent = perfil.pontos ?? '-';


  try {
    if (perfil.fotoURL) document.getElementById('perfil-foto').src = perfil.fotoURL;
  } catch (error) {
    document.getElementById('perfil-nome').textContent = 'Usuário';
    document.getElementById('perfil-email').textContent = '-';
    document.getElementById('perfil-livros').textContent = '-';
    document.getElementById('perfil-pontos').textContent = '-';
  }
}
document.addEventListener('DOMContentLoaded', carregarPerfilUsuario);
