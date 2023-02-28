<template>
  <div class="CurrencyFilter">
   
    <h6>{{accountBalance}} {{ accountBalance | currencyUSD }}</h6>
    
  </div>
</template>

<script>
export default {
  name: 'CurrencyFilter',
  props:{
  accountBalance: {
        type: Number,
        required: true
      }
},
filters: {
    currencyUSD(value) {
      return '$' + value
    }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
