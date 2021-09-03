<template>
    <div>
        <tabBar />
        <router-view />
    </div>
</template>
<script>
import tabBar from './component/tabs/tabBar.vue'
export default {
    components:{
        tabBar
    }
}
</script>