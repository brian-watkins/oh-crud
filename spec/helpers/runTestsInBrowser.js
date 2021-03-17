const { chromium } = require('playwright-chromium')

const testBundleURL = process.argv[2];

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await new Promise(resolve => {
    page.on('console', async msg => {
      for (let i = 0; i < msg.args().length; ++i) {
        const message = msg.text()
        if (message === "TAPE_FINISHED!") {
          resolve(null)
        } else {
          console.log(msg.text());
        }
      }
    })

    page.goto(testBundleURL)
  })

  if (process.env.WATCH === "false") {
    await page.close()
    await browser.close()  
  }
})();