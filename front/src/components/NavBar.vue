<template>
  <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img alt="GOD Logo" src="../../src/assets/logo.png" />
        <span class="title is-3 is-hidden-mobile">GIF OF THE DAY</span>
        <span class="title is-3 is-hidden-tablet">GOD</span>
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicMenu" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/teams">Teams</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/settings">Settings</router-link>
            <router-link class="navbar-item" to="/settings">Settings</router-link>
            <hr class="navbar-divider" />
            <router-link class="navbar-item" to="/settings">Settings</router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a v-if="!user" class="button is-primary" @click="signInWithGoogle">
              <strong>Log in</strong>
            </a>
            <div v-if="user">
              <a class="button is-danger" @click="signOut">
                <strong>Log out</strong>
              </a>
              <figure class="image is-32x32">
                <img class="is-rounded" :src="user.photoURL" />
              </figure>
            </div>
          </div>
        </div>
        <div v-if="user" class="navbar-item">
          <figure class="image is-32x32">
            <img class="is-rounded" :src="user.photoURL" />
          </figure>
        </div>
      </div>
    </div>
  </nav>
</template>

<script type="javascript">

export default {
    
    data() {
        return {
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        signInWithGoogle() {
            this.$store.dispatch('signInWithGoogleAction');
        },
        signOut() {
            this.$store.dispatch('signOutAction');
        }
    }
}
</script>

<style scoped lang="scss">
.title {
  color: #42b983 !important;
  margin-bottom: 0px !important;
  margin-left: 10px !important;
}
</style>
