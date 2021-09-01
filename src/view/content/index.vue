<template>
  <div class="k-0g35po">
    <div class="k-0g35po-title">UI</div>
    <div class="k-0g35po-conent">
      <headerBar />
      <mainContent />
    </div>
    <navMenu />
  </div>
</template>
<script>
import navMenu from "./navMenu";
import mainContent from "./mainContent";
import headerBar from "./headerBar";
export default {
  components: {
    navMenu,
    mainContent,
    headerBar,
  },
};
</script>
<style lang="less" src="./index.less"></style>
