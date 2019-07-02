// javascript for Word Guess game
//
// ---------------------------------------------------------

// Creates an array that lists out all of the options (Rock, Paper,Scissors, spocK,
    // Lizard).
var validTurnChoices = ["r", "p", "s","k","l"];

// object for session
var session =  {
  playerName: "",
  wins: 0,
  losses: 0,
  wordsWon: [],
  wordsLost: [],

  // begin the session
  beginSession: function() {
    console.log("in session.beginSession");
    this.playerName = prompt("What is your name?");
    // call wordPool.init()
  },

  // record game results
  recordGameResults: function() {
    console.log("in session.recordGameResults");
    // this is were we save the game results 
    // into wins, loses, wordsWon/Lost
  },

  // end session
  endSession: function() {
    console.log("in session.endSession");
    // this is were we display final stats and end the session
  }

};


// object for pool of word
var wordPool = {
  masterWordList: ['POLK','CARTER','REAGAN','LINCOLN'],
  availableWords: ['POLK','CARTER','REAGAN','LINCOLN'],

  // is word available 
  isWordAvailable: function() {
    console.log("in wordPool.isWordAvailable");  
    if (this.availableWords.length > 0) {
      return true;
    } 
    else {
      return false;
    }
  },

  // get a word 
  getWordFromPool: function() {
    console.log("in wordPool.getWordFromPool");  
    // this is were a word will randoml be taken from available pool
    // removed available and returned to caller 
  }
};

// object for user interface - i.e. the html page elements


var userInterface = {
// properties to be determined later - need more understanding how
// on page elements will be manipulated during game play first

  // clear word element
  clearWordElement: function() {
    console.log("in userInterface.clearWordElement");  
    // this is will clear the on page word / letter elements
    // i think this will mean hidding all the letters
    // due to time constraints i might have a fixed number of letter
    // elements or maybe i will have a "diplay word" that has dashes for
    // unreveiled letters - TBD
    },

  // clear picked letter element
  clearPickedLetters: function() {
    console.log("in userInterface.clearPickedLetters");  
    // this is were the on page element of picked letters will be reset
    // how this looks is TBD

  }



}


// -------------------------------------------------------------------
//  *** Start of game flow *** 
// -------------------------------------------------------------------
session.beginSession();

wordPool.masterWordList.forEach(element => {
  console.log(element);
});  

console.log("words remaining: " + wordPool.isWordAvailable());

// ----------------------------------------------------------
// this is a section to simply validate each method as it is coded
// if appropriate call location is not yet known
wordPool.getWordFromPool();
userInterface.clearWordElement();
userInterface.clearPickedLetters();


// ----------------------------------------------------------


session.recordGameResults();
session.endSession();

