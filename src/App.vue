<template>
  <div id="app">
    <div id="nav">
      <router-link :to="'/'">Home</router-link> | 
      <router-link :to="'/taxi/order'">Order A Taxi</router-link> |
      <router-link :to="'/currentorder'">Current Order</router-link> |
      <router-link :to="'/histiryorder'">History Order</router-link> |
      <!--<span v-if="isLoggedIn">-->
        <!--Logged in as {{ username }}-->
        <!--<a href="#" v-if="isLoggedIn" @click="logout">(logout)</a>|-->
      <!--</span>-->
      <!--<span v-else>-->
        <!--<router-link :to="'/login'">Log in</router-link>|-->
      <!--</span>-->
    </div>

    <div class="col-md-8">
      <div class="row">
        <div class="col-md-5">
          <img src="/image/tax.jpg" alt="" class="rounded">

        </div>

      </div>

    </div>

    <router-view/>
  </div>
</template>

<!--<script>-->
<!--import Vuex from 'vuex'-->
<!--export default {-->
  <!--data () {-->
    <!--return {-->
      <!--username: localStorage.getItem('username'),-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--...Vuex.mapActions(['logout'])-->
  <!--},-->
  <!--computed: {-->
    <!--...Vuex.mapGetters(['isLoggedIn'])-->
  <!--}-->
<!--}-->
<!--</script>-->


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fefefe;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #9b4dca;
}
</style>
