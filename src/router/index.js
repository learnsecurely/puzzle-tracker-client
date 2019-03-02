import Vue from 'vue';
import Router from 'vue-router';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import Home from '../components/Home'
import Splash from '../components/Splash'
import Leaderboard from '../components/Leaderboard'
import Setup from '../components/Setup'

import { components, AmplifyEventBus } from 'aws-amplify-vue';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import AmplifyStore from '../store/store';

Vue.use(Router);
Vue.use(Vuetify);
Vue.use(AmplifyPlugin, AmplifyModules);

let user;

getUser().then((user, error) => {
  if (user) {
    router.push({path: '/'})
  }
})

AmplifyEventBus.$on('authState', async (state) => {
  if (state === 'signedOut'){
    user = null;
    AmplifyStore.commit('setUser', null);
    router.push({path: '/Splash'})
  } else if (state === 'signedIn') {
    user = await getUser();
    router.push({path: '/'})
  }
});

function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
    if (data && data.signInUserSession) {
      AmplifyStore.commit('setUser', data);
      return data;
    } 
  }).catch((e) => {
    AmplifyStore.commit('setUser', null);
    return null
  });
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/splash',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/setup',
      name: 'Setup',
      component: Setup,
      meta: { requiresAuth: true }
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard
    },
    {
      path: '/auth',
      name: 'Authenticator',
      component: components.Authenticator,
      props: {
        authConfig: {
          signUpConfig: {
            header: 'I am the new header for the Authenticator component!',
            signUpFields: [
              {
                label: 'Address',
                key: 'address',
                type: 'string',
              }
            ]
          }
        }
      }
    }
  ]
});

router.beforeResolve(async (to, from, next) => {
  // console.log("beforeResolve -> 0 " + JSON.stringify(AmplifyStore.state,null,2))

  if (AmplifyStore.state.signedIn) {
    // console.log("beforeResolve -> 1 " + AmplifyStore.state.character.characterId)
    const character = await AmplifyStore.dispatch('loadCharacter')
    // console.log("beforeResolve -> 2 " + AmplifyStore.state.character.characterId)
    if (!AmplifyStore.state.character.characterId) {
      // console.log("beforeResolve -> 3 " + AmplifyStore.state.character.characterId)

      // console.log(to.fullPath)
      if (to.path !== '/setup') {
        next('/setup');
      } else {
        next();
      }
    }
  }
  // console.log("beforeResolve -> 4 " + JSON.stringify(AmplifyStore.state,null,2))
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log("beforeResolve -> 5 " + JSON.stringify(AmplifyStore.state,null,2))
    user = await getUser();
    // console.log("beforeResolve -> 6 " + JSON.stringify(user,null,2))
    if (!user) {
      // console.log("beforeResolve -> 7 " + JSON.stringify(AmplifyStore.state,null,2))
      return next({
        path: '/splash'
      });
  } else {
      // console.log("beforeResolve -> 1 " + AmplifyStore.state.character.characterId)
      const character = await AmplifyStore.dispatch('loadCharacter')
      // console.log("beforeResolve -> 2 " + AmplifyStore.state.character.characterId)
      if (!AmplifyStore.state.character.characterId) {
        // console.log("beforeResolve -> 3 " + AmplifyStore.state.character.characterId)
  
        // console.log(to.fullPath)
        if (to.path !== '/setup') {
          next('/setup');
        } else {
          next();
        }
      }
    }
    return next()
  }
  return next()
})

export default router