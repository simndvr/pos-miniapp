import { createStore } from "vuex";
import transaction from "./transaction"

const store = createStore({
  modules: {
    transaction,
  },
});

export function useStore() {
  return store;
}

export default store;