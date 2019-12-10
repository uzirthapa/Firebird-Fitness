import Vue from "vue";
import Vuex from 'vuex'
import firebase from '../firebase';
import _ from 'lodash'

Vue.use(Vuex)

import auth from './modules/auth'
import user from './modules/user'

const debug = process.env.NODE_ENV !== "production";
var db = firebase.firestore()

const state = {
    workouts: [],
    status: { loading: false }

}

const getters = {
    getWorkouts() {
        return state.workouts
    },
    getWorkoutById: (state) => (id) => {
        return state.workouts.find(workout => workout.id === id)
    },
    getStatus() {
        return state.loading
    }
}

const actions = {
    getWorkouts() {
        var vm = this
        vm.commit('updateStatus', true)
        db.collection('workouts').get().then(function (docs) {
            if (docs.empty) {
                // vm.results = []
                return
            }

            var data = []
            for (var i = 0; i < docs.size; i += 1) {
                var doc = docs.docs[i];
                data.push(doc.data());
            }

            vm.commit('updateWorkouts', data)
            // vm.commit('updateIsLoading', false)

        }).finally(function () {
            vm.commit('updateStatus', false)
            // vm.isLoading = false
            // if(vm.lastVisible.id == vm.results[vm.results.length-1].id){
            //     vm.allItemsLoaded = true
            // }
        })
    },

}

const mutations = {
    updateWorkouts(state, value) {
        // Vue.set(state.workouts,)
        _.assign(state.workouts, value)
    },
    updateStatus(state, value) {
        Vue.set(state.status, 'loading', value)
        // _.assign(state.status.loading, value)
    }
}

export default new Vuex.Store({
    modules: {
        auth,
        user
    },
    state,
    getters,
    actions,
    mutations
})
