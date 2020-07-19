<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import { store } from './store/user'
export default {
  name: 'App',
  created(){
    if(localStorage.getItem("token")){
       store.setToken(localStorage.getItem("token"))
    }

    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("token",store.state.token)
    })
    
  }
}
</script>
