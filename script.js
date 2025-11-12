const pages = [
  { title: '💖 hello cutei 💖', time: 3500 },
  { title: '💬 tum se baat karni he ... 💬', time: 5000 },
  { title: 'vooooooo..', time: 4500 },
  { title: '💞 i like you 💞', time: null, interactive: true },
  { title: '💐 thanks you yes par click karne ke liye 💐', time: 3500 },
  { title: '🌸 mai tum se mil sakta hu kay  ,🌸', time: 5000 },
  {title: ' mil sakta hu to. plz insta par massage kar dena ,', time: 5000 },
  { title: 'NA ho to mana kar dena par ghar par mat bolna tumare ok', time: 6500 },
  { title: '📸 Mera Instagram', time: null, final: true }
  
];

const INSTAGRAM = 'https://www.instagram.com/nitin__r12/';
const titleEl = document.getElementById('title');
const card = document.getElementById('card');
const extra = document.getElementById('extra');
const toasts = document.getElementById('toasts');

let idx = 0;
let paused = false;
let timer;

// Show page
function showPage(i) {
  clearTimeout(timer);
  const p = pages[i];
  card.classList.remove('show');

  setTimeout(() => {
    titleEl.textContent = p.title || '';
    extra.innerHTML = '';
    card.classList.add('show');
    titleEl.style.animation = 'fadeInUp 1s ease';

    if (p.interactive) {
      const btns = document.createElement('div');
      btns.className = 'btns';

      const yes = document.createElement('button');
      yes.className = 'btn-yes';
      yes.textContent = 'YES';

      const no = document.createElement('button');
      no.textContent = 'NO';

      btns.appendChild(yes);
      btns.appendChild(no);
      extra.appendChild(btns);

      // YES -> advance
      yes.addEventListener('click', () => {
        idx++; // increment index manually
        showPage(idx);
      });

      // NO -> show messages only, no advance
      no.addEventListener('click', () => {
        showToast(' are... ruk jao!');
        showToast(' soch lo ek baar aur!');
        showToast(' mat dabao NO!');
        // idx unchanged, page does not advance
      });
    }

    if (p.final) {
      const link = document.createElement('a');
      link.className = 'insta';
      link.href = INSTAGRAM;
      link.target = '_blank';
      link.textContent = '💌 Open my Instagram';
      extra.appendChild(link);
    }
  }, 400);

  // Only non-interactive pages get automatic timer
  if (!p.interactive && p.time !== null) {
    timer = setTimeout(() => {
      if (!paused) nextPage();
    }, p.time);
  }
}

// Next page
function nextPage() {
  if (paused) return;
  idx++;
  if (idx >= pages.length) idx = pages.length - 1;
  showPage(idx);
}

// Toast messages
function showToast(txt, ttl = 2200) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = txt;
  toasts.appendChild(t);
  setTimeout(() => t.remove(), ttl);
}

// Floating hearts
function createHearts(n = 12) {
  const wrap = document.getElementById('hearts');
  for (let i = 0; i < n; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * 100 + '%';
    h.style.top = Math.random() * 100 + '%';
    wrap.appendChild(h);
  }
}

// Hold-to-pause
document.body.addEventListener('touchstart', () => { paused = true; clearTimeout(timer); }, { passive: true });
document.body.addEventListener('touchend', () => { paused = false; showPage(idx); }, { passive: true });
document.body.addEventListener('mousedown', () => { paused = true; clearTimeout(timer); });
document.body.addEventListener('mouseup', () => { paused = false; showPage(idx); });

// Init
createHearts();
showPage(0);
