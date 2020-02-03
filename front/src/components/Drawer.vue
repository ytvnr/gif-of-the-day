<template>
  <v-navigation-drawer
    :clipped="true"
    :floating="false"
    :mini-variant="isDrawerMini"
    :permanent="true"
    app
    overflow
  >
    <v-list-item class="px-2" v-if="user">
      <v-list-item-avatar>
        <v-img :src="user.photoURL"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{user.displayName}}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <template v-for="item in items">
        <v-list-item :key="item.title" v-if="!item.needAuth || user" link :to="item.href">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <template v-slot:append v-if="user">
      <v-list-item link to="/logout">
        <v-list-item-icon>
          <v-icon color="error">mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
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
          { title: 'Dashboard', icon: 'mdi-view-dashboard', href: '/', needAuth: false },
          { title: 'Gifs', icon: 'mdi-gif', href: '/gifs', needAuth: true },
          { title: 'Teams', icon: 'mdi-account-group', href: '/teams', needAuth: true },
          { title: 'About', icon: 'mdi-help-box', href: '/about', needAuth: false }
        ],
      }
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
}
</script>

<style>
</style>