<template>
    <div class="copier" :class="{ small: isSmall }">
        <input id="urlInput" type="hidden" :value="url"/>
        <v-btn
                v-if="!isSmall"
                :class="btnState.class"
                :block="true"
                text
                @click="copyLink()"
        >{{ btnState.text }}</v-btn>
        <v-btn
                v-if="isSmall"
                class="copier__btn__small"
                :class="btnState.class"
                text
                small
                @click="copyLink()"
        >
            <v-icon>{{ btnState.icon }}</v-icon>
        </v-btn>
    </div>
</template>

<script>

const copyState = {
    class: "copier__ready",
    text: "Copy Link",
    icon: "mdi-content-copy"
};

const copiedState = {
    class: "copier__copied",
    text: "Copied!",
    icon: "mdi-check"
};

export default {
    props: {
        url: String,
        isSmall: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            btnState: copyState
        }
    },
    methods: {
        copyLink() {

            let testingCodeToCopy = document.querySelector('#urlInput');
            testingCodeToCopy.setAttribute('type', 'text');
            testingCodeToCopy.select();
            document.execCommand('copy');

            testingCodeToCopy.setAttribute('type', 'hidden');
            window.getSelection().removeAllRanges();

            //Manage this with css classes
            this.btnState = copiedState;

            setTimeout(() => this.btnState = copyState, 3000);
        }
    }
}
</script>

<style scoped lang="scss">
.copier {
    width: 120px;

    &.small {
        width: 50px;
    }

    &__ready {
        background-color: green;
        transition: background-color 1s ease-in;
    }

    &__copied {
        background-color: orange;
    }

    &__btn__small {
        padding: 0 10px !important;
        min-width: 0 !important;
    }
}

.v-icon {
    font-size: 20px;
}
</style>
