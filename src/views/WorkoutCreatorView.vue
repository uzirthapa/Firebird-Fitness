<template>
<v-container>
    <v-layout>
        <v-flex>
            <div class="headline mb-3">Create a workout</div>
        </v-flex>
    </v-layout>

    <v-layout>
        <v-flex>
            <Editor/>
        </v-flex>
    </v-layout>
</v-container>
    
</template>

<script>
import Editor from './EditorField'
export default {
     components: {
        Editor
    },
}
</script>

<style>

</style>
