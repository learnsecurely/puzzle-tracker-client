<template>
  <v-card hover raised color="transparent" style="margin-bottom: 0 !important" class="mb-3">
    <v-img
      position="center top"
      :aspect-ratio="quest.aspectRatio"
      :src="quest.image"
    ></v-img>
    <v-card-title primary-title class="pt-3 pb-0">
      <div>
        <div class="questTitle">{{ quest.title }}</div>
        <div class="questSubtitle">{{ quest.subtitle }}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-form ref="form" lazy-validation>
        <div class="text-xs-center">
          <v-menu v-show="showableSubmit"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="180"
          >
            <v-btn
              flat
              slot="activator"
              class="questButton"
            >Submit Flag</v-btn>
            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Submit flag for quest: {{ quest.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-text-field
                    v-model="flag"
                    :rules="flagRules"
                    label="Flag"
                    required
                  ></v-text-field>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn flat @click="menu = false">Cancel</v-btn>
                <v-btn color="primary" @click="submitFlag">Submit Flag</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </v-form>

      <!-- <v-form v-show="gettableHint" ref="getHintForm" lazy-validation>
        <div class="text-xs-center">
          <v-menu
            v-model="getHintMenu"
            :close-on-content-click="false"
            :nudge-width="180"
          >
            <v-btn
              flat
              slot="activator"
              class="questButton"
            >Get Hint</v-btn>
           <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">Verify</div>
                  <span>Are you sure you want to get the hint for this quest? ({{ quest.title }})</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat @click="getHintMenu = false">Close</v-btn>
                <v-btn color="primary"  @click="getHint">Get Hint</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </v-form> -->
      <div class="text-xs-center">
        <v-menu v-show="showableHint"
          v-model="showHintMenu"
          :close-on-content-click="false"
          :nudge-width="580"
        >
          <v-btn
            flat
            slot="activator"
            class="questButton"
          >Show Hint</v-btn>
          <v-card>
            <v-card-title primary-title>
              <div>
                <div class="headline">Hint</div>
                <span>{{ quest.hint }}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat @click="showHintMenu = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon v-if="quest.description" class="questDescriptionButton" @click="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text style="color: hsl(214,15%,91%);" v-show="show" class="questDescription pt-0 pb-2">
        <vue-markdown :source="quest.description"></vue-markdown>



<div v-if="quest.multistep">
  <v-stepper v-model="e6"
             v-for="(step) in quest.steps" :key="step.id"
             dark vertical style="background: unset;">

    <v-stepper-step :complete="e6 > step.id" :step="step.id">
      {{ step.title }}
      <small v-if="step.subtitle">{{ step.subtitle }}</small>
    </v-stepper-step>

    <v-stepper-content :step="step.id">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = (step.id + 1)">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>

  <v-stepper v-model="e6" v-if="quest.multistep" dark vertical style="background: unset;">
    
    <v-stepper-step :complete="e6 > 1" step="1">
      Select an app
      <small>Summarize if needed</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">View setup instructions</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</div>



      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<style lang="scss" scoped>
  @import '../../assets/scss/colors.scss';
  
  .questDescription {
    font-family: Prompt;
    font-weight: 300;
  }
  .questSubtitle {
    display: block;
    padding-left: 2px;
    padding-top: 4px;
    font-family: 'Open Sans';
    font-weight: 700;
    font-size: 14px;
    color: hsl(210,16%,82%);
  }
  .questTitle {
    color: hsl(201,79%,46%);
    font-family: Prompt;
    font-size: 35px;
    font-weight: 400;
    line-height: .9;
  }
  .questButton {
    padding: 5px 8px;
    margin-left: 8px;
    height: 30px;
    font-family: 'Prompt';
    font-weight: 900;
    letter-spacing: 1.2px;
    background-color: hsl(199,20%,30%);
    color: hsl(201,79%,36%);
  }
  .questButton:hover {
    background-color: hsl(201,79%,46%);
    color: hsl(195,100%,95%);
  }
  .questDescriptionButton {
    background-color: hsl(199,20%,30%);
    color: hsl(201,79%,36%);
  }
  .questDescriptionButton:hover {
    background-color: hsl(201,79%,46%);
    color: hsl(195,100%,95%);
  }
  .layout.quest {
    padding-top: 12px;
    background-color: transparent;
  }
  .v-card.quest {
    margin-top: 7px;
    margin-bottom: 14px;
    background-color: transparent;
  }
 .v-card > .v-image {
    border-radius: 10px 10px 0 0 !important;
  }

.v-stepper--vertical {
    padding-bottom: 0px;
}

.v-stepper--vertical .v-stepper__content {
  margin-left: 12px !important;
}
.v-stepper--vertical .v-stepper__step {
  padding-left: 0px;
  padding-right: 0px;
}
  .v-menu__content {
    max-width: 30% !important;
    min-width: 250px;
  }
  @media only screen and (max-width: 720px) {
  .v-menu__content {
    max-width: 250px !important;
    min-width: 250px !important;
  }
  }
</style>

<script>
import { mapState } from 'vuex'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Quest',
  data() {
    return {
      e6: 1,
      e7: 0,
      show: true,
      menu: false,
      foo: 'bar',
      // getHintMenu: false,
      showHintMenu: false,
      flag: '',
      flagRules: [
        v => !!v || 'Flag is required',
        v => (v && v.length <= 25) || 'Flags will always be fewer than 25 characters'
      ],
    }
  },
  computed: {
    gettableHint: function() {
      // console.log("[gettableHint] computed: questId: " + this.quest.id)
      // console.log("[gettableHint] computed: showableHint -> " + this.showableHint)
      if (this.quest.hint) {
        return true
      } else {
        return false
      }
    },
    showableSubmit: function() {
      // // console.log("[showableHint] computed: questId: " + this.quest.id)
      // const hints = this.$store.state.characterHints
      // // console.log("[showableHint] computed: hints: " + JSON.stringify(hints,null,2))

      // if (hints.includes(this.quest.id)) {
      //   return true
      // } else {
      //   return false
      // }
      if (this.quest.flag) {
        return true
      } else {
        return false
      }
    },
    showableHint: function() {
      // // console.log("[showableHint] computed: questId: " + this.quest.id)
      // const hints = this.$store.state.characterHints
      // // console.log("[showableHint] computed: hints: " + JSON.stringify(hints,null,2))

      // if (hints.includes(this.quest.id)) {
      //   return true
      // } else {
      //   return false
      // }
      if (this.quest.hint) {
        return true
      } else {
        return false
      }
    },
    ...mapState([
      'currentHint'
    ]),
  },
  props: ['quest'],
  methods: {
    submitFlag() {
      // console.log("submitFlag -> this.quest.id: " + JSON.stringify(this.quest.id))
      this.$store.dispatch('submitFlag',{"flag": this.flag, "questId": this.quest.id})
    },
    getHint() {
      // console.log("getHint -> this.quest.id: " + JSON.stringify(this.quest.id))
      this.$store.dispatch('getHint',{"questId": this.quest.id})
    },
    loadHint(quest) {
      // console.log("!! loadHint -> this.quest.id: " + JSON.stringify(this.quest.id))
      this.$store.dispatch('loadHint',this.quest.id)
      this.foo = this.quest.title
    },
    clear() {
      this.$refs.form.reset()
    }
  },
  components: {
    'vue-markdown': VueMarkdown
  }
}
</script>