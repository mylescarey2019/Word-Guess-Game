// ---------------------------------------------------------
// javascript Presidential Word Guess game
// ---------------------------------------------------------

var messageElement = document.getElementById("message");
var playerLetterElement = document.getElementById("player-letter");
var lettersUsedElement = document.getElementById("letters-used");
var wordDisplayElement = document.getElementById("word-display");
var guessCountElement = document.getElementById("guess-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");
// ----------------------------------------------------------
// object for session
// ----------------------------------------------------------
var session =  {
  playerName: "",
  wins: 0,
  losses: 0,
  wordsWon: [],
  wordsLost: [],

  // begin the session
  beginSession: function() {
    console.log("in session.beginSession");
    // this.playerName = prompt("What is your name?");
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
  },

  // update session information following a game end
  updateSession: function() {
    console.log("in session.updateSession"); 
  }

};

// ----------------------------------------------------------
// object for pool of words
// ----------------------------------------------------------
var wordPool = {
  masterWordList: ["WASHINGTON","JOHN ADAMS","JEFFERSON","MADISON","MONROE","JOHN Q ADAMS","JACKSON","VAN BUREN","WILLIAM HARRISON",
  "TYLER","POLK","TAYLOR","FILLMORE","PIERCE","BUCHANAN","LINCOLN","ANDREW JOHNSON","GRANT","HAYES","GARFIELD", 
  "ARTHUR","CLEVELAND","BENJAMIN HARRISON","MCKINLEY","ROOSEVELT","TAFT","WILSON","HARDING","COOLIDGE","HOOVER",
  "ROOSEVELT","TRUMAN","EISENHOWER","KENNEDY","LYNDON JOHNSON","NIXON","FORD","CARTER","REAGAN","GEORGE BUSH",
  "CLINTON","GEORGE W BUSH","OBAMA","TRUMP"],
  availableWords: [],

  // initialize the available word list from master list
  initWordPool: function() {
    console.log("in wordPool.initWordPool");  
    // clear available word list then reload from master list
    this.availableWords.splice(0,this.availableWords.length);
    this.masterWordList.forEach(element => {
      this.availableWords.push(element);
    });
  },

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
    // randomly pick new word from available word list then remove it from the list and 
    // return it to the caller
    var nextWordToPlay = this.availableWords[Math.floor(Math.random() * this.availableWords.length)];
    this.availableWords.splice(this.availableWords.indexOf(nextWordToPlay),1);
    return nextWordToPlay;
  }
};

// ----------------------------------------------------------
// object for user interface - i.e. the html page elements
// ----------------------------------------------------------
var userInterface = {

  // initialize the display
  initDisplay: function() {
    console.log("in userInterface.initDisplay");
    userInterface.displayMessageElement("Hello, let's play");
    userInterface.displayWordElement();
    userInterface.displayUsedLettersElement();
    userInterface.displayGuessRemainingElement();
    userInterface.displayWinCountElement();
    userInterface.displayLossCountElement();
  },  

  // display message element
  displayMessageElement: function(message) {
    console.log("in userInterface.displayMessageElement"); 
    messageElement.textContent = message; 
  },

  // display word element
  displayWordElement: function() {
    console.log("in userInterface.displayWordElement"); 
    wordDisplayElement.textContent = "Word: " + game.getDisplayableGameWord(); 
  },

  // display used letters element
  displayUsedLettersElement: function() {
    console.log("in userInterface.displayUsedLettersElement"); 
    lettersUsedElement.textContent = "Letters used: " + game.getDisplayableUsedLetterList();
  },

  // display guess remaining element
  displayGuessRemainingElement: function() {
    console.log("in userInterface.displayGuessRemainingElement"); 
    guessCountElement.textContent = "Guesses Remaining: " + game.guessesRemaining;
  },

  // display guess remaining element
  displayWinCountElement: function() {
    console.log("in userInterface.displayWinCountElement"); 
    winCountElement.textContent = "Wins: " + session.wins;
  },

  // display guess remaining element
  displayLossCountElement: function() {
    console.log("in userInterface.displayLossCountElement"); 
    lossCountElement.textContent = "Loses: " + session.losses;
  },

  // update the word, used letters and guess count on display
  updateGameDisplay: function() {
    console.log("in userInterface.updateGameDisplay"); 
    userInterface.displayWordElement();
    userInterface.displayUsedLettersElement();
    userInterface.displayGuessRemainingElement();
  }
};


