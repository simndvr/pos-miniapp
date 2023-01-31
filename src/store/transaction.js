const state = {
  lineItems: [],
  totalPrice: 0,
};

const mutations = {
  ADD_LINE_ITEM_QUANTITY(state, itemId) {
    let itemToChange = state.lineItems.find(item => { return item.id === itemId })
    itemToChange.quantity++
    itemToChange.totalPrice = itemToChange.quantity * itemToChange.price
    state.totalPrice += itemToChange.price
  },
  REDUCE_LINE_ITEM_QUANTITY(state, itemId) {
    let itemToChange = state.lineItems.find(item => { return item.id === itemId })
    itemToChange.quantity--
    itemToChange.totalPrice = itemToChange.quantity * itemToChange.price
    state.totalPrice -= itemToChange.price
  },
  ADD_LINE_ITEM(state, cartItem) {
    state.lineItems.push({ ...cartItem, quantity: 1, totalPrice: cartItem.price })
    state.totalPrice += cartItem.price
  },
  REMOVE_LINE_ITEM(state, cartItem) {
    const indexOfItem = state.lineItems.find((item, index) => { 
      if (item.id === cartItem.id) return index 
    })
    state.lineItems.splice(indexOfItem, 1)
    state.totalPrice -= cartItem.price
  },
  CLEAR_STATE(state) {
    state.lineItems = []
    state.totalPrice = 0
  }
};

const getters = {
  getLineItem: (state) => (id) => { 
    return state.lineItems.find(item => { return item.id === id }) 
  },
  getAllLineItems: (state) => { return [...state.lineItems] },
  getTotalPrice: (state) => { return state.totalPrice },
  getTransaction: (state) => { return {...state} }
};

const actions = {
  handleAddToCart({ commit, getters }, payload) {
    let lineItem = getters.getLineItem(payload.id)
    if (lineItem) { 
      commit("ADD_LINE_ITEM_QUANTITY", payload.id)
      return
    }
    commit("ADD_LINE_ITEM", payload)
    return
  },
  handleRemoveFromCart({ commit, getters }, payload) {
    let lineItem = getters.getLineItem(payload.id) // check if item is already in lineItems
    if (lineItem.quantity > 1) { 
      commit("REDUCE_LINE_ITEM_QUANTITY", payload.id)
      return
    }
    commit("REMOVE_LINE_ITEM", payload)
    return
  },
  handleClearTransaction({ commit }, _) {
    commit("CLEAR_STATE")
  },
  handleFinishTransaction({ commit, getters }, _) {
    // some API calls here
    commit("CLEAR_STATE")
  }
};

export default { state, getters, actions, mutations }