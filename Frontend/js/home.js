

const commentForm = document.getElementById('comment-form');
if (commentForm) {
  const commentInput = document.getElementById('comment-input');
  const commentsList = document.getElementById('comments-list');

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (!commentText) return;

    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.textContent = commentText;

    commentsList.appendChild(newComment);
    commentInput.value = '';
  });
}

// =====================
// Ranking (somente se existir a página de ranking)
// =====================
const rankingContainer = document.querySelector('.ranking-container');
if (rankingContainer) {
  // Aqui você poderia colocar funcionalidades dinâmicas no ranking futuramente
  console.log("Página de ranking detectada");
}
