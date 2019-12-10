<template>
    <v-container>
        <v-layout class="mb-2">
            <v-btn icon to="/workouts" active-class="none">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <div class="headline mt-2">{{ item.name }}</div>
            <v-progress-circular
                    class="ml-4"
                    indeterminate
                    color="primary"
                    v-if="status"
            ></v-progress-circular>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <v-card>
                    <v-card-text>
                        <div v-html="item.workout"></div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from '../firebase'
var db = firebase.firestore()
export default {
    data(){
        return {
            // item: ''
        }
    },
    created(){
        if (this.$store.state.workouts.length == 0) {
            this.$store.dispatch('getWorkouts')
        }
    },
    computed: {
        item(){
            if (!this.status){
                return this.$store.getters.getWorkoutById(this.$route.params.id)
            }
            else {
                return null
            }
        },
        status(){
            return this.$store.state.status.loading
        }
    }
}
</script>

<style>

</style>
