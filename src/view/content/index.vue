<template>
    <div class="k-0g35po">
        <div class="k-0g35po-title">UI</div>
        <div  class="k-0g35po-conent" > <mainContent /></div>
        <navMenu />  
    </div>
</template>
<script>
import navMenu from './navMenu'
import mainContent from './mainContent'
export default {
    components:{
        navMenu,
        mainContent
    }
}
</script>
<style lang="less" src="./index.less">
</style>