const InAppBilling = require('react-native-billing')

const productId = 'io.cmichel.rapquiz.noads'

export async function purchaseNoAds() {
  await InAppBilling.close() // To be sure the service is closed before opening it
  try {
    await InAppBilling.open()
    if (!await InAppBilling.isPurchased(productId)) {
      const details = await InAppBilling.purchase(productId)
      console.log('You purchased: ', details)
    }
    const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(
      productId,
    )
    console.log('Transaction Status', transactionStatus)
    return transactionStatus.purchaseState === 'PurchasedSuccessfully'
    // const productDetails = await InAppBilling.getProductDetails(productId)
    // console.log(productDetails)
  } catch (err) {
    // called when back button pressed on purchasing or any other non-purchase action
    throw err
  } finally {
    // await InAppBilling.consumePurchase(productId) // resets it to be purchasable again, do not want
    await InAppBilling.close()
  }
}
