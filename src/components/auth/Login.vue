<template>
    <v-card>
        <v-card-title>
            <div class="headline">Login</div>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog" icon><v-icon>close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" lazy-validation v-model="valid">
                <v-text-field
                    label="Email"
                    value="john@vuetifyjs.com"
                    :rules="emailRules"
                    v-model="email"
                    required
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                    This is the email you will use to login to your Vuetify account
                </span>
                <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                    Please enter a password for your account
                </span>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="validate()" depressed :loading="loading" color="primary">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { bus } from '../../main'
export default {
    data(){
        return {
            valid: true,
            fullname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            route: '/profile/user-information',
            loading: false
        }
    },
    methods: {
        showSnackbar(){
            bus.$emit('show-snackbar', "Login Success")
        },
        closeDialog(){
            this.$emit('close-dialog')
        },
        validate () {
            if (this.$refs.form.validate()) {
                this.userLogin()
            }
        },
        userLogin(){
            let vm = this
            this.loading = true
            this.$store.dispatch('auth/userLogin', {
                email: this.email,
                password: this.password,
                route: this.route
            }).then(function(){
                console.log("Login Success")
                // vm.$router.push("/profile")
            }).catch(function(e){
                console.log(e)
            }).finally(function(){
                vm.closeDialog()
                vm.showSnackbar()
                vm.loading = false
            })
        }
    },
    computed: {
        isAuthenticated(){
            return this.$store.getters['auth/getAuthStatus']
        },
        // status(){
        //     return this.$store.getters['auth/getStatus']
        // }
    }
}
</script>

<style>

</style>
