<template>
    <v-container>
        <v-layout>
            <v-flex>
                <div class="headline">Workout Generator</div>
            </v-flex>
            <v-flex>
                <v-btn @click="generate()" color="primary">
                    Generate
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout wrap>

            <v-flex>
                <v-checkbox
                    v-model="arms"
                    label="Arms"
                ></v-checkbox>
            </v-flex>
            <v-flex>
                <v-checkbox
                    v-model="legs"
                    label="Legs"
                ></v-checkbox>
            </v-flex>
            <v-flex>
                <v-checkbox
                    v-model="booty"
                    label="Booty"
                ></v-checkbox>
            </v-flex>
            <v-flex>
                <v-checkbox
                    v-model="back"
                    label="Back"
                ></v-checkbox>
            </v-flex>
            <v-flex>
                <v-checkbox
                    v-model="chest"
                    label="Chest"
                ></v-checkbox>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex v-for="(item, n) in results" xs12 sm6 md4>
                        <v-card>
                            <iframe width="100%" height="230" :src="'https://youtube.com/embed/'+item.youtubeId" frameborder="0" allowfullscreen id="nope"></iframe>
                            <v-card-title >
                                <div>
                                    <div class="headline">{{item.name}}</div>
                                    <div class="d-flex">{{item.target}}</div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
                <!-- <v-layout wrap text-xs-center v-if="searchText">
                    <v-flex>
                        <v-btn :loading="isLoading" :disabled="allItemsLoaded" flat @click="loadMore()">Load More</v-btn>
                    </v-flex>
                </v-layout> -->

            </v-container>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from '../firebase'
var db = firebase.firestore()
var searchTimeout = null;


export default {

    data(){
        return {
            arms: false,
            legs: false,
            booty: false,
            back: false,
            chest: false,

            isLoading: false,
            results: [],
            lastVisible: '',

        }
    },

    methods: {
        generate(){
            var query = db.collection('items');
            let vm = this
            this.results = []
            var valid = false
            var queryString = ''

            if (this.arms){
                queryString = queryString + 'arms '
            }

            if (this.legs){
                queryString = queryString + 'legs'
            }

            console.log(queryString)


            var parts = queryString.split(' ');
            console.log(parts)

            for (var i = 0; i < parts.length; i += 1) {
                var part = parts[i].trim();
                if (part.length < 2) {
                    continue;
                }

                valid = true;
                query = query.where('targetTags.' + part, '==', true);
            }

            if (!valid) {
                this.results = [];
                return;
            }


            //TODO: use RXFire to Combine queries with each other
            //https://github.com/firebase/firebase-js-sdk/tree/master/packages/rxfire
            //https://medium.com/google-developer-experts/performing-or-queries-in-firebase-cloud-firestore-for-javascript-with-rxjs-c361671b201e
            //https://github.com/brettlangdon/firestore-autocomplete


            console.log(query)

            // if (this.booty){
            //     query = query.where('tags', 'array-contains', "booty").limit(3);
            // }
            //
            // if (this.back){
            //     query = query.where('tags', 'array-contains', "back").limit(3);
            // }
            //
            // if (this.chest){
            //    query = query.where('tags', 'array-contains', "chest").limit(3);
            // }

            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                vm.runQuery(query)
            }, 300)


        },
        runQuery(query){
            this.isLoading = true
            let vm = this
            query.get().then(function(docs){
                if(docs.empty){
                    // vm.results = []
                    return
                }

                var data = []
                for (var i = 0; i < docs.size; i += 1) {
                    var doc = docs.docs[i];

                    data.push(doc.data());
                }

                data.sort(function (a, b) {
                    if (a.tags < b.tags) return -1;
                    if (a.tags > b.tags) return 1;
                    return 0;
                });

                console.log(vm.results)
                console.log(data)

                vm.lastVisible = docs.docs[docs.docs.length - 1];

                console.log(vm.lastVisible)

                // if(vm.results.length > 1){

                // }
                vm.results = data

            }).catch(function(e){
                console.log(e)
            }).finally(function(){
                vm.isLoading = false
                // if(vm.lastVisible.id == vm.results[vm.results.length-1].id){
                //     vm.allItemsLoaded = true
                // }
            })

        },
    }
}
</script>

<style>

</style>
