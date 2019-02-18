<template>
<div class="container">
  <form @submit="checkForm" novalidate="true">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
     <p>
      <label>Input Time</label>
       <input type="datetime13" v-model="datetime13" format="yyyy-MM-dd HH:mm:ss" name ="datetime13">
     </p>

    <p>
      <label for="toAddress">Input To Address</label>
      <input id="toAddress" v-model="toAddress" type="text" name="toAddress">
    </p>

    <p>
      <label for="fromAddress">Input From Address</label>
      <input id="fromAddress" v-model="fromAddress" type="text" name="fromAddress">
    </p>

    <p>
      <input class="button-primary" type="submit"  value="Create">
    </p>
  </form>
  </div>
</template>


<script>
 import {HTTP} from '@/util/http'
import toast from '@/util/toast'
//import axios from 'axios'
export default {
  name: 'newOrderTaxiForm',

  data () {
    return {
      errors: [],
      datetime13: new Date(),
      toAddress: null,
      fromAddress :null
    }
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.toAddress) {
        this.errors.push("Where we go?")
    }
      else  if (!this.fromAddress) {
        this.errors.push("From where we are going?")
      }
      if(!this.errors.length) {
        this.submitOrderATaxi()
      }
      e.preventDefault()
    },
    submitOrderATaxi() {

      let data = JSON.stringify({
        'user_id': 1,
        'user_name': this.login.username,
        'time': this.datetime13.toString(),
        'from_address': this.fromAddress,
        'to_address': this.toAddress
      });
      console.log(data);


      HTTP.post('/order/taxi', data ,{headers: {
          'Content-Type': 'application/json',
        }})
      //  axios.post('http://localhost:8090/taxi/order/taxi/', JSON.stringify({'user_id': 1, 'user_name':this.login.username,'time': this.datetime13.toString(), 'from_address': this.fromAddress, 'to_address':this.toAddress}))
      .then(response => {
        toast.success('Order created')
        this.$router.push('/current/' + response.data)
      })
      .catch(error => {
        toast.error(error.message)
      })
    }
  }
}
</script>