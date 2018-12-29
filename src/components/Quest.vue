
<template>
  <v-card hover raised color="hsl(209,20%,25%)" class="mb-3">
    <v-img
      position="center top"
      :aspect-ratio="quest.aspect_ratio"
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
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="180"
          >
            <v-btn
              flat
              slot="activator"
              class="submitFlagButton"
            >Submit Flag</v-btn>
            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Submit Flag</v-list-tile-title>
                    <v-list-tile-sub-title>Earns {{ quest.xp }} XP & 5G</v-list-tile-sub-title>
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
                <v-btn color="primary" flat @click="submitFlag">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </v-form>
      <v-spacer></v-spacer>
      <v-btn icon class="questDescriptionButton" @click="show = !show">
      <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text style="color: hsl(214,15%,91%);" v-show="show" class="questDescription pt-0 pb-2">
        <vue-markdown :source="quest.description"></vue-markdown>
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
  .submitFlagButton {
    padding: 5px 8px;
    margin-left: 8px;
    height: 30px;
    font-family: 'Prompt';
    font-weight: 900;
    letter-spacing: 1.2px;
    background-color: hsl(199,20%,30%);
    color: hsl(201,79%,36%);
  }
  .submitFlagButton:hover {
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
  }
  .v-card.quest {
    margin-top: 7px;
    margin-bottom: 14px;
  }
</style>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Quest',
  data() {
    return {
      show: false,
      menu: false,
      flag: '',
      flagRules: [
        v => !!v || 'Flag is required',
        v => (v && v.length <= 25) || 'Flags will always be fewer than 25 characters'
      ],
    }
  },
  props: ['quest'],
  methods: {
    submitFlag() {
      console.log("submitFlag -> this.quest.id: " + JSON.stringify(this.quest.id))
      this.$store.dispatch('submitFlag',{"flag": this.flag, "questId": this.quest.id})
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