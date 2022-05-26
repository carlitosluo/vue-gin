<template>
  <div id="app">
    <navbar />
    <b-container>
      <router-view />
    </b-container>

  </div>
</template>

<script>
import Navbar from './views/layout/Navbar.vue';

export default {
  data() {
    return {
    };
  },

  components: { Navbar },

};

</script>
<style lang="scss">
</style>
