<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{

  },

  mounted(){
    // setInterval(()=>{
    //   console.log('132')
    // },1000)
    console.log(window.screen.width);
  },
  watch:{
    $route: function (data) {
      console.log(data)
    }
  }
}
</script>

<style>
</style>
