/* Shared quiz component for teach-dify lessons.
   Usage in HTML:
     <div class="quiz" data-correct="A">
       <p><strong>Q.</strong> ...question...</p>
       <ul class="options">
         <li><button data-answer="A">...option A...</button></li>
         <li><button data-answer="B">...option B...</button></li>
         <li><button data-answer="C">...option C...</button></li>
       </ul>
       <div class="explanation" hidden>Optional explanation shown after answering</div>
       <div class="feedback"></div>
     </div>

   Design notes (per teach skill):
   - All buttons share the same styling (no formatting hints to correct answer)
   - First click locks the quiz (prevent retries that build fluency instead of storage strength)
   - Correct + wrong answer both visibly highlighted after click
   - Answer explanations are pulled from .explanation (no answer words in main text) */

(function () {
  document.querySelectorAll('.quiz').forEach((quiz) => {
    const correct = quiz.dataset.correct;
    const expEl = quiz.querySelector('.explanation');
    const explanation = expEl ? expEl.textContent.trim() : '';
    if (expEl) expEl.hidden = false; // unhide for click flow (was hidden visually until answered — display:none in css)
    const buttons = quiz.querySelectorAll('button');
    const feedback = quiz.querySelector('.feedback');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (quiz.dataset.answered) return;
        quiz.dataset.answered = '1';

        buttons.forEach((b) => {
          b.disabled = true;
          if (b.dataset.answer === correct) b.classList.add('correct');
        });

        const isCorrect = btn.dataset.answer === correct;
        if (!isCorrect) btn.classList.add('wrong');

        feedback.classList.add('show');
        let msg = isCorrect
          ? '✅ 答對。'
          : '❌ 不對，正確答案已高亮。';
        if (explanation) msg += ' ' + explanation;
        feedback.textContent = msg;
      });
    });
  });
})();
