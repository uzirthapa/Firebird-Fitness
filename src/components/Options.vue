<template>
    <v-container grid-list-md text-xs-center>
        <v-layout wrap>
            <v-flex v-for="(item, n) in options" xs12 sm6 md4>
                <v-card :to="'/'+item.id">
                    <v-img
                        :src="item.imageURL"
                        :lazy-src="item.imageURL"
                        aspect-ratio="1.5"
                        
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
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            options: [
                {
                    id: "search",
                    name: "Search",
                    imageURL: "https://firebasestorage.googleapis.com/v0/b/fitness-app-2f2f9.appspot.com/o/search.jpg?alt=media&token=e3e83177-4b9e-4cad-9d20-489605cacd38"
                },
                {
                    id: "discover",
                    name: "Discover",
                    imageURL: "https://firebasestorage.googleapis.com/v0/b/fitness-app-2f2f9.appspot.com/o/discover.jpg?alt=media&token=07fbd4bd-b56b-45f3-a15e-b57ac9cce47d",
                },
                {
                    id: "random",
                    name: "Random",
                    imageURL: "https://firebasestorage.googleapis.com/v0/b/fitness-app-2f2f9.appspot.com/o/random.jpg?alt=media&token=2618dd90-a4ae-4591-b0f5-2112c92174d4"
                }
            ]
        }
    }
}
</script>

<style scoped>
.bottom-gradient {
background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>
