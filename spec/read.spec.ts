import test from 'tape'
import { TestApp } from './TestApp'
import { products } from './TestProduct'
import { listOf } from './TestHelpers'

test("Read Products Capability", function (suite) {

  suite.test('when the app first loads', async function(t) {
    const testApp = await new TestApp(t)
      .withProducts(listOf(3, products))
      .start()

    await testApp.expectProductsToBeDisplayed(listOf(3, products))

    t.end()
  })

})