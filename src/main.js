import { issues } from './issues.js';

const content = document.querySelector('#content');
const dialog = document.querySelector('#issue-dialog');
const photo = (cls, image, title, issue, caption) => `<button class="polaroid ${cls}" data-issue="${issue}" aria-label="Open ${title}"><img src="/public/images/${image}" alt="${title}" /><span>${caption}</span></button>`;

function home() {
  return `<section class="desk" aria-label="POPEYE editorial desk">
    <span class="desk-edition">THE CITY BOY’S DESK — TOKYO, JAPAN</span>
    ${photo('tokyo', 'issue-937.jpg', 'POPEYE issue 937: Hello, Tokyo!', '937', 'a day in Tokyo, 2025')}
    ${photo('travel', 'issue-928.jpg', 'POPEYE issue 928: tropical Asia', '928', 'somewhere in Asia ↗')}
    <div class="desk-title"><p>こんにちは、シティボーイ。</p><h1><img src="/public/images/popeye-logo.png" alt="POPEYE" /></h1><span>Magazine for City Boys</span><div class="hand-links"><a href="#issues">issues <span>↗</span></a><a href="#scrapbook">scrapbook <span>↗</span></a></div></div>
    ${photo('stack', 'reading-stack.jpg', 'A stack of POPEYE magazines', 'collection', 'weekend reading ☕')}
    ${photo('city', 'issue-928.jpg', 'An evening on a street in Asia', '928', 'take the long way home.')}
    <span class="desk-note">Stay curious.<br>Go outside.<br>Find your own style.</span>
    <span class="paperclip" aria-hidden="true"></span><span class="desk-bottom">GOOD DAYS START WITH A LITTLE CURIOSITY.</span>
    <a class="desk-arrow" href="#issues" aria-label="Explore the issues">↓</a>
  </section>`;
}

function archive(scrapbook = false) {
  return `<section class="archive"><div class="page-heading"><p>${scrapbook ? 'THINGS WORTH KEEPING' : 'FROM THE BOOKSHELF'}</p><h1>${scrapbook ? 'The scrapbook.' : 'Selected issues.'}</h1><span>${scrapbook ? 'A few pages from a city boy’s world.' : 'Places to go. Things to wear. A life to make your own.'}</span></div>
    <div class="filters" aria-label="Filter issues">${['All', 'City guide', 'Travel', 'Collection'].map((x) => `<button aria-pressed="${x === 'All'}" data-filter="${x}">${x}</button>`).join('')}</div>
    <div class="issue-grid">${issues.map(x => `<button class="issue-card" data-category="${x.category}" data-issue="${x.id}"><div class="card-image"><img src="/public/images/${x.image}" alt="${x.title} — POPEYE ${x.id === 'collection' ? 'magazine collection' : 'issue ' + x.id}" loading="lazy" /><span>Take a look ↗</span></div><div class="card-caption"><h2>${x.title}</h2><span>↗</span></div><p>${x.category} · ${x.date}</p></button>`).join('')}</div></section>`;
}

function about() {
  return `<section class="about"><p class="eyebrow">A MAGAZINE. A WAY OF LOOKING AT THINGS.</p><h1>Hello,<br>city boy.</h1><div class="about-columns"><img src="/public/images/reading-stack.jpg" alt="POPEYE magazines collected on a wooden table" /><div><h2>Life is in the little things.</h2><p>An afternoon in a new neighbourhood. A well-loved jacket. A good meal with a friend. This is a small digital bookshelf for the endlessly curious world of POPEYE.</p><p>This independent fan project adapts the visual language of Uthinh Pham’s portfolio into an editorial scrapbook. It is not affiliated with POPEYE or its publisher. Magazine covers and the logo belong to their respective owners.</p><a class="text-link" href="https://popeyemagazine.jp/" target="_blank" rel="noopener noreferrer">Visit the official POPEYE website ↗</a><a class="text-link" href="#issues">Browse the bookshelf ↗</a></div></div></section>`;
}

function render() {
  const route = location.hash.slice(1) || 'home';
  content.innerHTML = route === 'issues' ? archive() : route === 'scrapbook' ? archive(true) : route === 'about' ? about() : home();
  document.querySelectorAll('nav a').forEach(a => a.getAttribute('href') === '#' + route ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  document.title = `POPEYE — ${ { issues: 'Selected issues', scrapbook: 'The scrapbook', about: 'Hello, city boy' }[route] || 'Magazine for City Boys' }`;
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => { render(); content.focus({ preventScroll: true }); });
render();

content.addEventListener('click', event => {
  const filter = event.target.closest('[data-filter]');
  if (filter) {
    content.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
    content.querySelectorAll('.issue-card').forEach(card => { card.hidden = filter.dataset.filter !== 'All' && card.dataset.category !== filter.dataset.filter; });
  }
  const trigger = event.target.closest('[data-issue]');
  if (!trigger) return;
  const issue = issues.find(x => x.id === trigger.dataset.issue);
  document.querySelector('#issue-detail').innerHTML = `<img src="/public/images/${issue.image}" alt="${issue.title}" /><div><p class="eyebrow">${issue.category} · ${issue.date}</p><h2>${issue.title}</h2><p lang="ja">${issue.japanese}</p><p>${issue.description}</p><a class="text-link" href="https://popeyemagazine.jp/" target="_blank" rel="noopener noreferrer">Explore POPEYE’s official website ↗</a><small>Editorial notes for this independent archive; not a reproduction of the magazine’s articles.</small></div>`;
  dialog.showModal();
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });

const canvas = document.querySelector('#sketch');
const context = canvas.getContext('2d');
let drawing = false;
function sizeCanvas() {
  const previous = document.createElement('canvas');
  previous.width = canvas.width; previous.height = canvas.height;
  previous.getContext('2d').drawImage(canvas, 0, 0);
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = rect.width * ratio; canvas.height = rect.height * ratio;
  context.drawImage(previous, 0, 0, canvas.width, canvas.height);
  context.scale(ratio, ratio); context.lineWidth = 2; context.lineCap = 'round'; context.lineJoin = 'round'; context.strokeStyle = '#315b51';
}
new ResizeObserver(sizeCanvas).observe(canvas);
const point = event => { const rect = canvas.getBoundingClientRect(); return [event.clientX - rect.left, event.clientY - rect.top]; };
canvas.addEventListener('pointerdown', event => { drawing = true; canvas.setPointerCapture(event.pointerId); context.beginPath(); context.moveTo(...point(event)); canvas.closest('section').classList.add('has-drawing'); });
canvas.addEventListener('pointermove', event => { if (drawing) { context.lineTo(...point(event)); context.stroke(); } });
for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) canvas.addEventListener(type, () => { drawing = false; });
document.querySelector('#clear-drawing').addEventListener('click', () => { context.save(); context.resetTransform(); context.clearRect(0, 0, canvas.width, canvas.height); context.restore(); canvas.closest('section').classList.remove('has-drawing'); });
