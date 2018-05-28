function parseDOM () {
  let lang = getLang({'en': 'en', 'es': 'es'}, 'es');

  let data = todays();

  let today = document.getElementById('now');
  today.datetime = data.today.toISOString();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today.innerHTML = data.today.toLocaleDateString(lang, options);

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
  
  let legendTmpl = ('femenines' in table[lang]) ? table[lang].title[magnetic.sex] : table[lang].title;

  legend.innerHTML = legendTmpl.replace('{symbol}', magnetic.symbol);

  for (var item of data.enchantedWave) {
    let cell = document.getElementById(item["slug"]);
    let imgs = cell.getElementsByTagName('img');

    imgs[0].src = item.icon.tone;
    imgs[0].width = '32';
    imgs[1].src = item.icon.kin;
    imgs[1].width = '32';
    cell.alt = table[lang].tmpl.replace('{symbol}', item.symbol).replace('{tone}', item.tone);
    cell.title = cell.alt;
    if (item.slug === data.slug) {
      cell.classList.add('has-background-primary');
    }
  }

  let kinDOM = document.getElementById('kin');
  kinDOM.alt = table[lang].link;
  kinDOM.title = kinDOM.alt;
  kinDOM.addEventListener('click', function (tab) {
    browser.tabs.create({ url: data.trecelunasUrl });
  });

  let donate = document.getElementById('donate');
  donate.innerHTML = table[lang].donate;
  donate.addEventListener('click', function (tab) {
    browser.tabs.create({ url: 'https://github.com/Garito/tzolkin#feel-free-to-give-some-love-by-donating-cryptos' });
  })
}

parseDOM();
