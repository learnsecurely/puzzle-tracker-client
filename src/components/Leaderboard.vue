<template>
<div class="leader">
  <v-container fluid>
    <v-layout column>
      <v-flex d-flex justify-center>
          <v-img src="/public/PuzzleTrackerLogo-v1.png" style="max-width: 600px;"></v-img>
      </v-flex>
      <v-layout d-flex justify-center row>
        <v-flex xs12 sm6>
          <v-card>
            <v-list>
              <template v-for="(character, index) in characters">
                <v-divider v-if="index != 0" :inset="true" :key="index"></v-divider>
                <v-list-tile :key="index" @click="">

                  <v-list-tile-content>
                    <v-list-tile-title><a class="rank">{{ index + 1 }} </a><a class="characterName">{{ character.name }} ({{ character.hints }}:{{ character.deaths }})</a></v-list-tile-title>
                    
                    <v-list-tile-sub-title>
                        <section class="characterPoints">
                          <div class="health">
                            <span class="progress-bar" :style="characterPointsStyle(character.points)">
                              <span class="shade warm"></span>
                            </span>    
                          </div>
                        </section>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-avatar>
                    <v-btn flat>
                      <v-flex><a class=characterPoints>{{ character.points }}</a> <a class="characterPts">pts</a></v-flex>
                    </v-btn>
                  </v-list-tile-avatar>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</div>
</template>

<style scoped lang="scss">
.leader {
  width: 100%;
}

  .flex.sm6 {
    min-width: 500px;
    max-width: 500px;
  }

.theme--light.v-card {
  background-color: #31465f;
}

.theme--light.v-btn {
  color: #fff;
}



