<template>
  <v-container id="avatar-modal">
    <div class="section row welcome-section">
      <v-flex class="col-6 offest-3 text-center"></v-flex>
      <h3 v-once>Welcome To Puzzle Tracker</h3>
      <!-- <v-img>Puzzle Tracker</v-img> -->
    </div>
    <div class="section d-flex justify-content-center">
      <div class="justin-section d-flex align-items-center">
        <div class="justin-message">
          <div class="corner-decoration" style="top:    -2px; right: -2px"></div>
          <div class="corner-decoration" style="top:    -2px; left:  -2px"></div>
          <div class="corner-decoration" style="bottom: -2px; right: -2px"></div>
          <div class="corner-decoration" style="bottom: -2px; left:  -2px"></div>
          <div>
            <p v-once><vue-markdown :source="introMessage"></vue-markdown></p>
          </div>
        </div>
        <div class="npc-justin-textbox"></div>
      </div>
    </div>
    <v-flex class="mr-5 ml-5">
      <!-- <username-form></username-form> -->
    </v-flex>
    <v-form ref="form" lazy-validation>
      <div class="section row select-character">
        <v-flex class="col-6 offest-3 text-center"></v-flex>
        <h3 v-once>Step 1: Select a Character Class</h3>
      </div>
      <v-layout column>
        <v-flex>
          <div class="text-xs-center">
            <v-card>
              <v-list class="py-0">
                <v-tabs
                  height="100%"
                  fixed-tabs
                  centered
                  icons-and-text
                  v-model="characterClassSelect"
                  color="transparent"
                  slider-color="transparent">
                  <v-tab @click="setCharacterClassWizard" :class="characterClassSelect === 0 ? 'black' : ''">
                    wizard
                    <v-img width="100%" max-width="100px" height="100%" :src="`/public/wizard-0.5x.png`"></v-img>
                  </v-tab>
                  <v-tab @click="setCharacterClassHealer" :class="characterClassSelect === 1 ? 'black' : ''">
                    healer
                    <v-img width="100%" max-width="100px" height="100%" :src="`/public/healer-0.5x.png`"></v-img>
                  </v-tab>
                  <v-tab @click="setCharacterClassWarrior" :class="characterClassSelect === 2 ? 'black' : ''">
                    warrior
                    <v-img width="100%" max-width="100px" height="100%" :src="`/public/warrior-0.5x.png`"></v-img>
                  </v-tab>
                </v-tabs>
              </v-list>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
      <div class="section row select-character">
        <v-flex class="col-6 offest-3 text-center"></v-flex>
        <h3 v-once>Step 2: Enter a Character Name</h3>
      </div>
      <v-layout column>
        <v-flex>
          <div class="text-xs-center">
            <v-card>
              <v-list>
                <v-list-tile>
                  <v-text-field
                    v-model="characterName"
                    label="Name"
                    required
                  ></v-text-field>
                </v-list-tile>
              </v-list>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
      <div class="section row select-character">
        <v-flex class="col-6 offest-3 text-center"></v-flex>
        <h3 v-once>Step 3: Training Quests</h3>
      </div>
      <v-layout column>
        <v-flex>
          <div>
            <v-card flat>
              <v-card-text>
                <div class="section d-flex justify-content-center">
                  <div class="justin-section d-flex align-items-center">
                    <div class="justin-message">
                      <div class="corner-decoration" style="top:    -2px; right: -2px"></div>
                      <div class="corner-decoration" style="top:    -2px; left:  -2px"></div>
                      <div class="corner-decoration" style="bottom: -2px; right: -2px"></div>
                      <div class="corner-decoration" style="bottom: -2px; left:  -2px"></div>
                      <div>
                        <p style="margin-bottom: 0;" v-once><vue-markdown :source="trainingQuestsMessage"></vue-markdown></p>
                      </div>
                    </div>
                  </div>
                </div>
                <v-container fluid>
                  <v-layout row wrap class="justify-left">
                    <v-flex xs12 sm4 md4 px-3 style="flex-basis: unset;">
                      <v-switch
                        v-model="morse"
                        label="Morse Code"
                        color="green darken-3"
                        hide-details
                      ></v-switch>
                      <v-switch
                        v-model="caesar"
                        label="Caesar Shift"
                        color="green darken-3"
                        hide-details
                      ></v-switch>
                      <v-switch
                        v-model="atbash"
                        label="Atbash"
                        color="green darken-3"
                        hide-details
                      ></v-switch>
                    </v-flex>
                    <v-flex xs12 sm4 md4 px-3 style="flex-basis: unset;">
                      <v-switch
                        v-model="playfair"
                        label="Playfair"
                        color="green darken-3"
                        hide-details
                      ></v-switch>
                      <v-switch
                        v-model="vigenere"
                        label="Vigenére"
                        color="green darken-3"
                        hide-details
                      ></v-switch>
                      <v-switch
                        v-model="h3x"
                        label="Hexadecimal"
                        color="green darken-3"
                        hide-details
                      ></v-switch>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </div>
        </v-flex>
      </v-layout> 
      <div class="section row select-character">
        <v-flex class="col-6 offest-3 text-center"></v-flex>
        <h3 v-once>Step 4: Click Create Character to Begin</h3>
      </div>
      <v-layout column>
        <v-flex>
          <div class="text-xs-center">
            <v-card>
              <v-card-actions>
                <v-btn color="primary" flat @click="createCharacter">Create Character</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout> 
    </v-form>
  </v-container>
