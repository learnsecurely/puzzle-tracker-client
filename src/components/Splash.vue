<template>
  <body>
    <v-flex style="padding-top: 25px; padding-bottom: 20px;" d-flex justify-center>
      <v-img src="/public/PuzzleTrackerLogo-v1.png" style="max-width: 600px;"></v-img>
    </v-flex>
      <v-layout d-flex justify-center row>
        <v-flex xs12 sm6>
          <v-card>
    <div d-flex justify-center style="text-align: center; margin: auto; padding: 20px 50px; 20px; 50px;">
      <h1>Congratulations on finding the BSides 2019 Crypt-O-Pzzlr!</h1>
    </div>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout style="padding: 25px 0 25px 0;" d-flex justify-center row>
        <v-flex xs12 sm6>
          <v-card>
    <div d-flex justify-center style="text-align: center; margin: auto; padding: 20px 50px; 20px; 50px;">
      <h2>Before we get started, create an account or sign in below.</h2>
    </div>
          </v-card>
        </v-flex>
      </v-layout>

    <div class="callToAction">
        <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
    </div>
  </body>
</template>

<style scoped>
/*------------global------------*/
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
}
html {
  font-family: Circular Std, sans-serif;
}
body {
  width: 100%
}
h1 {
  font-size: 48px;
  font-weight: 100;
  color: #2B9DFF;
}
h2 {
  font-size: 26px;
  font-weight: 100;
  color: #2B9DFF;
}
h3 {
  font-size: 24px;
}
p {
  font-size: 16px;
}
.v-card {
  background-image: url(/public/TexturedBackground-Transparent85-1x.png);
  background-size: 800px;
  background-repeat: repeat;
  background-color: #001C36;
  border-radius: 10px;
  background-position: 0 -600px;
}

.flex.sm6 {
  max-width: 90%;
}
.btnOutline {
  display: block;
  text-decoration: none;
  color: #2B9DFF;
  border: 2px solid #2b9dff;
  border-radius: 6px;
  width: 175px;
  height: 53px;
  line-height: 53px;
  text-align: center;
  margin-top: 30px;
}
.btnFilled {
  display: block;
  text-decoration: none;
  color: white;
  background-color: #2B9DFF;
  border-radius: 6px;
  width: 175px;
  height: 53px;
  line-height: 53px;
  text-align: center;
  margin-top: 30px;
}


/*------------nav------------*/
nav {
  line-height: 150px;
  text-align: right;
}
nav a {
  text-decoration: none;
  color: #202427;
  font-size: 20px;
  font-weight: 700;
}
nav a:first-child {
  float: left;
}
nav a img {
  vertical-align: middle;
}
nav a span {
  background-color: #2B9DFF;
  padding: 5px 15px;
  border-radius: 1000px;
  font-weight: 100px;
  color: white;
  margin-left: 7px;
}


/*------------header------------*/
header {
  /* height: 1000px;
  min-height: 1000px; */
  padding: 0 5%;
  /* background-image: url(/public/background_header.png); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: botttom right;
}
header h1 {
  width: 40%;
  margin: 0 0 0 0;
}


/*------------team------------*/
.team {
  text-align: center;
  margin: 10em 0 3em 0;
  padding: 0 5%;
  /* background-image: url(/public/background_team.png); */
  background-repeat: no-repeat;
  background-position: center;

}
.team h1 {
  width: 50%;
  margin: 0 auto 30px auto;
}
.characterClasses {
  display: flex;
  justify-content: center;
}
.characterClass {
  margin: 0 30px;
  color: #202427;
}
.characterClass h3 {
  margin-bottom: 5px;
    color: #2B9DFF;
}


/*------------about------------*/
.about {
  padding: 0 5%;
  /* background-image: url(/public/background_about.png); */
  background-repeat: no-repeat;
  background-position: -75px center;
  /* background-size: 80%; */
  /* height: 900px;
  min-height: 900px; */
}
.about h1 {
  margin-bottom: 30px;
  padding-top: 300px;
}
.icons img {
  margin-right: 30px;
}
.about h1, .icons {
  margin-left: 50%;
}


/*------------call-to-action------------*/
.callToAction {
  text-align: center;
  padding: 0 5% 20px 5%;
  background-image: url(/public/background_calltoaction.png);
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: center;
}
.callToAction h1, .callToAction a {
  display: inline-block;
  margin: 0 60px;
  vertical-align: middle;
}


/*------------footer------------*/
footer {
  padding: 0 5%;
  margin-bottom: 40px;
  color: #2B9DFF;
}
footer p, .footerPages {
  display: inline-block;
}
.footerPages {
  float: right;
}
.footerPages a {
  text-decoration: none;
  font-weight: 100;
  color: #2B9DFF;
  margin-left: 30px;
}


/*------------responsive------------*/
@media only screen and (max-width: 1000px) {
  header {
    /* height: 1600px;
    min-height: 1600px; */
    /* background-image: url(/public/mobile_background_header.png); */
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom right;
  }
  header h1 {
    width: 100%;
  }
  .team {
    margin: 3em 0 3em 0;
    /* background-image: url(/public/mobile_background_team.png); */
    background-position: top;
  }
  .team h1 {
    width: 100%;
  }
  .about {
    /* background-image: url(/public/mobile_background_about.png); */
    background-size: contain;
    height: 900px;
    min-height: 900px;
    overflow-y: visible;
  }
  .about h1 {
    padding-top: 900px;
  }
  .about h1, .icons {
    margin-left: 0;
  }
  .callToAction {
    margin-top: 0;
    padding: 0 5% 20px 5%;
    background-size: 70%;
  }
  .callToAction h1, .callToAction a {
    margin-bottom: 30px;
  }
  footer {
    text-align: center;
  }
  .footerPages {
    visibility: hidden;
  }
  footer p, .footerPages {
    display: block;
  }
}

@media only screen and (max-width: 600px) {
  header {
    height: 1300px;
    min-height: 1300px;
  }
h1 {
  font-size: 30px !important;
  font-weight: 100 !important;
}
  header h1 {
    margin: 1em 0 0 0;

  }
  .about h1 {
    padding-top: 800px;
  }
  .characterClasses {
    flex-direction: column;
  }
  .characterClass {
    margin-top: 30px;
  }
}

.authenticator > div {
    padding: 0;
    min-width: 100%;
    box-shadown: none;
    -webkit-box-shadow: none;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Splash',
  data() {
    return {
      class: "authenticator",
      authConfig: { 
        signUpConfig: {
          hideDefaults: true,
          signUpFields: [
            {
              label: 'Userame',
              key: 'username',
              required: true,
              displayOrder: 1,
              type: 'string'
            },
            {
              label: 'Email',
              key: 'email',
              required: true,
              displayOrder: 2,
              type: 'string'
            },
            {
              label: 'Password',
              key: 'password',
              required: true,
              displayOrder: 3,
              type: 'password'
            }
          ]
        }
      }
    }
  }
}
</script>