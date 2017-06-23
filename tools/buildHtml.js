import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if(err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  //since a separate spreasheet is only utilized for the production build, need dynamica
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (err) => {
    if (err){
      return console.log(err);
    }
    console.log('index.html witten to /dist'.green);
  });
});
