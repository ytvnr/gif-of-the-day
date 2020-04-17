<template>
    <section class="full-screen">
        <div class="message">
            <h2>🥳 Just one more step! 💪️</h2>
            <div>
                <h2
                    class="subtitle has-text-danger"
                >You have not been accepted by an administrator. Please contact one.</h2>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: mapState(['organizationId', 'status']),
    watch: {
        organizationId: {
            immediate: true,
            handler(newId, oldId) {
                if (newId && !oldId) {
                    this.$router.push('/');
                }
            }
        }
    }
};
</script>

<style scoped lang="scss">
h2 {
    text-align: center;
}

.full-screen {
    width: calc(100% + 24px);
    height: calc(100vh - 96px);
    overflow-y: auto;
    margin-top: -12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.message {
    background-color: darkcyan;
    height: 50%;
    width: 75%;
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

.full-height {
    height: calc(100vh - 132px);
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
