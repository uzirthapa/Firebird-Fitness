<template>
    <v-container grid-list-md text-xs-center>
        <!-- <v-layout wrap> -->
            <swiper :options="swiperOption" style="padding: 5px">
                <swiper-slide>
                    <v-flex>
                        <v-card @click="refresh()" class="clickable">
                            <v-img
                                    src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
                                    lazy-src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
                                    aspect-ratio="3"
                                    gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)"
                                    class="grey lighten-2"
                            >
                                <div class="fill-height bottom-gradient">
                                    <v-layout fill-height align-center>
                                        <v-flex text-xs-center >
                                            <h1 class="display-1 font-weight-light white--text">
                                                All
                                            </h1>
                                        </v-flex>
                                    </v-layout>
                                </div>
                            </v-img>
                        </v-card>
                    </v-flex>
                </swiper-slide>
            <template v-for="(item, n) in searchOptions">
                <swiper-slide :key="n">
                   <v-flex >
                        <v-card @click="search(item.id)" class="clickable" >
                            <v-img
                                :src="item.imageURL"
                                :lazy-src="item.imageURL"
                                aspect-ratio="3"
                                gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)"
                                class="grey lighten-2"
                            >
                            <div class="fill-height bottom-gradient">
                                <v-layout fill-height align-center>
                                    <v-flex text-xs-center >
                                        <h1 class="display-1 font-weight-light white--text">
                                            {{item.name}}
                                        </h1>
                                    </v-flex>
                                </v-layout>
                            </div>
                            </v-img>
                        </v-card>
                    </v-flex>
                </swiper-slide>
            </template>
            <!--<div class="swiper-pagination" slot="pagination"></div>-->
        </swiper>

        <!-- </v-layout> -->
    </v-container>
</template>

<script>
export default {
     data(){
        return{
            searchOptions: [
                {
                    id: "arms",
                    name: "Arms",
                    imageURL: "https://firebasestorage.googleapis.com/v0/b/fitness-app-2f2f9.appspot.com/o/search.jpg?alt=media&token=e3e83177-4b9e-4cad-9d20-489605cacd38"
                },
                {
                    id: "legs",
                    name: "Legs",
                    imageURL: "https://firebasestorage.googleapis.com/v0/b/fitness-app-2f2f9.appspot.com/o/discover.jpg?alt=media&token=07fbd4bd-b56b-45f3-a15e-b57ac9cce47d",
                },
                {
                    id: "core",
                    name: "Core",
                    imageURL: "https://images.unsplash.com/photo-1518644961665-ed172691aaa1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                },
                {
                    id: "booty",
                    name: "Booty",
                    imageURL: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1380&q=80"
                },

                {
                    id: "chest",
                    name: "Chest",
                    imageURL: "https://firebasestorage.googleapis.com/v0/b/fitness-app-2f2f9.appspot.com/o/random.jpg?alt=media&token=2618dd90-a4ae-4591-b0f5-2112c92174d4"
                },

                {
                    id: "back",
                    name: "Back",
                    imageURL: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"
                },
                {
                    id: "body",
                    name: "Body",
                    imageURL: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
                },

            ],
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 5,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    1904: {
                        slidesPerView: 4.2,
                        spaceBetween: 5
                    },
                    1264: {
                        slidesPerView: 3.2,
                        spaceBetween: 5
                    },
                    960: {
                        slidesPerView: 2.2,
                        spaceBetween: 5
                    },
                    600: {
                        slidesPerView: 1.2,
                        spaceBetween: 10
                    }
                }
            },
        }
    },
    methods: {
        search(name){
            this.$emit('preset-search', name)
        },
        refresh(name){
            this.$emit('reset-search', name)
        }
    }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
