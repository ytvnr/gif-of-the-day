<template>
    <span class="powered">
        Powered by
        <a
            class="powered__terms"
            target="_blank"
            href="https://support.giphy.com/hc/en-us/articles/360020027752-GIPHY-User-Terms-of-Service"
        >GIPHY</a>
    </span>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.powered {
    color: #c1c1c1;
    font-size: 13px;
    text-align: right;
    position: absolute;
    bottom: 20px;
    left: 25px;
    background: #121212;
    padding: 5px;
    z-index: 999;
    border-radius: 4px;

    &__terms {
        text-decoration: none;
        font-weight: bold;
        color: #c1c1c1 !important;
    }
}
</style>
