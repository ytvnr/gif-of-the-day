<template>
  <v-footer :inset="false" app>
    <span>&copy; 2019 - {{ new Date().getFullYear() }}</span>

    <v-spacer></v-spacer>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          dark
          v-on="on"
          href="https://github.com/ytvnr/gif-of-the-day/graphs/contributors"
          target="_blank"
        >👨🏻‍💻</v-btn>
      </template>
      <span>Contributors</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          dark
          v-on="on"
          href="https://github.com/ytvnr/gif-of-the-day/issues/new"
          target="_blank"
        >🐛</v-btn>
      </template>
      <span>Bugs ?</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn icon dark v-on="on" href="https://github.com/ytvnr/gif-of-the-day" target="_blank">🐙</v-btn>
      </template>
      <span>Github</span>
    </v-tooltip>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style>
</style>