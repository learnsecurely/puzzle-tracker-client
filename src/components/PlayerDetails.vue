<template>
  <v-layout column align-center>
    <div class="player-details condensed expanded d-flex">
      <div id="player-stats" class="sm8">
        <v-flex align-items-center d-flex>
          <v-layout column d-flex style="max-width: 105px; padding-left: 35px;">
            <v-img max-width="60px" height="50px" :src="character_class_avatar"></v-img>
          </v-layout>
          <!-- <v-icon :class="character_class" x-large>lens</v-icon> -->
          <v-layout column d-flex class="player-name">
            <v-layout row d-flex>
              <h3>{{ character_name }}</h3>
            </v-layout>
            <v-layout row d-flex>
              <span class="small-text text-capitalize">Level {{ character_level }} {{ character_class }}</span>
            </v-layout>
            <v-layout row d-flex>
              <span class="small-text">{{ character.gold }} remaining gold</span>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex class="progress-container">
          <v-icon class="icon xp" color="green darken-1">stars</v-icon>
          <v-flex class="progress">
            <v-progress-linear
              color="success"
              height="15"
              :value="xp_percent"
              class="my-0"
            ></v-progress-linear>
          </v-flex>
          <span class="small-text">{{ xp_percent }}</span>
        </v-flex>
        <v-flex class="progress-container">
          <v-icon class="icon health" size="23px" color="red darken-1">favorite</v-icon>
          <v-flex class="progress">
            <v-progress-linear
              class="my-0"
              color="error"
              height="15"
              :value="health_percent"
            ></v-progress-linear>
          </v-flex>
          <span class="small-text">{{ health_percent }}</span>
        </v-flex>
        <v-flex v-if="character_class_has_mana" class="progress-container">
          <v-icon class="icon mana" color="blue darken-1">opacity</v-icon>
          <v-flex class="progress">
            <v-progress-linear
              class="my-0"
              color="info"
              height="15"
              :value="mana_percent"
            ></v-progress-linear>
          </v-flex>
          <span class="small-text">{{ mana_percent }} / 100</span>
        </v-flex>
      </div>
    </div>
  </v-layout>
</template>

<style lang="scss" scoped>
  @import '../../assets/scss/colors.scss';

  .player-details {
    white-space: nowrap;
    transition: all 0.15s ease-out;
  }
  .player-stats {
    padding-left: 12px;
    padding-right: 24px;
    opacity: 1;
    transition: width 0.15s ease-out;
  }
  .player-details.condensed:not(.expanded) .player-stats {
    opacity: 0;
    display: none;
  }
  .small-text {
    color: $header-color;
    padding-left: 0px;
  }
  .profile-name-character {
    margin-left: 12px;
  }
  .player-name {
    //margin-bottom: 1px;
    color: $white;
  }

  .progress-container {
    margin-left: 4px;
    margin-top: 1px;
    //margin-bottom: .1em;
  }
  .progress-container > span {
    color: $header-color;
    margin-left: 2px;
    font-style: normal;
    line-height: 1;
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
  .progress-container .icon, .progress-container .progress, .progress-container .small-text {
    display: inline-block;
    vertical-align: bottom;
  }
  // Condensed version
  .player-details.condensed.expanded {
    position: relative;
    z-index: 8;
    .is-buffed {
      background-color: $purple-50;
    }
    .player-stats {
      position: absolute;
      right: 100%;
      height: calc(100% + 18px);
      margin-top: -9px;
      margin-right: 1px;
      padding-top: 9px;
      padding-bottom: 24px;
      padding-right: 16px;
      padding-bottom: 14px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      z-index: 9;
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
      color: $healer-color;
    }
    .wizard {
      color: $wizard-color;
    }
    .warrior {
      color: $warrior-color;
    }
    .icon.health {
      padding-top: 0.5px;
      padding-left: .5px;
    }
  }
</style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayerDetails',
  data() {
    return {
      show: false,
      player_classes: {
        wizard:  { health_max: 50,  mana_max: 50, has_mana: true  },
        warrior: { health_max: 100, mana_max: 0,  has_mana: false },
        healer:  { health_max: 50,  mana_max: 50, has_mana: true  }
      }
    }
  },
  props: {
    xp_max: Number,
  },
  computed: {
    character_class_avatar: function() {
      return "/public/" + this.character_class + "-0.5x.png"
    },
    character_level: function() {
      return Math.floor(this.$store.state.character_xp_current / this.xp_max * 10)
    },
    xp_percent: function() {
      if (this.player_classes[this.$store.state.character_class]) {
        return this.$store.state.character_xp_current / this.xp_max * 100
      }
    },
    health_percent: function() {
      console.log("HERE IT IS!!!!!")
      if (this.player_classes[this.$store.state.character_class]) {
        return this.$store.state.character_health_current / this.player_classes[this.$store.state.character_class].health_max * 100
      }
    },
    mana_percent: function() {
      if (this.player_classes[this.$store.state.character_class]) {
        return this.$store.state.character_mana_current / this.player_classes[this.$store.state.character_class].mana_max * 100
      }
    },
    character_class_has_mana: function() {
      if (this.$store.state.character_class) {
        return this.player_classes[this.$store.state.character_class].has_mana
      } else {
        false
      }
    },
    ...mapState([
      'character',
      'character_class',
      'character_name',
    ])
  },
  mounted() {
    this.$store.dispatch('loadCharacter')
  }
}
</script>