<template>
  <v-app dark>
    <toolbar/>
    <router-view/>
  </v-app>
</template>

<style>
[class*="formSection"]{
  min-width: unset;
}
</style>

<script>
import Toolbar from './components/Toolbar'
import PlayerDetails from './components/PlayerDetails'
import Quests from './components/Quests'
import Quest from './components/Quest'
import Home from './components/Home'
import Setup from './components/Setup'
import { components } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'

export default {
  name: 'App',
  components: {
    Toolbar,
    Home,
    Setup,
    components
  }
}
</script>