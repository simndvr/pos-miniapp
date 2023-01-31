<template>
  <div class="flex flex-col space-y-5 lg:space-y-2 pt-2">
    <h2>Products</h2>
    <div class="flex flex-row space-x-4">
      <button @click="addItem('A1')" class="w-full p-3 bg-white shadow-md rounded-xl border border-orange-400 hover:bg-orange-200 hover:border-orange-200 hover:shadow-orange-500 hover:shadow-sm">Apples</button>
      <button @click="addItem('O1')" class="w-full p-3 bg-white shadow-md rounded-xl border border-orange-400 hover:bg-orange-200 hover:border-orange-200 hover:shadow-orange-500 hover:shadow-sm">Oranges</button>
      <button @click="addItem('L1')" class="w-full p-3 bg-white shadow-md rounded-xl border border-orange-400 hover:bg-orange-200 hover:border-orange-200 hover:shadow-orange-500 hover:shadow-sm">Lemon</button>
    </div>
    <div class="flex flex-row space-x-4">
      <button @click="addItem('A2')" class="w-full p-3 bg-white shadow-md rounded-xl border border-orange-400 hover:bg-orange-200 hover:border-orange-200 hover:shadow-orange-500 hover:shadow-sm">10 Apples</button>
      <button @click="addItem('A3')" class="w-full p-3 bg-white shadow-md rounded-xl border border-orange-400 hover:bg-orange-200 hover:border-orange-200 hover:shadow-orange-500 hover:shadow-sm">10 Apples, 5 Oranges</button>
      <button @click="addItem('L2')" class="w-full p-3 bg-white shadow-md rounded-xl border border-orange-400 hover:bg-orange-200 hover:border-orange-200 hover:shadow-orange-500 hover:shadow-sm">5 Lemons, 5 Apples</button>
    </div>
    <div class="flex flex-row justify-between">
      <h2>Cart</h2>
      <h2>{{ itemTotals }} items</h2>
    </div>
    
    <div class="flex flex-col space-y-3 justify-between h-96 lg:h-80 bg-white border rounded-sm px-2 pb-4 pt-1">
      <div class="flex flex-row text-sm overflow-y-auto">
        <table class="table-auto w-full">
          <thead class="sticky top-0 bg-white">
            <tr class="border-b text-left">
              <th class="py-1">Item</th>
              <th class="py-1 hidden md:table-cell">Item #</th>
              <th class="py-1 text-center w-3/12 lg:w-2/12">Qty</th>
              <th class="py-1 text-right w-2/12">Price</th>
              <th class="py-1 text-right w-2/12 lg:w-3/12">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="lineItems.length < 1">
              <td colspan="5" class="text-center text-gray-500 py-2">Add a product to begin</td>
            </tr>
            <tr v-for="item in lineItems" :key="item.id" class="border-b text-left">
              <td class="py-1 w-3/12">{{ item.name }}</td>
              <td class="py-1 w-2/12 hidden md:table-cell">{{ item.id }}</td>
              <td class="py-1 text-center w-3/12 lg:w-2/12">
                <button @click="removeItem(item.id)" class="mr-2 border rounded-full w-5 h-5 text-center bg-slate-400 border-slate-e00">
                  <font-awesome-icon icon="fa-solid fa-minus" size="sm" inverse fixed-width transform="shrink-2 up-1" />
                </button>
                {{item.quantity}}
                <button @click="addItem(item.id)" class="ml-2 border rounded-full w-5 h-5 text-center bg-slate-500 border-slate-400">
                  <font-awesome-icon icon="fa-solid fa-plus" size="sm" inverse fixed-width transform="shrink-3 up-2" />
                </button>
              </td>
              <td class="py-1 text-right w-2/12">₱{{ roundOff(item.price) }}</td>
              <td class="py-1 text-right w-2/12 lg:w-3/12">₱{{ roundOff(item.totalPrice)  }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex text-right justify-end font-bold text-lg">Total: ₱{{ roundOff(totalPrice) }}</div>
    </div>
  </div>
</template>

<script>
import { useGetters } from 'vuex-composition-helpers';
import { computed } from 'vue';
import products from "../data/products.json"
import { handleVuexAction, roundOffPrice } from "../utils/helper";
export default {
  setup () {
    const lineItems = useGetters({ getAllLineItems: "getAllLineItems" }).getAllLineItems
    const totalPrice = useGetters({ getTotalPrice: "getTotalPrice" }).getTotalPrice
    function getItemTotals () {
      return lineItems.value.reduce((accumulator, item) => accumulator + item.quantity, 0)
    }
    return {
      itemTotals: computed(() => { return getItemTotals() }),
      roundOff(price) { return roundOffPrice(price) },
      addItem(id) {
        handleVuexAction("handleAddToCart", products.find(product => { return product.id === id }))
      },
      removeItem(id) {
        handleVuexAction("handleRemoveFromCart", products.find(product => { return product.id === id }))
      },
      computeTotal(item) {
        return item.price * item.quantity
      },
      lineItems,
      totalPrice
    }
  }
}
</script>