<template>
  <div class="flex flex-col justify-between space-y-2 py-4 shadow-md border border-slate-300">
    <div class="flex flex-col w-full">
      <div class="flex flex-row justify-between uppercase font-bold w-full">
        <span class="text-md">Gross amount</span>
        <span class="text-slate-800 text-lg text">₱{{ roundOff(totalPrice) }}</span>
      </div>
      <div class="w-full flex flex-row justify-between uppercase font-bold">
        <span class="text-md">VAT Amount</span>
        <span class="text-slate-800 text-lg text align-items-end">₱{{ roundOff(VATAmount) }}</span>
      </div>
      <div class="w-full flex flex-row justify-between uppercase font-bold">
        <span class="text-md">Net Amount</span>
        <span class="text-green-800 text-4xl text align-items-end">₱{{ roundOff(totalPrice + VATAmount) }}</span>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-black">
        <span class="text-md uppercase text-left font-bold">Tendered Amount</span>
        <input type="text" placeholder="00.00" v-model="amountTendered" disabled
        class="bg-white rounded-md py-2 px-4 w-full text-right text-4xl border border-slate-500"/>
      </div>
    </div>
    <div class="w-full flex flex-row justify-between uppercase font-bold">
        <span class="text-md">Change</span>
        <span class="text-orange-500 text-lg text align-items-end">₱{{ roundOff(+(this.amountTendered) - roundOff(totalPrice + VATAmount)) }}</span>
      </div>
    <div class="flex flex-col space-y-2">
      <div class="flex flex-row justify-between space-x-3">
        <button @click="add(100)" class="bg-slate-500 w-full text-white rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-200 hover:shadow-sm">P100</button>
        <button @click="add(200)" class="bg-slate-500 w-full text-white rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-200 hover:shadow-sm">P200</button>
        <button @click="add(500)" class="bg-slate-500 w-full text-white rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-200 hover:shadow-sm">P500</button>
        <button @click="add(1000)" class="bg-slate-500 w-full text-white rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-200 hover:shadow-sm">P1000</button>
      </div>
      <div class="flex flex-row justify-between space-x-3">
        <button @click="calculator('7')" class="bg-white w-full rounded-md shadow-md hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">7</button>
        <button @click="calculator('8')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">8</button>
        <button @click="calculator('9')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">9</button>
        <button @click="add(10)" class="bg-slate-500 w-full text-white rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-200 hover:shadow-sm">P10</button>
      </div>
      <div class="flex flex-row justify-between space-x-3">
        <button @click="calculator('4')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">4</button>
        <button @click="calculator('5')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">5</button>
        <button @click="calculator('6')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">6</button>
        <button @click="add(20)" class="bg-slate-500 w-full text-white rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-200 hover:shadow-sm">P20</button>
      </div>
      <div class="flex flex-row justify-between space-x-3">
        <button @click="calculator('1')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">1</button>
        <button @click="calculator('2')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">2</button>
        <button @click="calculator('3')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">3</button>
        <button @click="add(50)" class="bg-slate-500 w-full text-white rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-200 hover:shadow-sm">P50</button>
      </div>
      <div class="flex flex-row justify-between space-x-3">
        <button @click="clearCharacters()" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">C</button>
        <button @click="calculator('0')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">0</button>
        <button @click="calculator('.')" class="bg-white w-full rounded-md shadow-md border hover:border-slate-200 py-2 hover:shadow-slate-500 hover:shadow-sm">.</button>
        <button @click="deleteCharacter()" class="bg-red-500 w-full rounded-md shadow-md border hover:border-red-200 py-2 hover:shadow-red-200 hover:shadow-sm">Del</button>
      </div>
    </div>
    <div class="flex flex-row space-x-4">
      <button @click="clearEverything()" class="w-full uppercase text-sm bg-orange-100 py-3 border border-orange-300 rounded-md shadow-lg">Cancel</button>
      <button @click="finishTransaction()" :disabled="+(amountTendered) < VATAmount" class="w-full uppercase text-sm bg-green-300 border border-green-500 py-3 rounded-md shadow-lg disabled:bg-slate-300 disabled:border-slate-300">Pay</button>
    </div>

  </div>
</template>

<script>
import { useGetters } from 'vuex-composition-helpers';
import { computed, ref } from 'vue';
import { VATABLE_AMOUNT_PERCENTILE, roundOffPrice, handleVuexAction } from "../utils/helper";
export default {
  setup () {
    const totalPrice = useGetters({ getTotalPrice: "getTotalPrice" }).getTotalPrice
    let amountTendered = ref('')
    function computeVATAmount() {
      return totalPrice.value * VATABLE_AMOUNT_PERCENTILE
    }
    
    return {
      VATAmount: computed(() => { return computeVATAmount() }),
      netAmount: computed(() => { return totalPrice + computeVATAmount() }),
      roundOff(price) { return roundOffPrice(price) },
      add(amount) {
        let tmp = +(this.amountTendered)
        tmp += amount
        this.amountTendered = this.roundOff(tmp)
      },
      calculator(string) {
        this.amountTendered += string
      },
      deleteCharacter() {
        this.amountTendered = this.amountTendered.slice(0, -1)
      },
      clearCharacters() {
        this.amountTendered = ''
      },
      clearEverything() {
        if (confirm("Are you sure you want to clear this transaction? This cannot be undone!")) {
          handleVuexAction("handleClearTransaction")
        }       
      },
      finishTransaction() {
        handleVuexAction("handleFinishTransaction")
      },
      amountTendered,
      totalPrice
    }
  }
}
</script>