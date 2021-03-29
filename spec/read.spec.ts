import { test } from 'zora'
import { TestApp } from './TestApp'
import { products } from './helpers/TestProduct'
import { listOf } from './helpers/TestHelpers'

test("Read Products Capability", async function (suite) {

  await suite.test('when the app first loads', async function(t) {
    const testApp = await new TestApp(t)
      .withProducts(listOf(3, products))
      .start()

    await testApp.expectProductsToBeDisplayed(listOf(3, products))

    testApp.stop()
  })

})