// ----------------------------------------------------------
// object for game
// ----------------------------------------------------------
// this will have much of the core logic 
// have to see how it fills out - some methods in userInterface
// might be better placed here - such as managing the word state
// and managing the used letter list
// perhaps that happens here and userInterface simply has to act
// on whole word strings that it is passed for the word and for
// the used leter list - maybe
var game = {
  // properties to be determined later - need more understanding how
  // on page elements will be manipulated during game play first
  guessesRemaining: 6,
  gameWordString: "",
  gameWordArray: [],
  gameWordLetterStatusArray: [],
  gameDisplayWord: "",
  usedLetters: [],

  // set up the game word and its support arrays for play
  initGameWord: function() {
    console.log("game.initGameWord");
    // this.gameWordString = wordPool.getWordFromPool();
    this.gameWordString = "GEORGE W BUSH";
    this.gameWordArray = this.gameWordString.split('');
    console.log("this is the game word: " + this.gameWordString);
    this.gameWordArray.forEach(element => {
      console.log("game word array elements: " + element);
    });
    this.gameWordArray.forEach(element => {
      if (element === " ") {
        this.gameWordLetterStatusArray.push(" ");
      }
      else {
        this.gameWordLetterStatusArray.push("-");
      }
    });
    this.gameWordLetterStatusArray.forEach(element => {
      console.log("game word status array elements: " + element);
    });  
  },
  
  // get formatted game word for use on page display
  getDisplayableGameWord: function() {
    console.log("in game.getDisplaybleGameWord"); 
    return this.gameWordLetterStatusArray.join('');
  },

  // clear picked letter array
  clearUsedLetters: function() {
    console.log("in game.clearUsedLetters");  
    this.usedLetters.splice(0,this.usedLetters.length);
  },
   

  // add a letter to the picked letter list
  addLetterToUsedList: function(letter) {
    console.log("in game.addLetterToUsedList"); 
    this.usedLetters.push(letter); 
    // this is where list of letters already used will be added to 
    // caller sends one letter to add to list
  },  

  // get formatted game word for use on page display
  getDisplayableUsedLetterList: function() {
    console.log("in game.getDisplableUsedLetterList"); 
    var displayableUsedLetters = this.usedLetters.sort();
    return displayableUsedLetters.join('');
  },

  // check the picked letter for validity and hit/miss against the word
  checkPickedLetter: function(letter) {
    console.log("in game.checkPickedLetter"); 
  },

  // check the picked letter for validity and hit/miss against the word
  checkPickedLetter: function(letter) {
    console.log("in game.checkPickedLetter"); 
  },

  // apply results of finding letter in the word
  processLetterHit: function(letter) {
    console.log("in game.processLetterHit"); 
  },

  // apply results of not finding letter in the word
  processLetterMiss: function(letter) {
    console.log("in game.processLetterMiss"); 
  },  

  // determine if game is won, lost or continuing
  checkGameState: function() {
    console.log("in game.checkGameState"); 
  }


};
  


// -------------------------------------------------------------------
//  *** Start of game flow *** 
// -------------------------------------------------------------------
session.beginSession();
wordPool.initWordPool();
game.initGameWord();
userInterface.initDisplay();
console.log("this is the current displayable game word: " + game.getDisplayableGameWord());


// ----------------------------------------------------------
// this is a section to simply validate each method as it is coded
// if appropriate call location is not yet known
wordPool.masterWordList.forEach(element => {
  console.log("master list: " + element);
});  

wordPool.availableWords.forEach(element => {
  console.log("available list: " + element);
}); 
console.log("words remaining: " + wordPool.isWordAvailable());
for (i=0;i<wordPool.masterWordList.length;i++) {
  console.log("this is the word from word pool: " + wordPool.getWordFromPool());
};
console.log("words remaining: " + wordPool.isWordAvailable());
wordPool.availableWords.forEach(element => {
  console.log("available list: " + element);
}); 

userInterface.displayWordElement();
// show used letter list
game.usedLetters.forEach(element => {
  console.log(element)
});
console.log("displayble used letter list: " + game.getDisplayableUsedLetterList());
// add some letters to used letter list
game.addLetterToUsedList('G');
game.addLetterToUsedList('O');
game.addLetterToUsedList('S');
// show used letter list
game.usedLetters.forEach(element => {
  console.log(element)
});
console.log("displayble used letter list: " + game.getDisplayableUsedLetterList());
// check letter picked
game.checkPickedLetter('G');
game.checkPickedLetter('=');
game.checkPickedLetter('Y');
game.checkPickedLetter('B');
game.checkPickedLetter('7');
game.checkPickedLetter('/'); 
// process a hit
game.processLetterHit('U');
// process a miss
game.processLetterMiss('K');
// update the game display
userInterface.updateGameDisplay();
// check the game state
game.checkGameState();
// update the session condition
session.updateSession();

userInterface.displayUsedLettersElement();
// clear used letter list
game.clearUsedLetters();
// show used letter list
game.usedLetters.forEach(element => {
  console.log(element)
});
console.log("displayble used letter list: " + game.getDisplayableUsedLetterList());



// ----------------------------------------------------------


session.recordGameResults();
session.endSession();

