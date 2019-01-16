<template>
<div class="home">
  <toolbar/>
    <v-container fluid>
      <v-layout column>
        <v-flex>
          <player-details
            :player_level="player_level"
            :xp_current="xp_current"
            :health_current="health_current"
            :xp_max="xp_max"
            :xp_percent="xp_percent"
            :characters="characters"
          ></player-details>
          <quests :player_level="player_level"></quests>
        </v-flex>
      </v-layout>
    </v-container>
</div>
</template>

<style scoped>
.home {}
</style>

<script>
import PlayerDetails from './PlayerDetails'
import Quests from './Quests'
import Toolbar from './Toolbar'
import { components } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import axios from "axios"

const getCreds = async () => {
  return await Auth.currentSession()
    .then(data => {
      return data.idToken.jwtToken;
    })
    .catch(err => console.log(err));
};

export default {
  name: 'Home',
  components: {
    PlayerDetails,
    Quests,
    Toolbar,
    components
  },
  data() {
    return {
      mini: false,
      drawer: false,
      xp_current: 10,
      xp_max: 100,
      xp_percent: 12,
      characters: [{class: 'EMPTY', stats: {xp: 0}}],
    }
  },
  computed: {
    player_level: function() {
      return Math.floor(this.xp_current / this.xp_max * 10)
    },
    player_class: function () {
      var self = this;
      return self.characters[0].class
    },
    health_current: function () {
      var self = this;
      return self.characters[0].stats.health
    }
  },
  created() {
    var self = this;
    Auth.currentAuthenticatedUser().then(
      data => {
        const options = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': data.signInUserSession.idToken.jwtToken,
          }
        }
      
        axios
          .get('https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters', options)
          .then(response => {
            self.characters = response.data
            //console.log("RESPONSE_DATA [PASS] -> " + JSON.stringify(response.data, null, 2))
          })
          .catch(error => {
            console.log("RESPONSE_DATA [FAIL] -> " + JSON.stringify(error.response, null, 2))
          })
      }
    )
    .catch(error => console.log("ERROR: " + JSON.stringify(error, null, 2)));
  }
}
</script>