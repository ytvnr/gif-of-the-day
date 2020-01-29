<template>
  <v-navigation-drawer
    :clipped="true"
    :floating="false"
    :mini-variant="isDrawerMini"
    :permanent="true"
    app
    overflow
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>Aurelien Loyer</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
    props: [
        'isDrawerMini'
    ],
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', href: '/' },
          { title: 'Gifs', icon: 'mdi-gif', href: '/gifs' },
          { title: 'Teams', icon: 'mdi-account-group', href: '/teams' },
          { title: 'About', icon: 'mdi-help-box', href: '/about' },
          { title: 'Logout', icon: 'mdi-logout', href: '/logout' },
        ],
      }
    },
}
</script>

<style>
</style>