<template>
  <v-layout wrap class="quest">
      <v-flex xs12 sm6 offset-sm3>
        <v-card v-for="quest in eligibleQuests" :key="quest.id" class="quest">
          <v-img
            position="center top"
            :aspect-ratio="quest.aspect_ratio"
            :src="quest.image"
          ></v-img>

          <v-card-title primary-title class="pt-3 pb-0">
            <div>
            <div class="headline">{{ quest.title }}</div>
            <span class="grey--text">{{ quest.subtitle }}</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="grey darken-1">Hint</v-btn>
            <v-btn flat color="grey darken-1">Flag</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show" class="pt-0 pb-2">
            {{ quest.description }}
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
  </v-layout>
</template>

<style lang="scss" scoped>
  @import '../../assets/scss/colors.scss';
  
  .layout.quest {
    padding-top: 12px;
  }
  .v-card.quest {
    margin-top: 7px;
    margin-bottom: 14px;
  }
</style>

<script>
export default {
  name: 'Quests',
  data: () => ({
    show: false,
    quests: [
      {
        title: "Quest: Mr Morse",
        subtitle: "..- .-. .. . --. --. .-. .- .. -- -.-",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://www.merriam-webster.com/assets/mw/static/table/collegiate/morsecod.jpg",
        level: 0,
        aspect_ratio: 1.81,
        xp: 5
      },
      {
        title: "Quest: Shifty Caesar",
        subtitle: "Take a trip back in time and learn about the caesarian shift",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://s4scoding.com/images/caesar-cipher-left-shift-of-3-550x275.jpg",
        level: 0,
        aspect_ratio: 1.81,
        xp: 5
      },
      {
        title: "Keep Calm and Join Computer Club",
        subtitle: "Joining the Computer Club is not as easy as it seems",
        description: '"So, you think you\'re good enough for the Computer Club, huh?" he said in as condescending a tone as one can imagine. "You\'ll have to do more than just sign up to be accepted, ya know?" Taken back a bit by his approach, I reponded with somethign like, "Uh, ok, like what?" "How are you with codes?" ... It was just a few weeks prior that my family moved from a rural midwestern town to the big city life of San Francisco. Mom got a new exciting job with ______ that required us to relocate over the summer before my Junior year of high school. While I hated leaving my friends behind, I was a little more optimistic upon hearing that the new school had an active copmuter club. That is, until I found myself getting \'interrogated\' by one of the club leaders on my very first day. After some thought I spoke up, "Actually I\'m pretty good with codes. What\'ve ya got?" He responded by simply handing me a piece of paper before walking away. I unfolded the paper to reveal a code/cipher: DVOXLNVGLXLNKFGVIXOFYMLLY!',
        image: "http://www.suttoncumlound.net/wp-content/uploads/2016/09/computer_club.png",
        level: 1,
        aspect_ratio: 1.58,
        xp: 10
      }
    ]
  }),
  computed: {
    eligibleQuests: function() {
      const player_level = this.player_level
      return this.quests.filter(function(q) {
        if (q.level == player_level) { return true }
      })
    }
  },
  props: {
    player_level: String
  }
}
</script>