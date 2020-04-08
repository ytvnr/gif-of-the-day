<template>
    <v-row align="center" justify="center" class="full-screen">
        <v-col cols="12" sm="8" md="6" lg="6" class="text-center">
            <v-card class="login">
                <v-sheet color="red" v-if="error">
                    <h4>Errors 🤷🏻‍♂️</h4>
                    <div>{{error}}</div>
                </v-sheet>

                <v-sheet color="red" v-if="$v.$anyError && $v.$dirty">
                    <h4>Errors 🤷🏻‍♂️</h4>
                    <div class="error" v-if="!$v.password.required">Password is required.</div>
                    <div
                        class="error"
                        v-if="!$v.password.minLength"
                    >Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
                    <div
                        class="error"
                        v-if="!$v.repeatPassword.sameAsPassword"
                    >Passwords must be identical.</div>
                    <div
                            class="error"
                            v-if="!$v.firstName.required"
                    >First name is required.</div>

                    <div
                            class="error"
                            v-if="!$v.firstName.maxLength"
                    >First name max length is {{ $v.firstName.$params.maxLength.max }} letters.</div>
                    <div
                            class="error"
                            v-if="!$v.lastName.required"
                    >Last name is required.</div>

                    <div
                            class="error"
                            v-if="!$v.lastName.maxLength"
                    >Last name max length is {{ $v.lastName.$params.maxLength.max }} letters.</div>
                </v-sheet>

                <v-card-text>
                    <v-form @submit.prevent="createUserWithEmailAndPassword()">
                        <v-text-field
                            required
                            label="Email"
                            name="email"
                            prepend-icon="mdi-account"
                            type="email"
                            v-model="$v.email.$model"
                        />

                        <v-text-field
                            required
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            v-model="$v.password.$model"
                        />

                        <v-text-field
                            required
                            id="repeatPassword"
                            label="Password confirm"
                            name="repeatPassword"
                            prepend-icon="mdi-lock"
                            type="password"
                            v-model="$v.repeatPassword.$model"
                        />

                        <v-text-field
                                required
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                prepend-icon="mdi-emoticon"
                                type="text"
                                v-model="$v.firstName.$model"
                        />

                        <v-text-field
                                required
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                prepend-icon="mdi-emoticon-cool"
                                type="text"
                                v-model="$v.lastName.$model"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions class="text-center">
                    <v-btn
                        :disabled="$v.$invalid"
                        @click="createUserWithEmailAndPassword()"
                        color="red"
                    >Register for alpha 👨‍🔬🧪</v-btn>
                </v-card-actions>

                <div class="text-center or-spacer">
                    <div class="line"></div>
                    <div>or</div>
                    <div class="line"></div>
                </div>

                <strong>You already have a account ?!</strong>
                <v-card-actions class="text-center">
                    <v-btn to="login" color="primary">Login 📮</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            email: "",
            password: "",
            repeatPassword: "",
            lastName: "",
            firstName: ""
        }
    },
    validations: {
        email: {
            required,
            email,
        },
        password: {
            required,
            minLength: minLength(5),
        },
        repeatPassword: {
            required,
            sameAsPassword: sameAs('password'), 
            minLength: minLength(5),
        },
        lastName: {
            required,
            maxLength: maxLength(30),
        },
        firstName: {
            required,
            maxLength: maxLength(30),
        }
    },
    methods: {
        createUserWithEmailAndPassword() {
            if(!this.$v.$invalid){
                this.$store.dispatch('createUserWithEmailAndPassword', {
                    email: this.email,
                    password: this.password,
                    password2: this.password2,
                    lastName: this.lastName,
                    firstName: this.firstName
                });
            }
        }
    },
    created() {
        this.unsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === 'setUser') {
                this.$router.push('/');
            }
        });
    },
    computed: {
        error() {
            return this.$store.getters.error;
        }
    },
    beforeDestroy() {
        this.unsubscribe();
    },
};
</script>

<style lang="scss">
.full-screen {
    width: calc(100% + 24px);
    height: calc(100vh - 96px);
    overflow-y: auto;
    margin-top: -12px;
}

.login {
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
