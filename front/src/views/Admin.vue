<template>
    <div class="admin">
        <v-tabs fixed-tabs>
            <v-tab v-for="li in links" :key="li.link" :to="`/admin/${li.link}`" :disabled="li.isDisabled">
                {{ li.label }}
            </v-tab>
        </v-tabs>
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'admin',
    data() {
        return {
            links: [
                { link: '', label: 'Dashboard' },
                { link: 'organisations', label: 'Organisations', isDisabled: true },
                { link: 'teams', label: 'Teams', isDisabled: false },
                { link: 'users', label: 'Users', isDisabled: true },
            ]
        }
    },
    components: {
    },
    created(){

    }
}
</script>