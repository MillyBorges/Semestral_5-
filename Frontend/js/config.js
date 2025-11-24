// ==================================================

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Se houver um tema salvo como 'dark', aplica a classe e marca o switch
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode-active');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }
    
    // Inicia a navegação: Garante que a tela Home esteja visível e a Configs escondida
    const mainContent = document.getElementById('main-content'); 
    const settingsPage = document.getElementById('settings-page'); 
    if (mainContent && settingsPage) {
        // A home deve estar visível e a settings escondida no carregamento
        mainContent.classList.remove('hidden');
        settingsPage.classList.add('hidden');
    }
});


// =====================
// Sidebar (Expansão)
// =====================
const sidebar = document.getElementById('sidebar');
if (sidebar) {
    // Apenas aplica a expansão com mouse-over em telas grandes (desktop)
    if (window.innerWidth > 768) { 
        sidebar.addEventListener('mouseenter', () => {
            sidebar.classList.add('expanded');
        });

        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('expanded');
        });
    }
}

// =====================
// Comentários (Lógica mantida)
// =====================
const commentForm = document.getElementById('comment-form');
if (commentForm) {
  const commentInput = document.getElementById('comment-input');
  const commentsList = document.getElementById('comments-list');

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (!commentText) return;

    // Cria o novo comentário
    const newCommentContainer = document.createElement('div');
    newCommentContainer.classList.add('comment');
    
    // Adicione a lógica de foto e nome do usuário real aqui, se necessário
    newCommentContainer.innerHTML = `
        <div class="comment-user">
            <img src="https://cdn-icons-png.flaticon.com/512/1071/1071196.png" alt="Novo Usuário">
            <span>Você</span>
        </div>
        <p>${commentText}</p>
    `;

    commentsList.appendChild(newCommentContainer);
    commentInput.value = '';
  });
}

// ==================================================
// ⚙️ LÓGICA 2: Funcionalidade de Navegação e Configurações
// ==================================================
const mainContent = document.getElementById('main-content'); 
const settingsPage = document.getElementById('settings-page'); 
const openSettingsDiv = document.getElementById('open-settings'); 
const backToHomeBtn = document.getElementById('back-to-home');

// Função principal de navegação (Home <-> Configurações)
function toggleView(showSettings) {
    if (mainContent && settingsPage) {
        if (showSettings) {
            // Mostrar Configurações, Esconder Home
            mainContent.classList.add('hidden');
            settingsPage.classList.remove('hidden');
        } else {
            // Mostrar Home, Esconder Configurações
            mainContent.classList.remove('hidden');
            settingsPage.classList.add('hidden');
        }
    }
}

// 1. ABRIR a tela de configurações (clique na div da sidebar)
if (openSettingsDiv) {
    openSettingsDiv.addEventListener('click', (e) => {
        e.preventDefault(); 
        toggleView(true);
    });
}

// 2. VOLTAR para a Home
if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => {
        toggleView(false); 
    });
}

// 3. Funcionalidade de Modo Escuro (Toggle Switch)
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode-active');
            localStorage.setItem('theme', 'dark'); 
        } else {
            document.body.classList.remove('dark-mode-active');
            localStorage.setItem('theme', 'light'); 
        }
    });
}

// 4. Funcionalidade de exemplo para os botões de Ação
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert(`Ação de "${button.textContent.trim()}" executada! (Implementação real de backend necessária)`);
    });
});