import axios from 'axios'
import countdown from 'countdown'
let showdown = require('showdown');
import firebase from '../../firebase'
import Vue from 'vue'

var db = firebase.firestore()
// make our modules namespaced to avoid method name conflicts
const namespaced = true;

// sub modules
const modules = {
};

// The variables accessible from this store - store variables should have a default value
// Store variables should not be directly assigned outside of the instance which defines them;
// if you need to change the value of a stored variable, use/create a mutation that does it for you.
const state = {
    status: {
        loading: false
    },
    user: null
};

// Methods used to get computed data from the store.
// Getters are to the Store as Computed Values are to Components - they will update their values when their dependencies change.
// state must be an input to every getter.
// More information can be found here: https://vuex.vuejs.org/en/getters.html
const getters = {
    getUser(){
        return state.user
    }
};


// Actions are methods associated with the store that can called to perform...well...actions on the stored variables
// These methods do *not* have to be synchronous.
// Actions are normally used to call mutations (defined below)
// More information can be found here: https://vuex.vuejs.org/en/actions.html
const actions = {
    getUser({commit}){
        console.log(firebase.auth().currentUser.uid)
        commit('updateStatus', true)
        db.collection('users').doc(firebase.auth().currentUser.uid).get().then(function(doc){
            if (doc.exists) {
                console.log(doc.data())
                commit('updateUser', doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        }).finally(function(){
            commit('updateStatus', false)
        });
    }

};


// Mutations are methods associated with a store that directly change the stored values.
// These methods are called synchronously (do not put API calls in mutations, instead use an Action to make the API call
// and place the necessary data in the store via a mutation).
// More information can be found here: https://vuex.vuejs.org/en/mutations.html
const mutations = {
    updateUser(state, value){
        Vue.set(state, "user", value)
    },
    updateStatus(state, value){
        Vue.set(state.status, "loading", value)
    }
};

// Return the store module
export default {
    namespaced,
    state,
    getters,
    actions,
    mutations,
    modules
}
