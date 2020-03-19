<template>
    <div class="about">
        <ul>
            <li>version: {{ mode }}.{{ version }}</li>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'about',
    data() {return {
        version:  process.env.PACKAGE_VERSION,
        mode:  process.env.VUE_APP_MODE
    }},
    components: {
    },
    created(){
    }
}
</script>
