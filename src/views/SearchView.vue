<template>
    <v-container>
        <v-layout class="mb-2">
            <v-flex xs1>
                <v-btn to="/" icon>
                    <v-icon>arrow_back</v-icon>
                </v-btn>
            </v-flex>
            <v-flex>
                 <div class="headline pt-2">Search Workouts</div>
            </v-flex>
        </v-layout>
        <Search/>
    </v-container>
</template>

<script>
import Search from '../components/Search'

export default {
    components: {
        Search
    }
}
</script>

<style>

</style>
