import axios from 'axios'
import countdown from 'countdown'
let showdown = require('showdown');
import Vue from 'vue'
import firebase from '../../firebase'
import router from '../../router'
import _ from 'lodash'

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
    user: {},
    status: {
        authenticated: false,
        loading: false
    },
    
};

// Methods used to get computed data from the store.
// Getters are to the Store as Computed Values are to Components - they will update their values when their dependencies change.
// state must be an input to every getter.
// More information can be found here: https://vuex.vuejs.org/en/getters.html
const getters = {
    getAuthStatus(){
        return state.status.authenticated
    },
    getStatus(){
        return state.status.loading
    },
    getUser(){
        return state.status.user
    },
    
};


// Actions are methods associated with the store that can called to perform...well...actions on the stored variables
// These methods do *not* have to be synchronous.
// Actions are normally used to call mutations (defined below)
// More information can be found here: https://vuex.vuejs.org/en/actions.html
const actions = {

    async userRegister ({commit}, { email, password, name, route }){
        commit('updateStatus', true)
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            console.log(user.user.uid)
            const ref = db.collection('users').doc(user.user.uid)
            ref.set({
                id: ref.id,
                name: name,
                email: email,
                timestamp: new Date()
            }).then(() => {
                commit('updateUser', user);
                commit('updateAuthStatus', true);
                if(route){
                    router.push(route);
                } else {
                    router.push('/');
                }
                commit('updateStatus', false)
            }).catch(() => {
                commit('updateUser', {});
                commit('updateAuthStatus', false);
            })
        }).catch((err) => {
            console.log(err)
        })
    },
    async userLogin({commit}, {email, password, route}){
        commit('updateStatus', true)
        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
            commit('updateUser', user);
            commit('updateAuthStatus', true);
            if(route){
                router.push(route);
            } else {
                router.push('/');
            }
            commit('updateStatus', false)

        }).catch(() => {
            commit('updateUser', {});
            commit('updateAuthStatus', false);
        })
    },
    async userSignOut({commit}) {
        commit('updateStatus', true)
        firebase.auth().signOut().then(() => {
            commit('updateUser', {});
            commit('updateAuthStatus', false);
            router.push('/')
            commit('updateStatus', false)
        }).catch(() => {
            commit('updateUser', {});
            commit('updateAuthStatus', false);
        })
    },

};


// Mutations are methods associated with a store that directly change the stored values.
// These methods are called synchronously (do not put API calls in mutations, instead use an Action to make the API call
// and place the necessary data in the store via a mutation).
// More information can be found here: https://vuex.vuejs.org/en/mutations.html
const mutations = {
    // the config file has not mutations associated with it - these are constants.
    updateAuthStatus(state, value){
        Vue.set(state.status, 'authenticated', value)
        // _.assign(state.status, value)
    },
    updateStatus(state, value){
        Vue.set(state.status, 'loading', value)
    },
    updateUser(state, value){
        _.assign(state.user, value)
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
