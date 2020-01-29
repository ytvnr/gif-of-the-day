<template>
  <v-app id="sandbox">
    
    <god-drawer :isDrawerMini="isDrawerMini"></god-drawer>

    <v-app-bar :clipped-left="true" app>
      <v-btn icon @click="isDrawerMini = !isDrawerMini">🍔</v-btn>
      <v-toolbar-title>GIF OF THE DAY</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <god-footer></god-footer>
  </v-app>
</template>

<script>

  import Footer from '@/components/Footer.vue';
  import Drawer from '@/components/Drawer.vue';

  export default {
    components: {
      'god-footer': Footer,
      'god-drawer': Drawer,
    },
    data: () => ({
      isDrawerMini: true,
    }),
    created() {
      this.$vuetify.theme.dark = true;
    }
  }
</script>

<style lang="scss">
.v-navigation-drawer {
  max-height: calc(100% - 104px) !important;
}
</style>