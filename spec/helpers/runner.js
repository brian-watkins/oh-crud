const puppeteer = require('puppeteer')
const glob = require('glob')
const browserify = require('browserify')
const tsify = require('tsify')

const testGlob = process.argv[2]

const files = glob.sync(testGlob, {
  absolute: true
});

const setupFile = "./spec/helpers/setup.ts"

const b = browserify()
  .add(setupFile)
  .add(files)
  .plugin(tsify);

(async () => {

  const testBundle = await new Promise(resolve => {
    let text = ""
    b.bundle()
      .on('data', function (data) {
        text += data.toString()
      })
      .on('end', function () {
        resolve(text)
      })
  })


  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await new Promise(resolve => {
    page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i) {
        const message = msg.text()
        if (message === "TAPE_FINISHED!") {
          resolve(null)
        } else {
          console.log(msg.text());
        }
      }
    });

    page.evaluate(testBundle)
  })

  await page.close()
  await browser.close()

})();