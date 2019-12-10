<template>
    <div>
        <v-img
                src="https://firebasestorage.googleapis.com/v0/b/fitness-app-2f2f9.appspot.com/o/site_images%2FFirebird%20banner%20(6).png?alt=media&token=35b38d1a-3b1b-4b96-9f5c-e868015626ad"
                class="grey lighten-2"
                aspect-ratio="2.3"
        >
            <v-layout fill-height
                      align-center>
                <v-flex text-xs-center >
                    <h1 class="display-3 font-weight-light white--text">
                        <!-- <div> Firebird Fitness</div> -->
                        <!-- <v-btn large color="primary">Get Started</v-btn> -->
                    </h1>
                </v-flex>
            </v-layout>
        </v-img>
        <!-- <v-container> -->
            <!-- <SearchOptions/> -->
        <!-- </v-container> -->
        <Search/>
        <v-container>
            <EmailListSignUp/>
        </v-container>
    </div>
</template>

<script>
import Options from '../components/Options'
import Search from '../components/Search'
import EmailListSignUp from '../components/EmailListSignUp'
export default {
    components: {
        Options,
        Search,
        EmailListSignUp
    }

}
</script>

<style>

</style>
