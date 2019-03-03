<template>
  <div class='main admin'>
    <LayoutHeader @onChangeCollapse="collapse=$event"></LayoutHeader>
    <LayoutContent :collapse="collapse">
      <div slot='content'>
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </div>
    </LayoutContent>
  </div>
</template>
<style lang="css">
@import "../../../asset/css/global.css";
@import "./index.css";
</style>
<script type='babel'>
import LayoutHeader from './header/header';
import LayoutContent from './content/content';
export default {
  data () {
    return {
      collapse: false
    }
  },
  components: {
    LayoutHeader,
    LayoutContent
  }
};
</script>
