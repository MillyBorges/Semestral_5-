document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os inputs do tipo radio que têm o name="categoria"
    const opcoes = document.querySelectorAll('input[name="categoria"]');

    opcoes.forEach(radio => {
        radio.addEventListener('change', (e) => {
            // 1. Pega o ID do input clicado
            const idInput = e.target.id;
            
            // 2. Busca o Label associado a este input para pegar o texto
            const label = document.querySelector(`label[for="${idInput}"]`);
            
            if (label) {
                // Pega o texto (Ex: "📘 Romance")
                let nomeCategoria = label.textContent;

                // 3. Limpeza: Remove os emojis para pegar só o texto (opcional, mas recomendado)
                // Essa regex remove caracteres que não sejam letras ou espaços simples
                // Ou, de forma mais simples, podemos dar um split no espaço se o emoji for sempre o primeiro
                const partes = nomeCategoria.split(' '); 
                if (partes.length > 1) {
                    // Remove o primeiro elemento (emoji) e junta o resto
                    nomeCategoria = partes.slice(1).join(' '); 
                }
                
                nomeCategoria = nomeCategoria.trim(); // Remove espaços extras

                console.log("Categoria selecionada:", nomeCategoria);

                // 4. Salva a preferência e redireciona
                // Vamos usar localStorage para passar essa informação para o catalogo.js
                localStorage.setItem('filtroCategoria', nomeCategoria);

                // Pequeno delay visual de 300ms e redireciona para o catálogo
                setTimeout(() => {
                    window.location.href = '../html/catalogo.html'; // Ajuste o caminho se necessário
                }, 200);
            }
        });
    });
});