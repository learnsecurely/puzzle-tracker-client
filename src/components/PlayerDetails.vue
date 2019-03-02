<template>
  <v-layout column align-center>
    <div class="player-details condensed expanded">
      <div id="player-stats">
        <v-flex d-flex>
          <v-layout style="max-width: 105px; min-width: 80px; padding-left: 32px;">
            <v-img max-width="55px" :src="characterAvatar"></v-img>
          </v-layout>
          <v-layout class="player-name">
            <h3>{{ characterName }}</h3>
          </v-layout>
        </v-flex>
        <v-flex class="progress-container">
          <v-icon class="icon points" color="green darken-1">stars</v-icon>
          <v-flex class="progress">
            <v-progress-linear
              color="success"
              height="15"
              :value="characterPointsCurrent"
              class="my-0"
            ></v-progress-linear>
          </v-flex>
          <span style="color: rgb(76, 175, 80)" class="stats-text">{{ characterPointsCurrent }}</span>
        </v-flex>
      </div>
    </div>
  </v-layout>
</template>

<style lang="scss" scoped>
  .player-details {
    white-space: nowrap;
    transition: all 0.15s ease-out;
  }
  .stats-text {
    font-family: 'Roboto';
  }

  .player-name {
    margin-top: 7px;
    color: hsl(201,79%,46%);
  }

  .player-name h3 {
    font-family: Charm;
    font-weight: 700;
    font-size: 35px;
    letter-spacing: 1px;
  }

  .progress-container {
    margin-left: 4px;
    margin-top: 1px;
    //margin-bottom: .1em;
  }
  .progress-container > span {
    opacity: 0.7;
    font-weight: 600;
    font-size: 1.1em;
    margin-left: 2px;
    font-style: normal;
    line-height: .75;
  }
  .progress-container > .icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    //padding-top: 12px;
  }
  .progress-container > .progress {
    min-width: 200px;
    margin: 0px;
    border-radius: 2px;
    height: 24px;
    padding-bottom: 14px;
  }

  .progress-container > .progress > .progress-bar {
    border-radius: 2px;
    height: 24px;
    min-width: 0px;

  }
  .progress-container .icon, .progress-container .progress, .progress-container .small-text, .progress-container .stats-text {
    display: inline-block;
    vertical-align: bottom;
  }
  // Condensed version
  .player-details.condensed.expanded {
    position: relative;
    z-index: 8;
    .is-buffed {
      background-color: #36205D;
    }
    .progress-container > .icon {
      width: 19px;
      height: 19px;
      margin-top: -2px;
    }
    .progress-container > .progress {
      width: 152px;
      border-radius: 0px;
      height: 10px;
      margin-top: 2px;
    }
    .progress-container > .progress > .progress-bar {
      border-radius: 0px;
      height: 10px;
    }

    .healer {
      color: #cf8229;
    }
    .wizard {
      color: #1f6ea2;
    }
    .warrior {
      color: #B01515;
    }
    .warrior {
      color: #4F2A93;
    }
  }
</style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayerDetails',
  data() {
    return {
      show: false
    }
  },
  props: {
    pointsMax: Number,
  },
  computed: {
    characterAvatar: function() {
      return "/public/healer-0.5x.png"
    },
    characterLevel: function() {
      return Math.floor(this.$store.state.characterPointsCurrent / this.pointsMax * 10)
    },
    ...mapState([
      'character',
      'characterName',
      'characterPointsCurrent'
    ])
  },
  mounted() {
    this.$store.dispatch('loadCharacter')
  }
}
</script>