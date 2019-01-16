<template>
  <v-layout wrap class="quest mt-1">
    <v-snackbar
      :value="questResult"
      :multi-line=true
      :timeout="snackbarTimeout"
      :color="questResultState"
      :top=true
    >
      {{ questResultMessage }}
    </v-snackbar>
    <v-flex class="quest-flex" xs12 sm6 offset-sm3>
      <quest v-for="quest in quests" :key="quest.id" :quest="quest" />
    </v-flex>
  </v-layout>
</template>

<style scoped>  
  .layout.quest {
    padding-top: 12px;

  }
  .v-card.quest {
    margin-top: 7px;
    margin-bottom: 14px;
  }
  .quest-flex {

  }
  .quest-flex>.v-card {
    background-image: url(/public/TexturedBackground-Transparent85-1x.png);
    background-size: 700px;
    border-radius: 10px;
    margin-top: 20px;
    background-position-y: 200px;
  }
  @media screen and (max-width: 950px) {
    .quest-flex>.v-card {
      background-position-y: 100px;
    }
  }
</style>

<script>
import { mapState } from 'vuex'
import Quest from './Quest'

export default {
  name: 'Quests',
  data() {
    return {
      show: false,
      menu: false,
      flag: '',
      flagRules: [
        v => !!v || 'Flag is required',
        v => (v && v.length <= 25) || 'Flags will always be fewer than 25 characters'
      ],
      quest: { id: 0 },
      completedQuestAlert: true,
      snackbar: true,
      snackbarTimeout: 5000,
    }
  },
  computed: {
    quests: function() {
      if (this.$store.state.quests) {
        var quests = this.$store.state.quests
        var completedQuestIds = this.$store.state.character.questsCompleted

        //console.log("QUESTS -> " + JSON.stringify(quests))
        //console.log("COMPLETED QUESTS -> " + JSON.stringify(completedQuestIds))

        var eligibleQuests = quests.filter(function(quest) {
          return !completedQuestIds.some(function(completedQuestId) {
              return quest.id == completedQuestId;
          });
        });
        //console.log("ELIGIBLE QUESTS -> " + JSON.stringify(eligibleQuests))
        return eligibleQuests
      } else {
        return [ ]
      }
    },
    ...mapState([
      'questResult',
      'questResultMessage',
      'questResultState'
    ])
  },
  props: {
    player_level: Number
  },
  created() {
    this.$store.dispatch('loadQuests')
  },
  methods: {
    submitFlag() {
      this.$store.dispatch('submitFlag')
    },
    clear() {
      this.$refs.form.reset()
    }
  },
  components: {
    Quest
  }
}
</script>