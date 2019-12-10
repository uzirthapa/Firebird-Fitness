<template>
<div>
    <div class="headline mb-2">Personal Information</div>
    <!-- {{user}} -->
    <v-form>
        <v-card>
            <v-card-text>
                <v-text-field
                    v-model="user.name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="user.email"
                    label="Email"
                    required
                ></v-text-field>
            </v-card-text>
           
        </v-card>
        
    </v-form>
</div>

</template>

<script>
export default {
    data(){
        return {
            name: null,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ]
        }
    },
    created(){
        this.$store.dispatch('user/getUser')
    },
    computed: {
        user(){
            console.log(this.$store.getters['user/getUser'])
            return this.$store.getters['user/getUser']
        }
    }
}
</script>

<style>

</style>
