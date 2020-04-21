<template>
    <div class="message">
        <h2>🥳 Just one more step! 💪️</h2>
        <div>
            <h2
                class="subtitle has-text-danger"
            >You have not been accepted by an administrator. Please contact one.</h2>
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
h2 {
    text-align: center;
}

.message {
    background-color: darkcyan;
    height: 50%;
    width: 75%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 17px;
}

.not-accepted {
    padding: 20px 10px;
    width: 500px;
    max-width: 100%;
}

.text-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.or-spacer {
    .line {
        background: white;
        width: 100%;
        height: 1px;
        margin: 40px 10px;
    }
}
</style>
