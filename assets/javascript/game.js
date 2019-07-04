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


  // update session information following a game end
  recordGameResultInSession: function(word,result) {
  // this is were we save the game results 
  // into wins, loses, wordsWon/Lost  
    console.log("in session.recordGameResultInSession"); 
    if (result === "win") {
      session.wins++;
      session.wordsWon.push(word);
      userInterface.displayWinCountElement();
    }
    else {
      session.losses++;
      session.wordsLost.push(word);
      userInterface.displayLossCountElement();
    };
  },

  // end session
  endSession: function() {
    console.log("in session.endSession");
    // this is were we display final stats and end the session
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

  // display message element
  displayPlayerLetterElement: function(message) {
    console.log("in userInterface.displayPlayerLetterElement"); 
    playerLetterElement.textContent = message; 
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

  // display wins element
  displayWinCountElement: function() {
    console.log("in userInterface.displayWinCountElement"); 
    winCountElement.textContent = "Wins: " + session.wins;
  },

  // display losses element
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
  },

  // diagnostic output to console
  diagnosticDump: function() {
    console.log("------------------------")
    console.log("in userInterface.diagnosticDump"); 
    console.log("word: " + game.getDisplayableGameWord());
    console.log("used letters: " + game.getDisplayableUsedLetterList());
    console.log("guess remaining: " + game.guessesRemaining);
    console.log("game state: " + game.checkGameState());
    console.log("wins: " + session.wins);
    console.log("losses: " + session.losses);
    session.wordsWon.forEach(element => {
      console.log("word won: " + element);
    });
    session.wordsLost.forEach(element => {
      console.log("word lost: " + element);
    });
    console.log("------------------------")
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
  guessesRemaining: 12,
  gameWordString: "",
  gameWordArray: [],
  gameWordLetterStatusArray: [],
  gameDisplayWord: "",
  usedLetters: [],
  // there is a better way than this to check for a-z but finding it yet
  alphaLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
                  'O','P','Q','R','S','T','U','V','W','X','Y','Z'],

  // set up the game word and its support arrays for play
  initGameWord: function() {
    console.log("game.initGameWord");
    this.gameWordString = wordPool.getWordFromPool();
    // this.gameWordString = "GEORGE W BUSH";
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
        // this.gameWordLetterStatusArray.push(element);  force the win state for testing
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
    // this alphabetizes the used letter this - not sure if I like it or not
    // trying without for now
    // var displayableUsedLetters = this.usedLetters.sort(); 
    var displayableUsedLetters = this.usedLetters
    return displayableUsedLetters.join('');
  },

  // check the picked letter for validity and hit/miss against the word
  checkPickedLetter: function(letter) {
    console.log("in game.checkPickedLetter"); 
    // console.log("letter passed in is: " + letter);
    // console.log("upper case version of it is : " + letter.toUpperCase());
    var letterState = "";
    if (letter === "0") {
      letterState = "quit";
    }
      else if (this.usedLetters.indexOf(letter.toUpperCase()) >= 0)  {
        letterState = "used";
      }
      else if (letter != " " && this.gameWordArray.indexOf(letter.toUpperCase()) >= 0) {
        letterState = "hit";
      }  
      else if (this.alphaLetters.indexOf(letter.toUpperCase()) >= 0) {
        letterState = "miss"
      }
      else {
        letterState = "invalid"
      };
    return letterState;
  },

  // apply results of finding letter in the word
  processLetterHit: function(letter) {
    console.log("in game.processLetterHit"); 
    for (i=0; i < this.gameWordArray.length; i++) {
      // console.log("game word array: " + this.gameWordArray[i]);
      if (this.gameWordArray[i] === letter) {
        this.gameWordLetterStatusArray[i] = letter;
      }
    };
    game.addLetterToUsedList(letter);
    this.guessesRemaining--;
    userInterface.updateGameDisplay();
  },

  // apply results of not finding letter in the word
  processLetterMiss: function(letter) {
    console.log("in game.processLetterMiss"); 
    game.addLetterToUsedList(letter);
    this.guessesRemaining--;
    userInterface.updateGameDisplay();
  },  

  // determine if game is won, lost or continuing and return state to caller
  checkGameState: function() {
    console.log("in game.checkGameState"); 
    var isUnrevealedLetters = true;
    if (game.gameWordLetterStatusArray.indexOf('-') === -1) {
      isUnrevealedLetters = false;
    }
    else {
      isUnrevealedLetters = true;
    };

    if (isUnrevealedLetters && this.guessesRemaining === 0) {
      return "loss";
    } 
      else if (isUnrevealedLetters && this.guessesRemaining > 0) {
        return "in-progress";
      } 
      else { 
        return "win";
      };

  },

  // perform necessary steps after game end detected
  executeGameEnd: function(word,winOrLoss) {
    console.log("in game.executeGameEnd");
    session.recordGameResultInSession(word,winOrLoss);
    if (winOrLoss === "win") {
      userInterface.displayMessageElement("Game Over, you " + winOrLoss + ".");
    }
    else {
      userInterface.displayMessageElement("Game Over, you " + winOrLoss + ". The president was: " + game.gameWordString);
    };

  // probably generate a message
  // and somehow need to reset for next game
  // probably need a executeGameReset function
  },  

  // perform necessary steps to get the next game going
  executeGameReset: function() {
    console.log("in game.executeGameReset"); 
  // need to call methods and/or update following:
  // record game results in the session
  // reset the arrays for game word
  // check to see if any word pool word left
  // or maybe that duty goes to the session object
  // which then can start the next game?
  }
};

  


