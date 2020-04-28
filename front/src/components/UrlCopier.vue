<template>
    <div class="copier">
        <input id="urlInput" type="hidden" :value="url"/>
        <v-btn
                class="ma-2"
                :class="btnState.class"
                :block="true"
                text
                @click="copyLink()"
        >{{ btnState.text }}</v-btn>
    </div>
</template>

<script>

const copyState = {
    class: "copier__ready",
    text: "Copy Link"
};

const copiedState = {
    class: "copier__copied",
    text: "Copied!"
};

export default {
    props: ['url'],
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

    &__ready {
        background-color: green;
        transition: background-color 1s ease-in;
    }

    &__copied {
        background-color: orange;
    }
}
</style>
