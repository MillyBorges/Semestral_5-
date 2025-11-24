document.addEventListener("DOMContentLoaded", () => {
    // Pegando os elementos
    const chatBtn = document.getElementById('chat-open-btn');
    const chatContainer = document.getElementById('chat-container');

    // Verifica se os elementos existem para evitar erros
    if (!chatBtn || !chatContainer) {
        console.error("Erro: Botão ou Container do chat não encontrados no HTML.");
        return;
    }

    // --- LÓGICA DE ABRIR/FECHAR (TOGGLE) ---
    chatBtn.addEventListener('click', function () {
        // Apenas adiciona ou remove a classe "ativo"
        // O CSS cuida de mostrar ou esconder
        chatContainer.classList.toggle('ativo');
    });

    // --- LÓGICA DE ENVIO DE MENSAGEM ---
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Função de enviar
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        addMessageToLog("Você", message);
        userInput.value = "";

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: message }),
            });

            if (!response.ok) throw new Error('Erro na resposta da API');
            
            const data = await response.json();
            addMessageToLog("Gemini", data.text || "Sem resposta recebida.");
        } catch (error) {
            console.error("Erro:", error);
            addMessageToLog("Erro", "Não foi possível conectar ao bot.");
        }
    }

    // Eventos de clique e Enter
    if(sendButton) sendButton.addEventListener("click", sendMessage);
    
    if(userInput) {
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }

    function addMessageToLog(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender === "Você" ? "user-message" : "bot-message");
        
        const senderStrong = document.createElement("strong");
        senderStrong.textContent = `${sender}: `;
        
        const messageText = document.createTextNode(message);
        messageElement.appendChild(senderStrong);
        messageElement.appendChild(messageText);
        
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }
});
// =====================
// Sidebar
// =====================

const usuarioLogado = localStorage.getItem('usuario')
const divLogado = document.getElementById('loginUser')
divLogado.innerHTML = usuarioLogado

const sair = document.getElementById("sair");

if (sair) {
  sair.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.clear()
    window.location.href = 'home.html'
  });
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