// -------------------------------------------------------------------
//  *** Start of game flow *** 
// -------------------------------------------------------------------
session.beginSession();
wordPool.initWordPool();
game.initGameWord();
userInterface.initDisplay();
userInterface.diagnosticDump();

 // Core program logic - this function is run whenever the user presses a key.
 document.onkeyup = function(event) {

  // Determines which key was pressed.
  var keyUserPressed = event.key.toUpperCase();
  userInterface.displayPlayerLetterElement("You pressed key: " + keyUserPressed);

  
  // psuedo code logic:
  // check key pressed state 
    // if invalid send message
    // if used already send message
    // if quit - not sure what to do yet - send message
    // if miss then 
      // process a miss
      // check game state to see if this is a loss due to last guess 
        // do loss stuff
        // if not loss then
          // continue on
    // if hit then 
      // process a hit
      // check game state to see if this is a loss due to last guess
        // do loss stuff
      // if win
        // do win stuff
      // if neither
        // continue on
  var keyPressState = game.checkPickedLetter(keyUserPressed);   
  var gameState = game.checkGameState();
  console.log("the letter pressed has a state of: " + keyPressState)
  console.log("the letter pressed resulted in game state of: " + gameState);

  if (keyPressState === "invalid") {
    userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', please press a thru z or 0 to quit.");
  };

  if (keyPressState === "used") {
    userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', you already used that letter.");
  };

  if (keyPressState === "quit") {
    userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', quit function doesn't work yet.");
  };

  if (keyPressState === "miss") {
    userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', that is a miss.");
    game.processLetterMiss(keyUserPressed);
    gameState = game.checkGameState();
    if (gameState === "loss") {
      userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', you just lost.");
      game.executeGameEnd(game.gameWordString,"loss");
    }
    else {
      userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', game goes on.");
    };
  };  

  if (keyPressState === "hit") {
    userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', that is a hit.");
    userInterface.diagnosticDump();
    game.processLetterHit(keyUserPressed);
    userInterface.diagnosticDump();
    gameState = game.checkGameState();
    userInterface.diagnosticDump();
    if (gameState === "loss") {
      userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', you just lost.");
      game.executeGameEnd(game.gameWordString,"loss");
    }
      else if (gameState === "win") {
        userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', you just won.");
        game.executeGameEnd(game.gameWordString,"win");
      }
      else {
        userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', game goes on.");
      };
  };

  };

// session.recordGameResultInSession();
// session.endSession();
// ----------------------------------------------------------


// // ----------------------------------------------------------
// // this is a section to simply validate each method as it is coded
// // if appropriate call location is not yet known
// wordPool.masterWordList.forEach(element => {
//   console.log("master list: " + element);
// });  

// wordPool.availableWords.forEach(element => {
//   console.log("available list: " + element);
// }); 
// console.log("words remaining: " + wordPool.isWordAvailable());
// for (i=0;i<wordPool.masterWordList.length;i++) {
//   console.log("this is the word from word pool: " + wordPool.getWordFromPool());
// };
// console.log("words remaining: " + wordPool.isWordAvailable());
// wordPool.availableWords.forEach(element => {
//   console.log("available list: " + element);
// }); 

// userInterface.displayWordElement();
// // show used letter list
// game.usedLetters.forEach(element => {
//   console.log(element)
// });
// console.log("displayble used letter list: " + game.getDisplayableUsedLetterList());
// // add some letters to used letter list
// // game.addLetterToUsedList('G');
// // game.addLetterToUsedList('O');
// // game.addLetterToUsedList('S');
// // show used letter list
// game.usedLetters.forEach(element => {
//   console.log(element)
// });
// console.log("displayble used letter list: " + game.getDisplayableUsedLetterList());
// game.gameWordArray.forEach(element => {
//   console.log("game word array elements: " + element);
// });
// // check letter picked
// console.log("letter G is: " + game.checkPickedLetter('G'));
// console.log("letter = is: " + game.checkPickedLetter('='));
// console.log("letter Y is: " + game.checkPickedLetter('Y'));
// console.log("letter B is: " + game.checkPickedLetter('B'));
// console.log("letter 7 is: " + game.checkPickedLetter('7'));
// console.log("letter / is: " + game.checkPickedLetter('/'));
// console.log("letter ' ' is: " + game.checkPickedLetter(' '));
// console.log("letter g is: " + game.checkPickedLetter('g'));
// console.log("letter y is: " + game.checkPickedLetter('y'));
// console.log("letter b is: " + game.checkPickedLetter('b'));
// userInterface.diagnosticDump();
// // process a hit
// game.processLetterHit('G');
// game.processLetterHit('E');
// game.processLetterHit('O');
// game.processLetterHit('R');
// userInterface.diagnosticDump();
// // process a miss
// game.processLetterMiss('K');
// userInterface.diagnosticDump();
// game.processLetterHit('U');
// game.processLetterHit('B');
// game.processLetterHit('S');
// game.processLetterHit('H');
// game.processLetterHit('W');
// session.recordGameResultsInSession("GEORGE W BUSH","win");

// userInterface.diagnosticDump();
// // update the game display
// userInterface.updateGameDisplay();

// userInterface.displayUsedLettersElement();
// // clear used letter list
// game.clearUsedLetters();
// // show used letter list
// game.usedLetters.forEach(element => {
//   console.log(element)
// });
// console.log("displayble used letter list: " + game.getDisplayableUsedLetterList());





