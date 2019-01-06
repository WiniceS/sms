<template>
  <div class='main-content'>
    <div
      class='main-container'
      :style="{marginLeft:collapse?'64px':'230px'}"
    >
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
@import "content.css";
</style>
<script type='babel'>
export default {
  name: 'v-content',
  data () {
    return {

    }
  },
  props: ['collapse'],
  computed: {
  },
  components: {},
  mounted () {
  }
};
</script>
