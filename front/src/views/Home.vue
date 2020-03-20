<template>
  <div class="home">
    {{user.uid}}
    <div v-if="assignedTeamId" class="content">
      <h1>The gif of the day is <b class="todo">to be defined</b> for team</h1>
      {{assignedTeamId}}
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
  }
</style>
