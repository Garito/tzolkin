function slugify (text) {
  // https://gist.github.com/merolhack/3b242fac97e4167ec2be
  var from = "ÁÀãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaaaeeeeeiiiiooooouuuunc------";
  for(var i = 0; i < from.length; i++) {
    text = text.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  return text
      .toString()                     // Cast to string
      .toLowerCase()                  // Convert the string to lowercase letters
      .trim()                         // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-y-')           // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

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

function kin_data (kin) {
  var table = {
    symbols: ["Dragón", "Viento", "Noche", "Semilla", "Serpiente", "Enlazador de mundos", "Mano",
              "Estrella", "Luna", "Perro", "Mono", "Humano", "Caminante del cielo", "Mago",
              "Águila", "Guerrero", "Tierra", "Espejo", "Tormenta", "Sol"],
    tones: {
      femenine: ["Magnética", "Lunar", "Eléctrica", "Autoexistente", "Entonada", "Rítmica",
                 "Resonante", "Galáctica", "Solar", "Planetaria", "Espectral", "Cristal",
                 "Cósmica"],
      masculine: ["Magnético", "Lunar", "Eléctrico", "Autoexistente", "Entonado", "Rítmico",
                  "Resonante", "Galáctico", "Solar", "Planetario", "Espectral",
                  "Cristal", "Cósmico"]
    },
    colors: {
      femenine: ["Roja", "Blanca", "Azul", "Amarilla"], 
      masculine: ["Rojo", "Blanco", "Azul", "Amarillo"]
    },
    femenines: ["Noche", "Semilla", "Serpiente", "Mano", "Estrella", "Luna", "Águila", "Tierra", "Tormenta"]
  }
  var symbol = table["symbols"][((kin % 20) || 20) - 1];

  var sex = (table["femenines"].indexOf(symbol) > -1) ? "femenine" : "masculine";
  var tone_num = ((kin % 13) || 13);
  var tone = table["tones"][sex][tone_num - 1];
  var slug = slugify(table["tones"]["masculine"][tone_num - 1]);
  var tone_icon = table["tones"]["masculine"][tone_num -1];
  var color = table["colors"][sex][((kin % 4) || 4) - 1];
  var symbol_img = this.slugify(symbol.split(" ")[0]) + ".gif";
  var tone_img = tone_num + "_" + this.slugify(tone_icon) + ".png";

  return {symbol: symbol, sex: sex, slug: slug, tone: tone, color: color, icon: {kin: symbol_img, tone: tone_img}}
}

function enchanted_wave (kin) {
  var tone = tone_num = ((kin % 13) || 13), magnetic = kin - tone + 1, wave = [];
  
  for(var i = 0; i < 13; i++) {
    wave.push(this.kin_data(magnetic++));
  }

  return wave;
}

function todays (imgs_folder = 'imgs/') {
  let today = new Date();

  let trecelunasLink = 'http://13lunas.net/umbral.htm?nombre=Hoy&dia={dia}&mes={mes}&ano={ano}&B1=Enviar';
  let trecelunasUrl = trecelunasLink.replace('{dia}', today.getDate())
                                    .replace('{mes}', today.getMonth() + 1)
                                    .replace('{ano}', today.getFullYear());
  let kin = get_kin(today);
  let kin_metadata = kin_data(kin);
  let enchanted_wave_data = enchanted_wave(kin);

  let name = kin_metadata.symbol + ' ' + kin_metadata.tone;
  let kinImg = imgs_folder + kin_metadata.icon.kin;
  let toneImg = imgs_folder + kin_metadata.icon.tone;

  for (var item of enchanted_wave_data) {
    item.icon.kin = imgs_folder + item.icon.kin;
    item.icon.tone = imgs_folder + item.icon.tone;
  }

  return { today: today, trecelunasUrl: trecelunasUrl, kin: kin, name: name, slug: kin_metadata.slug,
           kinImg: kinImg, toneImg: toneImg, enchantedWave: enchanted_wave_data }
}