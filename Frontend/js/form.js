// Seleciona todas as telas do questionário
const telas = document.querySelectorAll('.pergunta');

// Seleciona todos os botões "Próximo"
const botoes = document.querySelectorAll('.proximo');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const telaAtual = botao.parentElement;
    const proximaId = botao.dataset.next;
    const proximaTela = document.getElementById(proximaId);

    // Validação da tela atual
    if (!validarTela(telaAtual)) {
      alert('Por favor, preencha ou selecione pelo menos uma opção antes de continuar.');
      return;
    }

    // Esconde a tela atual e mostra a próxima
    telaAtual.classList.remove('ativa');
    if (proximaTela) {
      proximaTela.classList.add('ativa');
    }
  });
});

// Função que valida a tela atual
function validarTela(tela) {
  // Input de data
  const inputDate = tela.querySelector('input[type="date"]');
  if (inputDate) {
    return inputDate.value.trim() !== '';
  }

  // Checkbox
  const checkboxes = tela.querySelectorAll('input[type="checkbox"]');
  if (checkboxes.length > 0) {
    return Array.from(checkboxes).some(checkbox => checkbox.checked);
  }

  // Se não tiver input nem checkbox, passa
  return true;
}