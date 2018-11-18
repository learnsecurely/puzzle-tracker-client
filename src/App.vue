<template>
  <v-app dark>
    <toolbar></toolbar>
    <v-container fluid>
      <v-layout column>
        <v-flex>
          <player-details
            :player_level="player_level"
            :xp_current="xp_current"
            :xp_max="xp_max"
            :xp_percent="xp_percent"
          ></player-details>
          <quests :player_level="player_level"></quests>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import PlayerDetails from './components/PlayerDetails'
import Quests from './components/Quests'

export default {
  name: 'App',
  components: {
    Toolbar,
    PlayerDetails,
    Quests
  },
  data: () => ({
    xp_current: 10,
    xp_max: 100,
    xp_percent: 12
  }),
  computed: {
    player_level: function() {
      return Math.floor(this.xp_current / this.xp_max * 10)
    }
  },
}
</script>