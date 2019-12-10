<template>
    <div>
        <v-img
                src="https://images.unsplash.com/photo-1517963628607-235ccdd5476c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                class="grey lighten-2"
                aspect-ratio="2.2"
        >
            <v-layout fill-height
                      align-center>
                <v-flex text-xs-center >
                    <h1 class="display-3 font-weight-light white--text">
                        <div> Error 404: Page not found</div>
                        <v-btn to="/" large color="primary">Back to Home</v-btn>
                    </h1>
                </v-flex>
            </v-layout>
        </v-img>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
