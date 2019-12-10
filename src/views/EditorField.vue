<template>
  <div>
    <!--Use the component in the right place of the template-->
    <tiptap-vuetify
      v-model="content"
      
      :extensions="extensions"
      class="mb-4"
    />
    <v-layout wrap >
        <v-flex xs12 text-xs-right>
            <v-btn color="indigo" outline @click="save()">Save</v-btn>
        </v-flex>
    </v-layout>
    
    
 
    <!--Here's how to make a preview (optional)-->
    <h1>Preview</h1>
    <hr>
 
    <div
      class="tiptap-vuetify-editor__content"
      v-html="content"
    />
  </div>
</template>
 
<script>
// import the component and the necessary extensions
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, CodeBlock, Paragraph, BulletList, OrderedList,
  ListItem, Link, Blockquote, HardBreak, HorizontalRule, History
} from 'tiptap-vuetify'
 import firebase from '../firebase'
var db = firebase.firestore()
export default {
  // specify in the list of components
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      // you can specify options for extension
      new Heading({
        levels: [1, 2, 3]
      }),
      new Bold(),
      new Italic(),
      new Strike(),
      new Underline(),
      new Code(),
      new CodeBlock(),
      new Paragraph(),
      new BulletList(),
      new OrderedList(),
      new ListItem(),
      new Link(),
      new Blockquote(),
      new HardBreak(),
      new HorizontalRule(),
      new History()
    ],
    // starting content for the editor
    content: `
      <h1>Yay Headlines!</h1>
      <p>All these <strong>cool tags</strong> are working now.</p>
    `
  }),
  methods: {
      save(){
        var vm = this
          console.log(this.content)
          const ref = db.collection('workouts').doc()
            const workout = this.content
          ref.set({
              id: ref.id,
              workout: workout
          }).then(function(){
            console.log(ref)
              alert("Workout Saved")
              // console.log(res)
              vm.$router.push({ path: `/custom/${ref.id}` });
          }).catch(function(e){
              alert("there was an error")
              console.log(e)
          })
      }
  }
}
</script>