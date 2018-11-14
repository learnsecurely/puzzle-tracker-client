<template>
  <v-app dark>
    <v-toolbar dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Puzzle Tracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat class="hidden-sm-and-down">Quests</v-btn>
        <v-btn icon left class="pr-2">
          <v-badge
          overlap
            v-model="show"
            color="purple"
          >
            <span slot="badge">6</span>
            <v-icon large color="grey">mail</v-icon>
          </v-badge>
        </v-btn>
        <v-btn icon left class="pr-2">
          <v-icon
            large
            color="grey darken-1"
          >
            account_box
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid>
      <v-layout column>
        <v-flex>
          <v-layout column align-center>
            <div class="player-details condensed expanded d-flex">
              <div class="sm4 hidden-xs-only">
                <img src="/public/monster.png" height="135px"/>
              </div>
              <div id="player-stats" class="sm8">
                <v-flex align-items-center d-flex>
                  <v-icon color="white" x-large>lens</v-icon>
                  <v-layout column d-flex class="player-name">
                    <h3>Han Solo</h3>
                    <span class="small-text player-level">Level 3 Mage</span>
                  </v-layout>
                </v-flex>
                <v-flex class="progress-container">
                  <v-icon class="icon" color="green darken-1">stars</v-icon>
                  <v-flex class="progress">
                    <v-progress-linear
                      color="success"
                      height="15"
                      value="74"
                      class="my-0"
                    ></v-progress-linear>
                  </v-flex>
                  <span class="small-text">37/50</span>
                </v-flex>
                <v-flex class="progress-container">
                  <v-icon class="icon" color="red darken-1">favorite</v-icon>
                  <v-flex class="progress">
                    <v-progress-linear
                      class="my-0"
                      color="error"
                      height="15"
                      value="46"
                    ></v-progress-linear>
                  </v-flex>
                  <span class="small-text">23/50</span>
                </v-flex>
                <v-flex class="progress-container">
                  <v-icon class="icon" color="blue darken-1">opacity</v-icon>
                  <v-flex class="progress">
                    <v-progress-linear
                      class="my-0"
                      color="info"
                      height="15"
                      value="20"
                    ></v-progress-linear>
                  </v-flex>
                  <span class="small-text">10/50</span>
                </v-flex>
              </div>
            </div>
          </v-layout>
          <v-layout wrap class="quest">
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="quest">
                <v-img
                  position="center top"
                  aspect-ratio="1.81"
                  src="https://www.merriam-webster.com/assets/mw/static/table/collegiate/morsecod.jpg"
                >
                </v-img>

                <v-card-title primary-title class="pt-3 pb-0" >
                  <div>
                    <div class="headline">Quest: Mr Morse</div>
                    <span class="grey--text">..- .-. .. . --. --. .-. .- .. -- -.-</span>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </v-card-text>
                </v-slide-y-transition>
              </v-card>
              <v-card class="quest">
                <v-img
                  position="center top"
                  src="https://s4scoding.com/images/caesar-cipher-left-shift-of-3-550x275.jpg"
                  aspect-ratio="1.81"
                >
                </v-img>

                <v-card-title class="pt-3 pb-0" primary-title>
                  <div>
                    <div class="headline">Quest: Shifty Caesar</div>
                    <span class="grey--text">Take a trip back in time and learn about the caesarian shift</span>
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
                  <v-card-text v-show="show"  class="pt-0 pb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </v-card-text>
                </v-slide-y-transition>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped>
  @import '../assets/scss/colors.scss';
  .layout.quest {
    padding-top: 12px;
  }
  .v-card.quest {
    margin-top: 7px;
    margin-bottom: 14px;
  }
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
  .player-level {
    font-style: normal;
    //margin-bottom: .5em;
  }

  .progress-container {
    margin-left: 4px;
    margin-top: 2px;
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
  }
</style>

<script>
export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    show: false
  })
}
</script>