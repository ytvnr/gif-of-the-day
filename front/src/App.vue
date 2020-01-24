<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      :clipped="true"
      :floating="false"
      :mini-variant="isDrawerMini"
      :permanent="true"
      app
      overflow
    />

    <v-app-bar :clipped-left="true" app>
      <v-btn icon @click="isDrawerMini = !isDrawerMini">🍔</v-btn>
      <v-toolbar-title>GIF OF THE DAY</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-footer :inset="false" app>
      <span class="px-4">&copy; 2019 - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      isDrawerMini: true,
    }),
    created() {
      this.$vuetify.theme.dark = true;
    }
  }
</script>
