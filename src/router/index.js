import Vue from "vue";
import VueRouter from "vue-router";
import firebase from '../firebase'
import store from '../store'

import HomeView from '../views/HomeView'
import SearchView from '../views/SearchView'
import DiscoverView from '../views/DiscoverView'
import RandomView from '../views/RandomView'
import PageNotFoundView from '../views/PageNotFoundView'
import WorkoutGeneratorView from '../views/WorkoutGeneratorView'
import WorkoutCreatorView from '../views/WorkoutCreatorView'
import WorkoutListView from '../views/WorkoutListView'
import WorkoutView from '../views/WorkoutView'
import ProfileView from '../views/ProfileView'

import UserInformation from '../components/profile/UserInformation'
import Favorites from '../components/profile/Favorites'

Vue.use(VueRouter);
const router =  new VueRouter({
    // mode: 'history',
    routes: [
        { path: "*", component: PageNotFoundView },
        { path: "/", component: HomeView },
        { path: "/search", component: SearchView},
        { path: "/discover", component: DiscoverView},
        { path: "/random", component: RandomView},
        { path: "/generate", component: WorkoutGeneratorView},
        { path: "/create", component: WorkoutCreatorView},
        { path: "/workouts", component: WorkoutListView},
        { path: "/workouts/:id", component: WorkoutView},
        { path: "/profile", component: ProfileView, 
            children:[
                {path: 'user-information', component: UserInformation},
                { path: 'favorites', component: Favorites}
            ],
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser
    console.log(currentUser)

    if(currentUser){
        store.commit('auth/updateUser',currentUser)
        store.commit('auth/updateAuthStatus', true)
    }

    if (requiresAuth && !currentUser) {
        store.commit('auth/updateUser',currentUser)
        store.commit('auth/updateAuthStatus', false)
        next('/')
    } else if (requiresAuth && currentUser) {
        store.commit('auth/updateUser',currentUser)
        store.commit('auth/updateAuthStatus', true)
        next()
    } else {
        // store.commit('auth/updateUser',currentUser)
        // store.commit('auth/updateAuthStatus', true)
        next()
    }
})

export default router
