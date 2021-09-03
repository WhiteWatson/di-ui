<template>
  <div class="k-0g35po">
    <div class="k-0g35po-title">UI</div>
    <div class="k-0g35po-conent">
      <div class="k-0g35po-continer">
      <headerBar />
      <mainContent />
      </div>
    </div>
    <navMenu />
  </div>
</template>
<script>
import navMenu from "@/components/navMenu";
import mainContent from "@/components/mainContent";
import headerBar from "@/components/headerBar";
export default {
  components: {
    navMenu,
    mainContent,
    headerBar,
  },
};
</script>
<style lang="less" src="./index.less"></style>
