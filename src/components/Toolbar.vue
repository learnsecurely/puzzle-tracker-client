<template>
  <v-toolbar color="hsl(209,20%,25%)">
    <v-toolbar-side-icon large style="color:hsl(211,13%,65%)">
    </v-toolbar-side-icon>
    <v-toolbar-title style="margin-left: 0px; color: hsl(210,16%,82%); font-size: 30px; font-family: Charm; font-weight: 500;">Puzzle Tracker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-if="characterExists"
        icon
        left
        class="pr-2"
        @click="messagesDialog = true"
      >
        <v-badge overlap v-model="show" color="hsl(185,62%,45%)">
          <span
            v-if="character_newMessages"
            slot="badge">{{ character_newMessages }}
          </span>
          <v-icon large color="hsl(211,13%,65%)">mail</v-icon>
        </v-badge>
      </v-btn>
      <v-dialog v-model="messagesDialog" max-width="500px">
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 style="max-width: 100%; margin-left: 0%; flex-basis: 100%;">
            <v-card>
              <v-toolbar color="hsl(210,22%,49%)">
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title>Inbox</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>search</v-icon>
                </v-btn>
              </v-toolbar>
              <v-list two-line>
                <v-subheader>Messages</v-subheader>
                <template v-for="(message, index) in character_messages">
                  <v-divider
                    v-if="message.divider"
                    :inset=true
                    :key="index"
                  ></v-divider>
                  <v-list-tile
                    :key="message.avatar"
                    avatar
                    @click=""
                  >
                    <v-list-tile-avatar>
                      <img :src="message_avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="message.from"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="message.message"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <v-btn 
            v-if="signedIn"
            icon
            left
            class="pr-2"
          >
            <v-icon large color="hsl(211,13%,65%)">
              account_box
            </v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-list>
          <v-list-tile>
            <amplify-sign-out></amplify-sign-out>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { AmplifyEventBus, components } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import { mapState } from 'vuex'

export default {
  name: 'Toolbar',
  data: () => ({
    show: true,
    messagesDialog: false,
    signedIn: false,
    message_avatar: '/public/healer-0.5x.png'
  }),
  async beforeCreate() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.signedIn = true
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    });
  },
  computed: {
    ...mapState([
      'character_messages',
      'character_newMessages',
    ]),
    characterExists: function() {
      return this.$store.state.character_name ? true : false
    },
  },
  mounted() {
    this.$store.dispatch('loadCharacter')
  }
}
</script>