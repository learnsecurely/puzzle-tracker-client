import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Auth } from 'aws-amplify'

Vue.use(Vuex)
Vue.use(VueAxios, axios)


// Add latest auth access token to every http request
// axios.interceptors.request.use(function (config) {
//   console.log("!! 1")
//   return Auth.currentSession()
//     .then(session => {
//       console.log("!! 2")
//       console.log("!! 2b: " + JSON.stringify(session.accessToken,null,2))
//       console.log("!! 2c: " + JSON.stringify(config.headers,null,2))
//       // User is logged in. Set auth header on all requests
//       config.headers.common.Authorization = session.accessToken.jwtToken
//       config.headers.Authorization = `Bearer ${session.accessToken.jwtToken}`
//       return Promise.resolve(config)
//     })
//     .catch(() => {
//       console.log("!! 3")
//       // No logged-in user: don't set auth header
//       return Promise.resolve(config)
//     })
// })

export default new Vuex.Store({
  state: {
    user: null,
    character: { },
    token: '',
    characterName: '',
    characterLevel: '',
    characterPointsCurrent: 0,
    characterHints: [ ],
    currentHint: '',
    questsCompleted: [ ],
    quests: [ ],
    finishedGame: true,
    questResult : false,
    questResultMessage: '',
    questResultState: '',
  },
  actions: {
    loadToken({commit,state}) { 
      return new Promise((resolve, reject) => {
        Auth.currentSession().then(
          session => {
            commit('LOAD_TOKEN', session.idToken.jwtToken)
            resolve()
            console.log("GET AUTH USER SUCCESS: " + JSON.stringify(session, null, 2))
            console.log("TOKEN1: " + session.idToken.jwtToken)
            console.log("TOKEN2: " + state.token)
          }
        )
        .catch(error => console.log("[store.js] loadToken() | GET AUTH USER ERROR: " + error))
      })
      //   Auth.currentAuthenticatedUser().then(
      //     data => {
      //       commit('LOAD_TOKEN', data.signInUserSession.idToken.jwtToken)
      //       resolve()
      //       console.log("GET AUTH USER SUCCESS: " + JSON.stringify(data, null, 2))
      //       console.log("TOKEN1: " + data.signInUserSession.idToken.jwtToken)
      //       console.log("TOKEN2: " + state.token)
      //     }
      //   )
      //   .catch(error => console.log("[store.js] loadToken() | GET AUTH USER ERROR: " + error))
      // })
    },

    loadCharacter({commit,dispatch,state}) {
      console.log("!! 4 -> " + state.token)

      return new Promise((resolve, reject) => {
        console.log("!! 5 -> " + state.token)

        dispatch('loadToken')
        .then(() => {
          console.log("LOAD_TOKEN2 -> " + state.token)
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
            .catch(error => console.log("[store.js] loadCharacter() | GET CHARACTERS API ERROR: " + error))
        })
      })
    },

    createCharacter({commit,dispatch,state},data) {
      // console.log("createCharacter -> DATA: " + JSON.stringify(data,null,2))
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
              // console.log("createCharacter [PASS] -> " + JSON.stringify(character, null, 2))
              commit('LOAD_CHARACTER', character)
              resolve()
            })
            .catch(error => console.log("[store.js] createCharacter() | ERROR: " + error))
        })
      })
    },

    loadQuests({commit,dispatch,state}) {
      dispatch('loadCharacter')
      .then(response => {
        const options = {
          params: {
            'level': state.characterLevel
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
            // console.log("QUESTS [PASS] -> " + JSON.stringify(quests, null, 2))
            commit('LOAD_QUESTS', quests)
          })
          .catch(error => console.log("[store.js] loadQuests() | GET QUESTS API ERROR: " + error))
      })
    },

    submitFlag({commit,dispatch,state},{flag,questId}) {
      // console.log("FLAG -> " + JSON.stringify(flag))
      // console.log("QUEST ID -> " + JSON.stringify(questId))


      dispatch('loadToken')
      .then(() => {
        console.log("LOAD_TOKEN2 -> " + state.token)


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
        // console.log("DATA -> " + JSON.stringify(data))
        commit('CLEAR_QUEST_MESSAGE')

        axios
          .put(`https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters/${characterId}/flag`, data, options)
          .then(response => response.data )
          .then(character => { 
            // console.log("submitFlag [PASS] -> " + JSON.stringify(character, null, 2))
            if (character.flagStatus == "succeeded") {
              commit('SET_QUEST_MESSAGE', { message: "The flag is correct! The quest is now complete and your points have been increased.", state: "success" })
              dispatch('loadQuests')
              .catch(error => console.error("loadQuests [FAIL] -> " + error))
            } else if (character.flagStatus == "failed") {
              commit('SET_QUEST_MESSAGE', { message: character.reason, state: "error" })
              dispatch('loadCharacter')
              .catch(error => console.error("[store.js] submitFlag() | loadCharacter [FAIL] -> " + error))
            }
        })
        .catch(error => console.error("[store.js] submitFlag() | [FAIL] -> " + JSON.stringify(error, null, 2)))

      })
    },

    loadHint({commit,dispatch,state},questId) {
      // console.log("[loadHint] questId -> " + JSON.stringify(questId))
      // console.log("[loadHint] state.token -> " + JSON.stringify(state.token))
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
          // console.log("[loadHint] HTTP GET: PASS -> " + JSON.stringify(hint, null, 2))
          commit('LOAD_CURRENT_HINT', hint.hint)
        }
      ).catch(error => console.log("[store.js] loadHint() | LOAD HINT API ERROR: " + JSON.stringify(error, null, 2)))
    },

    getHint({commit,dispatch,state},{questId}) {
      // console.log("[getHint] questId -> " + JSON.stringify(questId))
      // console.log("[getHint] state.token -> " + JSON.stringify(state.token))
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
        .put(`https://8nolbrxb67.execute-api.us-west-2.amazonaws.com/prod/characters/${characterId}/getHint`, data, options)
        .then(response => response.data )
        .then(hint => { 
          // console.log("[getHint] PASS -> " + JSON.stringify(hint, null, 2))
          if (hint.getHintStatus === "succeeded") {
            //console.log("[getHint] SUCCEEDED -> " + JSON.stringify(hint.getHintStatus, null, 2))
            commit('SET_QUEST_MESSAGE', { message: "Received hint! Click the 'Show Hint' button to see it.", state: "success" })
            dispatch('loadQuests')
            .catch(error => console.error("[loadQuests] FAIL -> " + JSON.stringify(error, null, 2)))
          } else if (hint.getHintStatus === "failed") {
            //console.log("[getHint] FAILED -> " + JSON.stringify(hint.getHintStatus, null, 2))
            commit('SET_QUEST_MESSAGE', { message: "Could not retrieve hint for this quest!", state: "error" })
            //dispatch('loadCharacter')
            //.catch(error => console.error("loadCharacter [FAIL] -> " + JSON.stringify(error, null, 2)))
          }
      })
      .catch(error => console.error("[store.js] getHint() | FAIL -> " + JSON.stringify(error, null, 2)))
    },

  },
  mutations: {
    LOAD_TOKEN (state, token) {
      state.token = token
    },
    LOAD_CHARACTER (state, character) {
      state.character = character
      if (character.points < 10) {
        state.characterLevel = 0
      } else if (character.points > 9 && character.points < 65) {
        state.characterLevel = 1
      } else if (character.points > 64 && character.points < 100) {
        state.characterLevel = 2
      } else if (character.points > 99) {
        state.characterLevel = 3
        state.finishedGame = true
      } else {
        state.characterLevel = 0
      }
      state.characterName = character.name
      state.characterPointsCurrent = character.points
      state.characterHints = character.hintsShown
    },
    LOAD_QUESTS (state, quests) {
      state.quests = quests
    },
    LOAD_CURRENT_HINT(state, hint) {
      state.currentHint = hint
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