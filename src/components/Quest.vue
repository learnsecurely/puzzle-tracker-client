
<template>
  <v-card class="mb-3">
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
      <v-form ref="form" lazy-validation>
        <div class="text-xs-center">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="150"
          >
            <v-btn
              flat
              color="grey darken-1"
              slot="activator"
            >Submit Flag</v-btn>
            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Submit Flag</v-list-tile-title>
                    <v-list-tile-sub-title>XP: 5 | Gold: 10</v-list-tile-sub-title>
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
      <v-btn icon @click="show = !show">
      <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show" class="pt-0 pb-2">
        <vue-markdown :source="quest.description"></vue-markdown>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
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