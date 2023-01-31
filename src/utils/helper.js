import store from "../store/index"

export const handleVuexAction = (vuexAction, payload) => {
  store.dispatch(vuexAction, payload)
}

export const roundOffPrice = (price) => {
  let roundedNumber = Math.round(price * 100) / 100
  roundedNumber = roundedNumber + ""
  if(roundedNumber.indexOf('.') != -1){
    let decimalPlaces = roundedNumber.substring(roundedNumber.indexOf('.'))
    if( decimalPlaces.length == 2 ) roundedNumber = roundedNumber + '0'
  }
  else roundedNumber = roundedNumber + '.00'
  return roundedNumber
}

export const VATABLE_AMOUNT_PERCENTILE = 0.12