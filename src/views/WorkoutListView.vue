<template>
    <v-container>
        <v-layout class="mb-2">
            <v-btn icon to="/">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <div class="headline mt-2">All Workouts</div>
            <v-progress-circular
                class="ml-4"
                indeterminate
                color="primary"
                v-if="status"
        ></v-progress-circular>

        </v-layout>
        <v-container grid-list-md>
            <v-layout wrap>
                <v-flex v-for="(item, n) in workouts" xs12 sm6 md4 :key="n">
                <!--<template v-for="item in workouts">-->
                    <v-card  height="100%" :to="'/workouts/' + item.id">
                        <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                            aspect-ratio="1.7"
                            gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)"
                        >
                            <v-layout fill-height justify-center>
                                <v-icon dark size="60" style="display: inherit">fa-dumbbell</v-icon>
                            </v-layout>

                        </v-img>
                        <v-card-title >
                            <div>
                                <div class="headline">{{item.name}}</div>
                                <div class="d-flex">{{item.equipment_needed}}</div>
                            </div>
                        </v-card-title>
                        
                        

                    </v-card>
                    <!-- <v-card>
                        <v-card-actions class="pa-3">
                            <v-spacer></v-spacer>
                            <v-btn icon><v-icon>favorite</v-icon></v-btn>
                        </v-card-actions>
                    </v-card> -->
                <!--</template>-->

                </v-flex>
            </v-layout>
        </v-container>

    </v-container>
</template>

<script>
import firebase from '../firebase'
var db = firebase.firestore()
export default {
    data(){
        return {
            // workouts: [],
            rating: 3,
            isLoading: false
        }
    },
    beforeCreate(){
        this.$store.dispatch('getWorkouts')
    },
    created(){
        // this.$store.dispatch('getWorkouts')
        // this.getWorkouts()
    },
    methods: {
        // getWorkouts(){
        //     this.isLoading = true
        //     var vm = this
        //
        //     if (this.workouts.length > 0){
        //         console.log("workouts loaded")
        //         return
        //     }
        //     // vm.commit('updateIsLoading', true)
        //     db.collection('workouts').get().then(function(docs){
        //         if(docs.empty){
        //             // vm.results = []
        //             return
        //         }
        //
        //         var data = []
        //         for (var i = 0; i < docs.size; i += 1) {
        //             var doc = docs.docs[i];
        //             data.push(doc.data());
        //         }
        //
        //         vm.workouts = data
        //         // vm.commit('updateWorkouts', data)
        //         // vm.commit('updateIsLoading', false)
        //
        //     }).finally(function(){
        //
        //         vm.isLoading = false
        //         // if(vm.lastVisible.id == vm.results[vm.results.length-1].id){
        //         //     vm.allItemsLoaded = true
        //         // }
        //     })
        // }
    },
    computed: {
        workouts() {
            return this.$store.state.workouts
        },
        status(){
            return this.$store.state.status.loading
        }
    }


}
</script>

<style>

</style>
