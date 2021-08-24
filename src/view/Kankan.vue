<template>
  <div>hello world</div>
</template>
<script>
//import axios from "axios"
export default {
  data(){
    return {
      
    }
  },
  created(){
    this.$post('api/blog/get').then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    
  }
}
</script>