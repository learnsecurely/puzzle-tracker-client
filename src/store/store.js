import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Auth } from 'aws-amplify'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    user: null,
    character: { },
    token: '',
    character_class: '',
    character_name: '',
    character_level: '',
    character_xp_current: 0,
    character_health_current: null,
    character_mana_current: null,
    character_newMessages: 0,
    character_messages: [ ],
    characterItemsOwned: [ ],
    character_hints: [ ],
    currentHint: '',
    questsCompleted: [ ],
    quests: [ ],

    questResult : false,
    questResultMessage: '',
    questResultState: '',
  },
  actions: {
    loadToken({commit,state}) { 
      return new Promise((resolve, reject) => {
        Auth.currentAuthenticatedUser().then(
          data => {
            commit('LOAD_TOKEN', data.signInUserSession.idToken.jwtToken)
            resolve()
            //console.log("GET AUTH USER SUCCESS: " + JSON.stringify(data, null, 2))
            //console.log("TOKEN1: " + data.signInUserSession.idToken.jwtToken)
            //console.log("TOKEN2: " + state.token)
          }
        )
        .catch(error => console.log("GET AUTH USER ERROR: " + JSON.stringify(error, null, 2)))
      })
    },

    loadCharacter({commit,dispatch,state}) {
      return new Promise((resolve, reject) => {
        dispatch('loadToken')
        .then(() => {
          //console.log("LOAD_TOKEN2 -> " + state.token)
          const options = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Request-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Authorization': state.token,
            }
          }

          axios
            .get('https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters', options)
            .then(response => response.data)
            .then(characters => { 
              console.log("CHARACTERS [PASS] -> " + JSON.stringify(characters, null, 2))
              if (characters[0]) {
                console.log("FOUND CHARACTER -> " + JSON.stringify(characters, null, 2))
                commit('LOAD_CHARACTER', characters[0])
              } else {
                console.log("DID NOT FIND CHARACTER-> " + JSON.stringify(characters, null, 2))
              }
              resolve()
            })
            .catch(error => console.log("GET CHARACTERS API ERROR: " + JSON.stringify(error, null, 2)))
        })
      })
    },

    createCharacter({commit,dispatch,state},data) {
      console.log("createCharacter -> DATA: " + JSON.stringify(data,null,2))
      return new Promise((resolve, reject) => {
        dispatch('loadToken')
        .then(() => {
          //console.log("LOAD_TOKEN2 -> " + state.token)
          const options = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Request-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Authorization': state.token,
            }
          }

          axios
            .post('https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters', data, options)
            .then(response => response.data)
            .then(character => { 
              console.log("createCharacter [PASS] -> " + JSON.stringify(character, null, 2))
              commit('LOAD_CHARACTER', character)
              resolve()
            })
            .catch(error => console.log("createCharacter ERROR: " + JSON.stringify(error, null, 2)))
        })
      })
    },

    loadQuests({commit,dispatch,state}) {
      dispatch('loadCharacter')
      .then(response => {
        const options = {
          params: {
            'level': state.character_level
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': state.token,
          }
        }

        axios
          .get('https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/quests', options)
          .then(response => response.data)
          .then(quests => { 
            //console.log("QUESTS [PASS] -> " + JSON.stringify(quests, null, 2))
            commit('LOAD_QUESTS', quests)
          })
          .catch(error => console.log("GET QUESTS API ERROR: " + JSON.stringify(error, null, 2)))
      })
    },

    submitFlag({commit,dispatch,state},{flag,questId}) {
      console.log("FLAG -> " + JSON.stringify(flag))
      console.log("QUEST ID -> " + JSON.stringify(questId))
      const characterId = state.character.characterId
      const options = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Authorization': state.token,
        },
      }

      const data = {
        "questId": questId,
        "flag": flag,
        "characterId": characterId
      }
      console.log("DATA -> " + JSON.stringify(data))
      commit('CLEAR_QUEST_MESSAGE')

      axios
        .put(`https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters/${characterId}/flag`, data, options)
        .then(response => response.data )
        .then(character => { 
          console.log("submitFlag [PASS] -> " + JSON.stringify(character, null, 2))
          if (character.flagStatus == "succeeded") {
            commit('SET_QUEST_MESSAGE', { message: "The flag is correct! The quest is now complete and your XP has been increased.", state: "success" })
            dispatch('loadQuests')
            .catch(error => console.error("loadQuests [FAIL] -> " + error))
          } else if (character.flagStatus == "failed") {
            commit('SET_QUEST_MESSAGE', { message: "Incorrect flag provided. Please try again.", state: "error" })
            dispatch('loadCharacter')
            .catch(error => console.error("loadCharacter [FAIL] -> " + error))
          }
      })
      .catch(error => console.error("submitFlag [FAIL] -> " + JSON.stringify(error, null, 2)))
    },
    setCharacterClass({commit,dispatch,state},characterClass) {
      console.log("characterClass -> " + JSON.stringify(characterClass,null,2))
      commit('SET_CHARACTER_CLASS', characterClass)
    },
    loadHint({commit,dispatch,state},questId) {
      console.log("[loadHint] questId -> " + JSON.stringify(questId))
      console.log("[loadHint] state.token -> " + JSON.stringify(state.token))
      const characterId = state.character.characterId
      const options = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Authorization': state.token,
        },
      }

      const data = {
        "questId": questId,
        "characterId": characterId
      }

      axios
        .put('https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters/${characterId}/loadHint', data, options)
        .then(response => response.data)
        .then(hint => { 
          console.log("[loadHint] HTTP GET: PASS -> " + JSON.stringify(hint, null, 2))
          commit('LOAD_CURRENT_HINT', hint.hint)
        }
      ).catch(error => console.log("LOAD HINT API ERROR: " + JSON.stringify(error, null, 2)))
    },
    buyHint({commit,dispatch,state},{questId}) {
      console.log("[buyHint] questId -> " + JSON.stringify(questId))
      console.log("[buyHint] state.token -> " + JSON.stringify(state.token))
      const characterId = state.character.characterId
      const options = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Authorization': state.token,
        },
      }

      const data = {
        "questId": questId,
        "characterId": characterId
      }

      axios
        .put(`https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters/${characterId}/buyHint`, data, options)
        .then(response => response.data )
        .then(hint => { 
          console.log("[buyHint] PASS -> " + JSON.stringify(hint, null, 2))
          if (hint.buyHintStatus === "succeeded") {
            //console.log("[buyHint] SUCCEEDED -> " + JSON.stringify(hint.buyHintStatus, null, 2))
            commit('SET_QUEST_MESSAGE', { message: "Hint has been purchased!", state: "success" })
            dispatch('loadQuests')
            .catch(error => console.error("[loadQuests] FAIL -> " + JSON.stringify(error, null, 2)))
          } else if (hint.buyHintStatus === "failed") {
            //console.log("[buyHint] FAILED -> " + JSON.stringify(hint.buyHintStatus, null, 2))
            commit('SET_QUEST_MESSAGE', { message: "Could not purchase hint for this quest!", state: "error" })
            //dispatch('loadCharacter')
            //.catch(error => console.error("loadCharacter [FAIL] -> " + JSON.stringify(error, null, 2)))
          }
      })
      .catch(error => console.error("[buyHint] FAIL -> " + JSON.stringify(error, null, 2)))
    },
    buyItem({commit,dispatch,state},{itemId}) {
      // [ ] Add item to items.owned
      // [ ] reduce gold
      console.log("[buyItem] itemId -> " + JSON.stringify(itemId))
      console.log("[buyItem] state.token -> " + JSON.stringify(state.token))
      const characterId = state.character.characterId
      const options = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Authorization': state.token,
        },
      }

      const data = {
        "itemId": itemId,
        "characterId": characterId
      }

      axios
        .put(`https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters/${characterId}/buyItem`, data, options)
        .then(response => response.data )
        .then(item => { 
          console.log("[buyItem] PASS -> " + JSON.stringify(item, null, 2))
          if (item.buyItemStatus === "succeeded") {
            //console.log("[buyItem] SUCCEEDED -> " + JSON.stringify(item.buyItemStatus, null, 2))
            commit('SET_QUEST_MESSAGE', { message: "Item has been purchased!", state: "success" })
            dispatch('loadCharacter')
            .catch(error => console.error("loadCharacter [FAIL] -> " + JSON.stringify(error, null, 2)))
          } else if (item.buyItemStatus === "failed") {
            //console.log("[buyItem] FAILED -> " + JSON.stringify(item.buyItemStatus, null, 2))
            commit('SET_QUEST_MESSAGE', { message: "Could not purchase item!", state: "error" })
          }
      })
      .catch(error => console.error("[buyItem] FAIL -> " + JSON.stringify(error, null, 2)))
    },
    consumeItem({commit,dispatch,state},{itemId}) {
      console.log("[consumeItem] itemId -> " + JSON.stringify(itemId))
      console.log("[consumeItem] state.token -> " + JSON.stringify(state.token))
      const characterId = state.character.characterId
      const options = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Authorization': state.token,
        },
      }

      const data = {
        "itemId": itemId,
        "characterId": characterId
      }

      axios
        .put(`https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters/${characterId}/consumeItem`, data, options)
        .then(response => response.data )
        .then(item => { 
          console.log("[consumeItem] PASS -> " + JSON.stringify(item, null, 2))
          if (item.consumeItemStatus === "succeeded") {
            //console.log("[consumeItem] SUCCEEDED -> " + JSON.stringify(item.consumeItemStatus, null, 2))
            commit('SET_QUEST_MESSAGE', { message: "Item has been consumed!", state: "success" })
            dispatch('loadCharacter')
            .catch(error => console.error("loadCharacter [FAIL] -> " + JSON.stringify(error, null, 2)))
          } else if (item.consumeItemStatus === "failed") {
            //console.log("[consumeItem] FAILED -> " + JSON.stringify(item.consumeItemStatus, null, 2))
            commit('SET_QUEST_MESSAGE', { message: "Could not consume item!", state: "error" })
          }
      })
      .catch(error => console.error("[consumeItem] FAIL -> " + JSON.stringify(error, null, 2)))
    }
  },
  mutations: {
    LOAD_TOKEN (state, token) {
      state.token = token
    },
    LOAD_CHARACTER (state, character) {
      state.character = character
      state.character_class = character.class
      state.character_level = Math.floor(character.stats.xp / 10)
      state.character_name = character.name
      state.character_xp_current = character.stats.xp
      state.character_mana_current = character.stats.mana
      state.character_health_current = character.stats.health
      state.character_messages = character.inbox.messages
      state.characterItemsOwned = character.items.owned
      state.character_newMessages = character.inbox.newMessages
      state.character_hints = character.hintsPurchased
    },
    LOAD_QUESTS (state, quests) {
      state.quests = quests
    },
    LOAD_CURRENT_HINT(state, hint) {
      state.currentHint = hint
    },
    SET_CHARACTER_CLASS (state, characterClass) {
      state.character_class = characterClass
      state.character.class = characterClass
    },
    CLEAR_QUEST_MESSAGE (state) {
      state.questResultMessage = null
      state.questResultState = null
      state.questResult = false
    },
    SET_QUEST_MESSAGE (state, questResult) {
      state.questResultMessage = questResult.message
      state.questResultState = questResult.state
      state.questResult = true
    },
    setUser(state, user) {
      state.user = user
    },
  }
})