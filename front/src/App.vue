<template>
  <v-app id="sandbox">
    <god-drawer :isDrawerMini="isDrawerMini"></god-drawer>

    <v-app-bar :clipped-left="true" app dense>
      <v-btn icon @click="isDrawerMini = !isDrawerMini">🍔</v-btn>

      <v-toolbar-title>GIF OF THE DAY</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-chip small class="ma-2" color="red" text-color="white">alpha</v-chip>
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
html,
body {
  overflow-y: auto !important;
}

.v-navigation-drawer {
  height: calc(100vh - 96px) !important;
}

.v-content {
  padding: 64px 0px 50px 56px;
}
</style>