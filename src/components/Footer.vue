<template>
    <v-footer
    absolute
    style="bottom: -100px"
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="grey darken-3">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>
        
      <v-card-actions >
          <v-layout wrap xs12 class="grey darken-3 justify-center">
            <v-flex xs12>
                <v-divider></v-divider> 
            </v-flex>
            <v-flex>
                &copy;2019 <strong>Firebird Fitness</strong> 
            </v-flex>
          </v-layout>
          
          
        
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
    data() {
        return {
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram'
            ]
        }
    }
}
</script>

<style>

</style>