</template>

<script>
import { components } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import axios from "axios"
import uuid from "uuid";
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Setup',
  data() {
    return {
      morse: true,
      caesar: true,
      playfair: true,
      atbash: true,
      vigenere: true,
      h3x: true,
      characterName: '',
      characterClass: '',
      characterClasses: [ 'healer','wizard','warrior' ],
      text: 'center',
      icon: 'justify',
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2],
      wizard_image: '/public/wizard-0.5x.png',
      characterClassSelect: -1,
      welcomeTo: "Lorem ipsum dolor",
      introMessage: "Welcome to the B-Sides SF Puzzle Tracker, an rpg-themed crypto-puzzle game for B-Sides SF 2019.\n\nPuzzles will be presented to you as **Quests**, each with a challenge, a description, a(n) flag/answer, and a reward of gold and XP (experience points). Every 10 XP results in a new level and new quest(s). Reach 100 XP to win the game.\n\nGold can be used to purchase health & mana potions. Health potions replenish health lost from either incorrect answers/flags or from unfortunate outcomes in the quest line. Before we begin, select from a few different character classes, and give your character a name.",
      trainingQuestsMessage: "Before the main quest lines begin, there are a number of training quests that will teach you the skills necessary to complete the game. However, if you already know some or all of these techniques, you can opt out of them below by toggling them to the off (grey) position.",
    }
  },
  components: {
    'vue-markdown': VueMarkdown
  },
  methods: {
    createCharacter() {
      console.log("createCharacter -> this.characterName: " + JSON.stringify(this.characterName))
      console.log("createCharacter -> this.characterClass: " + JSON.stringify(this.characterClass))
      console.log("NO CHARACTER. CREATING CHARACTER")
      var questsCompleted = [ ]
      var initialXp = 0
      if (!this.morse)    { questsCompleted.push(1); initialXp += 2; console.log("MORSE") }
      if (!this.caesar)   { questsCompleted.push(2); initialXp += 2; console.log("CAESAR") }
      if (!this.atbash)   { questsCompleted.push(3); initialXp += 2; console.log("ATBASH") }
      if (!this.playfair) { questsCompleted.push(4); initialXp += 2; console.log("PLAYFAIR") }
      if (!this.vigenere) { questsCompleted.push(5); initialXp += 2; console.log("VIGENERE") }
      const data = {
        userId: this.$store.state.user.attributes.sub,
        characterId: uuid.v1(),
        name: this.characterName,
        class: this.$store.state.character_class,
        questsCompleted: questsCompleted,
        initialXp: initialXp,
      }
      return this.$store.dispatch('createCharacter',data).then(() => {
        console.log("CHARACTER CREATED NAMED -> " + this.$store.state.character.name)
        this.$router.push('/')
      })
    },
    clear() {
      this.$refs.form.reset()
    },
    setCharacterClassHealer() {
      return this.$store.dispatch('setCharacterClass','healer').then(() => {
        console.log("setCharacterClassHealer -> " + this.$store.state.character_class)
      })
    },
    setCharacterClassWarrior() {
      return this.$store.dispatch('setCharacterClass','warrior').then(() => {
        console.log("setCharacterClassWarrior -> " + this.$store.state.character_class)
      })
    },
    setCharacterClassWizard() {
      return this.$store.dispatch('setCharacterClass','wizard').then(() => {
        console.log("setCharacterClassWizard -> " + this.$store.state.character_class)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/colors.scss';
  #creator-background {
    background-color: $purple-200;
  }
  #avatar-modal {
    width: 95%;
    max-width: 600px;
    // height: 670px;
    border-radius: 8px;
    background-color: #6e6e6e;
    color: black;
    box-shadow: 0 2px 16px 0 rgba(26, 24, 29, 0.32);
    margin: 0 auto;
    margin-top: .7em;
    padding-top: 1em;
    position: relative;
  }
  .container {
    flex: unset;
  }
  .layout.column {
    margin-top: .6em;
  }
  .corner-decoration {
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #bdbdbd;
    border: inherit;
    outline: inherit;
  }
  .small {
    color: black;
  }
  h3 {
    font-size: 20px;
    font-weight: 300;
    color: black;
  }
  .purchase-all {
    margin-bottom: 1em;
  }
  // .section {
  //   margin-top: 2em;
  // }
  .edit-modal {
    margin-top: 10em;
  }
  .row.sub-menu + .row.sub-menu {
    margin-top: 0.5em;
  }
  .welcome-section {
    // margin-top: .5em;
    margin-bottom: .7em;
  }
  .select-character {
    // margin-top: .5em;
    margin-top: .7em;
  }
  .select-character > h3 {
    margin-bottom: 0;
  }
  .logo {
    width: 190px;
    margin: 0 auto 1.25em;
  }
  // .user-creation-bg {
  //   background-image: url('~client/assets/creator/creator-hills-bg.png');
  //   height: 105px;
  //   width: 219px;
  //   margin: 0 auto;
  // }
  .avatar {
    position: absolute;
    top: -22px;
    left: 4em;
  }
  .edit-avatar {
    left: 9.2em;
  }
  .justin-section {
    position: relative;
  }
  .justin-message {
    background-color: white;
    color: black;
    font-weight: 300;
    border-color: #6e6e6e;
    border-style: solid;
    border-width: 2px;
    outline-color: #313131;
    outline-style: solid;
    outline-width: 2px;
    position: relative;
    padding: 1.2em 1.5em 0em 1.5em;
    margin: 2px;
    width: 90%;
    max-width: 580px;
    p {
      margin: auto;
    }
    p + p {
      margin-top: 1em;
    }
  }
  .npc-justin-textbox {
    position: absolute;
    right: 1rem;
    top: -3.4rem;
    width: 48px;
    height: 48px;
    // background-image: url('~public/justin_textbox.png');
  }
  .circles {
    padding-left: 2em;
  }
  .circle {
    width: 8px;
    height: 8px;
    background-color: #d8d8d8;
    border-radius: 50%;
    display: inline-block;
    margin-right: 1em;
  }
  .circle.active {
    background-color: #bda8ff;
  }
  .customize-menu {
    .menu-item .svg-icon {
      width: 32px;
      height: 32px;
      margin: 0 auto;
    }
    .menu-container {
      color: #a5a1ac;
    }
    .menu-container:hover, .menu-container.active {
      cursor: pointer;
      color: #6133B4;
    }
  }
  .sub-menu:hover {
    cursor: pointer;
  }
  .sub-menu-item {
    text-align: center;
    border-bottom: 2px solid #f9f9f9;
  }
  .sub-menu .sub-menu-item:hover, .sub-menu .sub-menu-item.active {
    color: $purple-200;
    border-bottom: 2px solid $purple-200;
  }
  .customize-section {
    text-align: center;
    padding-bottom: 2em;
  }
  .option.hide {
    display: none !important;
  }
  .customize-options .option {
    display: inline-block;
    vertical-align: bottom;
    padding: .5em;
    height: 90px;
    width: 90px;
    margin: 1em .5em .5em 0;
    border: 4px solid $gray-700;
    border-radius: 4px;
    &.locked {
      border: none;
      border-radius: 2px;
      background-color: #ffffff;
      box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16), 0 1px 4px 0 rgba(26, 24, 29, 0.12);
      margin-top: 0;
    }
    .sprite.customize-option {
      margin: 0 auto;
    }
  }
  .text-center {
    .gem-lock, .gold-lock {
      display: inline-block;
      margin-right: 1em;
      margin-bottom: 1.6em;
      vertical-align: bottom;
    }
  }
  .gem-lock, .gold-lock {
    .svg-icon {
      width: 16px;
    }
    span {
      font-weight: bold;
      margin-left: .5em;
    }
    .svg-icon, span {
      display: inline-block;
      vertical-align: bottom;
    }
  }
  .gem-lock span {
    color: $green-10
  }
  .gold-lock span {
    color: $yellow-10
  }
  .option.active {
    border-color: $purple-200;
  }
  .option:hover {
    cursor: pointer;
  }
  .customize-section {
    background-color: #f9f9f9;
    padding-top: 1em;
    min-height: 280px;
  }
  .interests-section {
    margin-top: 3em;
    .task-option {
      margin: 0 auto;
      width: 70%;
    }
  }
  #backgrounds {
    .title-row {
      margin-bottom: 1em;
    }
    .backgroundFilterToggle {
      margin-left: auto;
      margin-right: auto;
    }
    .set-title {
      margin-top: 1em;
      margin-bottom: 1em;
    }
    .background {
      margin: 0 auto;
      box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16), 0 1px 4px 0 rgba(26, 24, 29, 0.12);
      border-radius: 2px;
    }
    strong {
      margin: 0 auto;
    }
    .incentive-background {
      background-image: none;
      width: 68px;
      height: 68px;
      border-radius: 8px;
      background-color: #92b6bd;
      margin: 0 auto;
      padding-top: .3em;
      .small-rectangle {
        width: 60px;
        height: 40px;
        border-radius: 4px;
        margin: 0 auto;
        opacity: .6;
        background: white;
      }
    }
    .background_violet {
      background-color: #a993ed;
    }
    .background_blue {
      background-color: #92b6bd;
    }
    .background_green {
      background-color: #92bd94;
    }
    .background_purple {
      background-color: #9397bd;
    }
    .background_red {
      background-color: #b77e80;
    }
    .background_yellow {
      background-color: #bcbb91;
    }
    .incentive-background:hover {
      cursor: pointer;
    }
    .background:hover {
      cursor: pointer;
    }
    .purchase-background {
      margin: 0 auto;
      background: #fff;
      padding: 0.5em;
      border-radius: 0 0 2px 2px;
      box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16), 0 1px 4px 0 rgba(26, 24, 29, 0.12);
      cursor: pointer;
      span {
        font-weight: bold;
        font-size: 12px;
      }
      span.price {
        color: #24cc8f;
      }
      .gem, .coin {
        width: 16px;
      }
      &.single {
        width: 141px;
      }
      &.set {
        width: 100%;
        span {
          font-size: 14px;
        }
        .gem, .coin {
          width: 20px;
        }
      }
    }
    .gem, .coin {
      margin: 0 .5em;
      display: inline-block;
      vertical-align: bottom;
    }
    .background-set {
        width: 100%;
        margin: 10px;
        background-color: #edecee;
        border-radius: 2px;
    }
  }
  .badge-svg {
    left: calc((100% - 18px) / 2);
    cursor: pointer;
    color: $gray-400;
    background: $white;
    padding: 4.5px 6px;
    &.item-selected-badge {
      background: $purple-300;
      color: $white;
    }
  }
  .icon-12 {
    width: 12px;
    height: 12px;
  }
  span.badge.badge-pill.badge-item.badge-svg:not(.item-selected-badge) {
    color: #a5a1ac;
  }
  span.badge.badge-pill.badge-item.badge-svg.hide {
    display: none;
  }
  .background-button {
      margin-bottom: 15px;
  }
  .background-button:hover {
    span.badge.badge-pill.badge-item.badge-svg.hide {
      display: block;
    }
  }
</style>
