<template>
  <div class="home">
    <div v-if="assignedTeamId" class="content">
      <h1>⭐️ Welcome <b class="todo">{{user.displayName || user.email}}</b> ! 💪</h1>

    </div>
    <div v-if="assignedTeamId" class="content">
      <h1>The gif of the day is <strong class="todo">to be defined</strong> for team</h1>
      <h2>✨✨ <strong class="team">{{assignedTeamId}}</strong> ✨✨</h2>
    </div>

    <div v-if="!assignedTeamId" class="content">
      <h1>Your are not assigned to a team. Please join one:</h1>

      <router-link :to="{ name: 'teams'}">
        <v-btn class="ma-2" outlined color="lime">Join a team!</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
    name: 'home',
    components: {
    },
    computed: {
        assignedTeamId() {
            return this.$store.getters.assignedTeamId;
        },
        user() {
            return this.$store.getters.user;
        }
    }
}
</script>

<style>
  .home {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content {
    text-align: center;
  }

  a {
    text-decoration: none;
  }

  .todo {
    color: orange;
    text-transform: uppercase;
  }

  .team {
    color: lime;
  }
</style>