@import url(https://fonts.googleapis.com/css?family=Duru+Sans|Architects+Daughter);

section.characterPoints {
  margin-right: -120px !important;
}

$bar-height: 5px;
$bg: #393943;
$bg-darker: darken($bg, 8%);

$font-med: lighten($bg, 15%);
$font-light: lighten($bg, 30%);
$font-lighter: lighten($bg, 40%);

$button-size: $bar-height - 8;
$button-offset: #{4}px;
  
* {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  background-color: $bg;
  font-family: "Duru Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
  line-height: 1.6;
  color: $font-light;
}

.content {
  overflow: hidden;
  display: block;
  width: 900px;
  margin: 0 auto;
  padding-bottom: 100px;
}

section {
  width: 400px;
  display: block;
  margin: 0 auto;
  padding: 5px 0;
  float: left;
  margin-right: 100px;
  &:last-child {
    margin-right: 0;
  }
}

/*
 * GRADIENT BAR LINE STYLING
 */
.health, .progress {
  height: $bar-height + 1;
  width: 100%;
  margin-bottom: 10px;
  padding-top: 1px;
  border-radius: $bar-height / 2;
  background-color: $bg-darker;
  border-bottom: 1px solid #1f1f21;
  box-shadow: inset 0 2px 5px rgba(0,0,0,.3), 0 1px 0 rgba(255,255,255,.1);
  position: relative;
  .progress-bar {
      display: block;
      overflow: hidden;
      position: relative;
      height: 100%;
      margin-left: 1px;
      border-radius: $bar-height / 2;
      min-width: 13px;
      &:after {
        content: "";
        display: block;
        position: absolute;
        background-color: rgba(0,0,0,.2);
        width: $button-size;
        height: $button-size;
        top: $button-offset;
        right: 4px;
        border-radius: $button-size / 2;
        box-shadow: inset 0 2px 2px rgba(0,0,0,.3), 0 1px 1px rgba(255,255,255,.5);
      }
   }
}

.health .shade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

// Bar color schemes
$rose: #e83d89;
$peach: #ffa894;

$teal: #67cecd;
$lime: #eaef91;

a.rank {
  color: #e83d89;
  font-size: 19pt;
  font-weight: 300;
  vertical-align: middle;
}
a.characterName {
  color: white;
  vertical-align: middle;
}

a.characterPoints {
  color: $peach;
  font-size: 19pt;
  font-weight: 300;
  vertical-align: middle;

}

a.characterPts {
  font-size: 10pt;
  color: $peach;
  vertical-align: middle;
}

.warm {
    background: $rose;
    background: -moz-linear-gradient(left,  $rose 30%, $peach 100%);
    background: -webkit-gradient(linear, left top, right top, color-stop(30%,$rose), color-stop(100%,$peach));
    background: -webkit-linear-gradient(left,  $rose 30%,$peach 100%);
    background: -o-linear-gradient(left,  $rose 30%,$peach 100%);
    background: -ms-linear-gradient(left,  $rose 30%,$peach 100%);
    background: linear-gradient(to right,  $rose 30%,$peach 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#67cecd', endColorstr='#eaef91',GradientType=1 );

    box-shadow: inset 0 1px 0 rgba(255,255,255,.3)
                ,inset 0 -3px 4px rgba(darken($rose, 10%),.4);
}

.cool {
    background: $teal;
    background: -moz-linear-gradient(left,  $teal 30%, $lime 100%);
    background: -webkit-gradient(linear, left top, right top, color-stop(30%,$teal), color-stop(100%,$lime));
    background: -webkit-linear-gradient(left,  $teal 30%,$lime 100%);
    background: -o-linear-gradient(left,  $teal 30%,$peach 100%);
    background: -ms-linear-gradient(left,  $teal 30%,$lime 100%);
    background: linear-gradient(to right,  $teal 30%,$lime 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#67cecd', endColorstr='#eaef91',GradientType=1 );

    box-shadow: inset 0 1px 0 rgba(255,255,255,.5)
                , inset 0 -3px 4px rgba(lighten($teal, 10%), .4);
}

/*
 * END GRADIENT BAR STYLING
 */

// Everything below here is just for the presentation format
p {
  font-size: .8rem;
}

h2 {
  font-family: "Architects Daughter";
  font-size: 1.5rem;
  color: $font-lighter;
  display: block;
  text-align: center;
}

b {
  font-weight: 400;
  font-family: "Architects Daughter";
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  margin-bottom: 10px;
  padding: 0 10px 6px 10px;
  font-size: .8rem;
  line-height: .8;
  
  position: relative;
  &:before, &:after {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: $font-med;
    top: 0;
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}

.content > p {
  text-align: center;
}

.v-card {
  background-image: url(/public/TexturedBackground-Transparent85-1x.png);
  /* background-size: 700px; */
  border-radius: 10px;
  margin-top: 20px;
  // background-position-y: 145px;
}

.v-list {
  padding-bottom: 2px;
}

.theme--light.v-list {
  background: unset;
}

.v-list__tile__title {
  color: white;
}

.v-divider {
  margin-bottom: 7px;
}

@media screen and (max-width: 992px) {
  section.characterPoints {
    margin-right: -100px !important;
  }
}

/* On screens that are 600px or less, set the background color to olive */
@media screen and (max-width: 600px) {
  section.characterPoints {
    margin-right: -100px !important;
  }
  .flex.sm6 {
    min-width: 380px;
    max-width: 380px;
  }

  .health, .progress {
    width: 70%;
  }

}
</style>

<script>
import { components } from 'aws-amplify-vue'
import axios from "axios"

export default {
  name: 'Leader',
  components: {
    components
  },
  data() {
    return {
      show: true,
      characters: [
        { class: 'healer', name: 'forc3', points: "100", hints: "2", deaths: "1" },
        { class: 'warrior', name: 'stark', points: "50", hints: "0", deaths: "0" },
        { class: 'wizard', name: 'dubm1ed0r3', points: "10", hints: "1", deaths: "1" },
        { class: 'warrior', name: 'brianne', points: "75", hints: "0", deaths: "1" },
      ]
    }
  },
  methods: {
  	characterPointsStyle: function(points) {    
    	return {
	      width: points + '%',
    	};
    }
  }
}
</script>