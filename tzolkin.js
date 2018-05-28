function get_kin (date) {
  var table = {
    reference: 1858,
    years: [62, 167, 12, 117, 222, 67, 172, 17, 122, 227, 72, 177, 22, 127, 232, 77, 182, 27,
            132, 237, 82, 187, 32, 137, 242, 87, 192, 37, 142, 247, 92, 197, 42, 147, 252, 97,
            202, 47, 152, 257, 102, 207, 52, 157, 2, 107, 212, 57, 162, 7, 112, 217],
    months: [0, 31, 59, 90, 120, 151, 181, 212, 243, 13, 44, 74]
  }

  var kin = table["years"][(date.getFullYear() - table["reference"]) % 52] + table["months"][date.getMonth()] + date.getDate();
  if(kin > 260) {
    kin -= 260;
  }

  return kin;
}

function get_kin_data (kin) {
  let lang = getLang({'en': 'en', 'es': 'es'}, 'es');
  var kin_num = ((kin % 20) || 20) - 1;
  var symbol = table[lang]["symbols"][kin_num];
  var tone_num = ((kin % 13) || 13);

  if ('femenines' in table[lang]) {
    var sex = (table[lang]["femenines"].indexOf(symbol) > -1) ? "femenine" : "masculine";
    var tone = table[lang]["tones"][sex][tone_num - 1];
    var slug = icons.slugs[tone_num - 1];
    var color = table[lang]["colors"][sex][((kin % 4) || 4) - 1];
  } else {
    var sex = 'androgin';
    var tone = table[lang]["tones"][tone_num - 1];
    var slug = icons.slugs[tone_num - 1];
    var color = table[lang]["colors"][((kin % 4) || 4) - 1];
  }

  var symbol_img = icons.symbols[kin_num];
  var tone_img = icons.tones[tone_num - 1];

  return {symbol: symbol, sex: sex, slug: slug, tone: tone, color: color, icon: {kin: symbol_img, tone: tone_img}}
}

function enchanted_wave (kin) {
  var tone = tone_num = ((kin % 13) || 13), magnetic = kin - tone + 1, wave = [];
  
  for(var i = 0; i < 13; i++) {
    wave.push(this.get_kin_data(magnetic++));
  }

  return wave;
}

function todays (imgs_folder = 'imgs/') {
  let lang = getLang({'en': 'en', 'es': 'es'}, 'es');
  let today = new Date();

  let trecelunasUrl = table[lang].url.replace('{dia}', today.getDate())
                               .replace('{mes}', today.getMonth() + 1)
                               .replace('{ano}', today.getFullYear());
  let kin = get_kin(today);
  let kin_metadata = get_kin_data(kin);
  let enchanted_wave_data = enchanted_wave(kin);

  let name = table[lang].tmpl.replace('{symbol}', kin_metadata.symbol).replace('{tone}', kin_metadata.tone);
  let kinImg = imgs_folder + kin_metadata.icon.kin;
  let toneImg = imgs_folder + kin_metadata.icon.tone;

  for (var item of enchanted_wave_data) {
    item.icon.kin = imgs_folder + item.icon.kin;
    item.icon.tone = imgs_folder + item.icon.tone;
  }

  return { today: today, trecelunasUrl: trecelunasUrl, kin: kin, name: name, slug: kin_metadata.slug,
           kinImg: kinImg, toneImg: toneImg, enchantedWave: enchanted_wave_data }
}