<template>
<div class="home">
  <congrats></congrats>
  <toolbar/>
    <v-container fluid>
      <v-layout column>
        <v-flex>
          <player-details
          ></player-details>
          <quests></quests>
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
import Congrats from './Congrats'
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
    Congrats,
    components
  },
  data() {
    return {
      mini: false,
      drawer: false,
      finishedGame: true,
    }
  },
  methods: {
    showCongrats() { this.$modal.show('finishedGame') }
  },
  created() {
    var self = this;
    this.showCongrats();
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