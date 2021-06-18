const SitemapGenerator = require('sitemap-generator');

let i = 0

// create generator
const generator = SitemapGenerator('http://jyavs.com', {
    stripQuerystring: false,
});

generator.on('add', url => {
    i++
    console.log(`Add ${i} url: ${url}`)
})

// register event listeners
generator.on('done', () => {
  // sitemaps created
  console.log('finished!!!!!')
});

// start the crawler
generator.start();