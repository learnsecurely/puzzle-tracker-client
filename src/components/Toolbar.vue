<template>
  <v-toolbar flat color="transparent" class="toolbar-style">
    <transition name="fadeLogo" mode="out-in">
      <v-img @click="enableToolbar()" v-if="!showToolbar" src="/public/PuzzleTrackerLogo-v1.png" style="max-width: 600px; padding:0;margin:0;"></v-img>
      <v-toolbar-items v-if="showToolbar">
        <v-menu :nudge-width="100">
          <v-toolbar-title slot="activator">
            <v-btn 
              v-if="signedIn"
              icon
              left
              class="pr-2"
              @click="activePopup = true"

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
    </transition>
  </v-toolbar>
</template>

<style scoped>
  .gold-text {
    color: hsl(44,92%,63%);
    background-color: hsl(210,24%,16%);
    padding-left: 4px;
    padding-right: 4px;
    min-width: 20px;
    font-family: 'Open Sans';
    font-weight: 700;
    font-size: 13px;
    border-radius: 8px;
  }
  .toolbar-style {
    /* background: url('/public/TexturedBackground-1x.png') 0 0 repeat;
    background-repeat: repeat;
    background-position-y: 200px; */
    justify-content: center;
    margin: auto !important;
  }

  .v-toolbar__content>.v-image {
    margin: auto !important;
  }
  .v-toolbar__content>.v-toolbar__items {
    margin: auto !important;
  }
  .v-toolbar__title {
    width: 75px;
  }
  .v-toolbar__content .v-btn--icon, .v-toolbar__extension .v-btn--icon {
    margin: 20px;
  }
  .fadeLogo-enter-active, .fadeLogo-leave-active {
    transition: opacity 0.5s;
  }
  .fadeLogo-enter, .fadeLogo-leave-to {
    opacity: 0;
  }

  .fadeTitle-enter-active, .fadeTitle-leave-active {
    transition: opacity 0.5s;
  }
  .fadeTitle-enter, .fadeTitle-leave-to  {
    opacity: 0;
  }

  span.v-badge>.v-icon, .v-btn__content>.v-icon {
    font-size: 50px !important;
  }

  @media screen and (max-width: 992px) {
    body {
      background-color: blue;
    }
  }

  /* On screens that are 600px or less, set the background color to olive */
  @media screen and (max-width: 600px) {
    .v-toolbar__content>.v-image {
      margin: auto !important;
    }
    .v-toolbar__content>.v-toolbar__items {
      margin: auto 30px auto auto !important;
    }
    .v-toolbar__title {
      width: 100%;
    }
    .v-toolbar__content .v-btn--icon, .v-toolbar__extension .v-btn--icon {
      margin: 20px;
    }

    span.v-badge>.v-icon, .v-btn__content>.v-icon {
      font-size: 40px !important;
    }
  }
</style>

<script>
import { AmplifyEventBus, components } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import { mapState } from 'vuex'

export default {
  name: 'Toolbar',
  data: () => ({
    showToolbar: false,
    activePopup: false,
    drawer: {
      // sets the open status of the drawer
      open: false,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: false,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: false,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: false,
      // sets the drawer to the mini variant, showing only icons, of itself (true) 
      // or showing the full drawer (false)
      mini: false
    },
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
  methods: {
    enableToolbar() {
      this.showToolbar = true
      setTimeout(()=>{
        if (!this.activePopup) { this.disableToolbar() }
      },3500);
    },
    disableToolbar() {
      this.showToolbar = false
    }
  },
  mounted() {
    this.$store.dispatch('loadCharacter')
  }
}
</script>