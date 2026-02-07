const hearts = document.querySelector('.hearts');
const h1 = document.querySelector('.h1');
const h2 = document.querySelector('.h2');
const out = document.querySelector(".content");
let done = 0;

function restartAnim(el){
  el.classList.remove('go');
  out.classList.remove('show');
  void el.offsetWidth;
  void out.offsetWidth;
  out.classList.add('show');
  el.classList.add('go');
}

hearts.addEventListener('click', () => {
  done = 0;

  h1.classList.remove('pulse');
  h2.classList.remove('pulse');

  restartAnim(h1);
  restartAnim(h2);
});

function onEnd(e){
  if (e.animationName !== 'splitLeft' && e.animationName !== 'splitRight') return;

  done++;
  if (done < 2) return;
  out.classList.remove('show');
  void out.offsetWidth;
  h1.classList.remove('go');
  h2.classList.remove('go');
  
  void h1.offsetWidth;

  h1.classList.add('pulse');
  h2.classList.add('pulse');
}

h1.addEventListener('animationend', onEnd);
h2.addEventListener('animationend', onEnd);
out.addEventListener('animationend', onEnd);

document.getElementById('year').textContent = `Przyjemnej zabawy w ${new Date().getFullYear()} zyczy Bambik `;



let bag = [];

async function loadQuestions() {
  const res = await fetch("data/questions.json");
  const data = await res.json();
  bag = [...data.questions]; 
}



function drawNoRepeat() {
  if (bag.length === 0) return null;
  const i = Math.floor(Math.random() * bag.length);
  return bag.splice(i, 1)[0]; // deletes and returns the question at index i
}


document.addEventListener("DOMContentLoaded", async () => {
  await loadQuestions();

  const btn = document.querySelector(".hearts");

  btn.addEventListener("click", () => {
    const q = drawNoRepeat();
    
    out.textContent = q ? q.text : "Koniec pytan odswiez stronke!";
  });
});