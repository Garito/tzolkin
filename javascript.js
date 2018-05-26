let data = todays();

let today = document.getElementById('now');
today.datetime = data.today.toISOString();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
today.innerHTML = data.today.toLocaleDateString('es-es', options);

let kinNumber = document.getElementById('kin-number');
kinNumber.innerHTML = data.kin;

let kinName = document.getElementById('kin-name');
kinName.innerHTML = data.name;

let toneImg = document.getElementById('tone-img');
toneImg.src = data.toneImg;

let kinImg = document.getElementById('kin-img');
kinImg.src = data.kinImg;

let legend = document.getElementById('legend');
let magnetic = data.enchantedWave[0];
legend.innerHTML = (magnetic.sex === 'femenine' ? ' la ' : 'l ') + magnetic.symbol;

for (var item of data.enchantedWave) {
  let cell = document.getElementById(item.slug);
  let imgs = cell.getElementsByTagName('img');
  imgs[0].src = item.icon.tone;
  imgs[1].src = item.icon.kin;
  cell.alt = item.symbol + ' ' + item.tone;
  cell.title = cell.alt;
  if (item.slug === data.slug) {
    cell.classList.add('has-background-primary');
  }
}

let kinDOM = document.getElementById('kin');
kinDOM.addEventListener('click', function (tab) {
  chrome.tabs.create({ url: data.trecelunasUrl });
});

let donate = document.getElementById('donate');
donate.addEventListener('click', function (tab) {
  chrome.tabs.create({ url: 'https://github.com/Garito/tzolkin#feel-free-to-give-some-love-by-donating-cryptos' });
})
