<template>
  <v-app style="background-color: #001C36;">
    <link href="https://fonts.googleapis.com/css?family=Amatic+SC:700|Charm:700|Mukta:500,700,800|Open+Sans:400,600|Prompt:100,300,400,500,600,700|Roboto:700|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei" rel="stylesheet">
    <router-view/>
  </v-app>
</template>

<style>
  [class*="formSection"]{
    min-width: unset;
  }
  .application {
    background-color: rgb(0, 28, 54) !important;
    background-image: url(/public/tech-background-tall-1x.png)  !important;
    background-repeat: repeat-x  !important;
    background-attachment: fixed !important;
    background-size: 845px  !important;
    background-position-y: 150px !important;
  }
  body {
    background-color: rgb(0, 28, 54) !important;

  }
  @media screen and (max-width: 600px) {
    .application {
      background-color: rgb(0, 28, 54) !important;
      background-image: url(/public/tech-background-tall-1x.png)  !important;
      background-attachment: fixed !important;
      background-repeat: no-repeat  !important;
      background-size: 845px  !important;
      background-position-y: 150px !important;

    }
  }
</style>

<script>
import Toolbar from './components/Toolbar'
import PlayerDetails from './components/PlayerDetails'
import Quests from './components/Quests'
import Quest from './components/Quest'
import Home from './components/Home'
import Setup from './components/Setup'
import Splash from './components/Splash'
import { components } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'

export default {
  name: 'App',
  components: {
    Toolbar,
    Home,
    Setup,
    Splash,
    components
  }
}
</script>