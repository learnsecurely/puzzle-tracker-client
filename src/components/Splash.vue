<template>
<body>
    <header>
        <nav>
            <a>Puzzle Tracker <span>CRYPTO</span></a>
            <a href="#"><img src="/public/nav_icon.png" alt="nav icon"></a>
        </nav>
        <h1>Level up your character as you solve various cryptography puzzles.</h1>
        <a href="#/auth" class="btnOutline">Sign Up</a>
    </header>
    <div class="team">
        <h1>Select from multiple characters.</h1>
        <div class="characterClasses">
            <div class="characterClass">
                <img src="/public/wizard.png" alt="character icon">
                <h3>Wizard</h3>
            </div>
            <div class="characterClass">
                <img src="/public/healer.png" alt="character icon">
                <h3>Healer</h3>
            </div>
            <div class="characterClass">
                <img src="/public/warrior.png" alt="character icon">
                <h3>Warrior</h3>
            </div>
        </div>
    </div>
    <div class="about">
        <h1>Optional training quests expose you to cryptography concepts and ciphers like Atbash, Caesar, Playfair, and more.</h1>
        <div class="icons">
            <img src="/public/xd_icon.png" alt="Adobe XD Icon">
            <img src="/public/sketch_icon.png" alt="SketchApp Icon">
        </div>
    </div>
    <div class="callToAction">
        <h1>Sign Up Now</h1>
        <a href="#/auth" class="btnFilled">Get Started</a>
    </div>
    <footer>
        <p>(C) 2018 Learn Securely</p>
        <div class="footerPages">
            <a href="#">Link1</a>
            <a href="#">Link2</a>
            <a href="#">Link3</a>
            <a href="#">Link4</a>
        </div>
    </footer>
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
h3 {
  font-size: 24px;
}
p {
  font-size: 16px;
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
  height: 1000px;
  min-height: 1000px;
  padding: 0 5%;
  background-image: url(/public/background_header.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: botttom right;
}
header h1 {
  width: 40%;
  margin: 2em 0 0 0;
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
  background-image: url(/public/background_about.png);
  background-repeat: no-repeat;
  background-position: -75px center;
  /* background-size: 80%; */
  height: 900px;
  min-height: 900px;
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
  padding: 20em 5% 20em 5%;
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
    height: 1600px;
    min-height: 1600px;
    background-image: url(/public/mobile_background_header.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom right;
  }
  header h1 {
    width: 100%;
  }
  .team {
    margin: 3em 0 3em 0;
    background-image: url(/public/mobile_background_team.png);
    background-position: top;
  }
  .team h1 {
    width: 100%;
  }
  .about {
    background-image: url(/public/mobile_background_about.png);
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
    margin-top: 25em;
  padding: 15em 5% 15em 5%;
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
</style>
