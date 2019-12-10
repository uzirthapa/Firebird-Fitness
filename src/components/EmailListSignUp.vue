<template>
<v-container
    id="subscribe"
    tag="section"
  >
   <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Thank you! 
        </v-card-title>

        <v-card-text>
          Thank you for signing up for our Newsletter!
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card
      color="rgba(203, 170, 92, 0.51)"
      class="pa-3"
    >
      <v-container
        grid-list-xl
        pa-0
      >
        <v-layout wrap>
          <v-flex
            xs12
            md5
          >
            
            <div class="text-uppercase font-weight-bold mb-3">
              Subscribe
            </div>
            <p>
              Enter your email address to subscribe to our newsletter
              and receive notifications of new workouts by email.
            </p>

            
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-layout
              wrap
              pa-2
            >
              <v-text-field
                solo
                label="Email Address"
                :rules="emailRules"
                style="max-width: 400px;"
                v-model="email"
                required
              />
              <v-btn
                :block="$vuetify.breakpoint.xsOnly"
                class="ma-0"
                color="primary"
                style="height: 48px"
                @click="subscribe()"
              >
                Subscribe
              </v-btn>
              </v-layout>
            </v-form>

          </v-flex>
          <v-flex
            xs12
            md6
            offset-md1
          >
            <div class="text-uppercase font-weight-bold mb-3">Contact</div>
            <v-list class="transparent">
              <v-list-tile>
                <v-list-tile-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    email
                  </v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Email</v-list-tile-title>
                <v-list-tile-sub-title>
                  <a href="mailto:firebirdfitnessinfo@gmail.com">firebirdfitnessinfo@gmail.com</a>  
                </v-list-tile-sub-title>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>

   
</template>

<script>
import firebase from '../firebase'
var db = firebase.firestore()
export default {
    data(){
        return {
            valid: false,
            dialog: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => (v && v.length >= 3) || 'email must be greater than 3 characters',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        }
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.valid = true
          return true
        }
      },
      subscribe(){
        let vm = this
        if (!this.validate()){
          return
        }
        const email = this.email
        const ref = db.collection("email_subscriptions").doc()
        ref.set({
          id: ref.id,
          email: email
        }).then(function() {
          vm.dialog = true
        }).catch(function(e){
          alert(e)
        })
      }
    }
}
</script>

<style>

</style>
