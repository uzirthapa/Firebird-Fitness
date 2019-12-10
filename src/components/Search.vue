<template>
    <v-container>
        <v-layout wrap>
             <v-flex xs12 sm12 md10>
                 <v-text-field
                    class="mx-3"
                    label="Search"
                    prepend-inner-icon="search"
                    v-model="searchText"
                    :loading="isLoading"
                    v-on:keyup="search()"
                    solo
                 >
                 </v-text-field>
             </v-flex>

             <v-flex sm12 md2 xs12 text-xs-center>
                 <v-btn @click="search()" large color="primary">
                    search
                    <v-icon right dark>search</v-icon>
                 </v-btn>
             </v-flex>
             <SearchOptions @reset-search="refresh" @preset-search="presetSearch"/>
             <v-flex xs12 text-xs-center>
                 <div v-if="results.length == 0">No Results</div>
             </v-flex>
         </v-layout>
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
                            <v-spacer></v-spacer>
                            <div>
                                <!-- <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on" ><v-icon color="grey">favorite</v-icon></v-btn>
                                        </template>
                                    <span>WIP</span>
                                </v-tooltip> -->
                                
                            </div>
                        </v-card-title>
                        
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout wrap text-xs-center>
                <v-flex>
                    <v-btn :loading="isLoading" :disabled="allItemsLoaded" flat @click="loadMore()">Load More</v-btn>
                </v-flex>
            </v-layout>

        </v-container>
    </v-container>
</template>

<script>
import firebase from '../firebase'
import { constants } from 'crypto';
import SearchOptions from '../components/SearchOptions'
var db = firebase.firestore();
var searchTimeout = null;
export default {
    components: {
        SearchOptions,
    },
    data() {
        return {
            items: [
                {
                    id: "0",
                    name: "Dumbell Curls",
                    target: "Arms",
                    videoId: "https://youtube.com/embed/cBSD6mQIPQk?rel=0"
                }
            ],
            searchText: '',
            isLoading: false,
            results: [],
            lastVisible: null,
            allItemsLoaded: false
        }
    },
    created(){
        this.refresh()
    },
    methods: {
        presetSearch(searchText) {
            this.searchText = searchText
            this.search()
        },
        refresh() {
            this.results = []
            var top10 = db.collection('items').limit(9);
            this.runQuery(top10);
        },
        search(){

            let vm = this
            this.results = []
            if (this.searchText.trim() == ''){
                this.refresh();
                return
            }

            var queryString = this.searchText.trim()

            if (queryString.length < 2) {
                this.results = [];
                return;
            }

            queryString = queryString.toLowerCase();

            var query = db.collection('items');
            var parts = queryString.split(' ');
            var valid = false;

            for (var i = 0; i < parts.length; i++){
                var part = parts[i].trim();
                if (part.length < 2){
                    continue;
                }

                valid = true;
                console.log(part)
                // query = query.where('tags', 'array-contains', part).limit(9);
                query = query.where('terms.'+part, '==', true).limit(9)
                console.log(query)
            }

            if(!valid){
                this.results = [];
                return;
            }

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
                    vm.results.push(doc.data());
                }

                data.sort(function (a, b) {
                    if (a.tags < b.tags) return -1;
                    if (a.tags > b.tags) return 1;
                    return 0;
                });

                console.log(data)

                vm.lastVisible = docs.docs[docs.docs.length - 1];

                console.log(vm.lastVisible)

                // if(vm.results.length > 1){

                // }
                // vm.results = data

            }).finally(function(){
                vm.isLoading = false
                // if(vm.lastVisible.id == vm.results[vm.results.length-1].id){
                //     vm.allItemsLoaded = true
                // }
            })

        },

        loadMore(){

            let vm = this
            var queryString = this.searchText.trim()

            if (queryString.length < 2) {
                // this.results = [];
                var query = db.collection('items').startAfter(vm.lastVisible).limit(9);
                this.runQuery(query)
                return;
            }
            // console.log(this.lastVisible)

            // console.log(this.results[this.results.length-1])


            queryString = queryString.toLowerCase();

            var query = db.collection('items');
            var parts = queryString.split(' ');
            var valid = false;

            for (var i = 0; i < parts.length; i++){
                var part = parts[i].trim();
                if (part.length < 2){
                    continue;
                }

                valid = true;
                console.log(part)
                query = query.where('tags', 'array-contains', part).startAfter(vm.lastVisible).limit(9);
                console.log(query)
            }

            if(!valid){
                this.results = [];
                return;
            }

            clearTimeout(searchTimeout);



            searchTimeout = setTimeout(function() {
                vm.runQuery(query)
            }, 300)
        }
    }
}
</script>

<style>

</style>
