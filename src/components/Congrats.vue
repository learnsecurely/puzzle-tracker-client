<template>
      <!-- button(class="modal-close" @click="$modal.hide('finish-course')" @before-close="beforeClose") &times; -->

  <div v-if="finishedGame" class="text-xs-center">
    <modal
      name="finishedGame"
      width="500"
      @before-open='beforeOpen'
      @before-close='beforeClose'
    >
      <v-btn
        slot="activator"
        color="red lighten-2"
        dark
      >
        Click Me
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Congrats',

  data () {
    return {
      // finishGame: false,
      base: process.env.url
    }
  },

  computed: {
    congratsTitle () {
      console.log("congratsTitle")
      return `Congratulations! You just won the B-Sides 2019 Crypt-O-Pzzlr game :)`
    },
    ...mapState([
      'finishedGame'
    ]),
  },

  methods: {
    beforeOpen (event) {
      console.log("BEFORE OPEN")
      this.$confetti.start({shape: 'rect'})
    },
    beforeClose (event) {
      console.log("BEFORE CLOSE")
      this.$confetti.stop()
    },
    redirectToLeaderboard: function () {
      this.$confetti.stop()
      this.$router.push('/leaderboard')
    }
  }
}
</script>

<style scoped>
.lead {
  font-size: 1.4em;
}
.body {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 16px 4% 0;
}
.media {
  position: relative;
  overflow: hidden;
  width: 110px;
  height: 125px;
  margin: 0 auto;
}
.social-wrapper {
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  margin: 0.5em 0;
}
.social-wrapper > span {
    margin-right: 2%;
}
.social-wrapper > span:last-of-type{
  margin-right: 0;
}
img {
  position: absolute;
  top: 0;
}
.modal-close {
  position: absolute;
  top: 0;
  right: 10px;
  background: none;
  border: 0;
  color: pink;
  font-size: 2em;
}
.badge-enter-active {
  transition: transform 0.7s ease-in-out;
}
.badge-enter, .badge-leave-to{
  transform: translateY(-100%);
}
</style>