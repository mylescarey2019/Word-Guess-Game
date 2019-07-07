// ---------------------------------------------------------
// javascript Presidential Word Guess game
// ---------------------------------------------------------
// Summary:
// This is a word guessing game based on Hang-Man game.
// Theme is the 4 US Presidents and th player uses keyboard
// to "guess" letters.  THe player loses if the name cannot
// be determined before having 6 "misses".  Player continues
// through all 44 presidents and can play again if so desired.
// ---------------------------------------------------------

// ---------------------------------------------------------
// Methodology:
// I attempted OOP for this project.  While there are objects
// and methods for almost all the code I did not uses 
// classes at this time.
//
// The obects are:
//  sesssion  - this tracks the wins/losses of all the 44 games
//     and words won/lost
//  game - this is a single name from the president list
//    and includes managing the player letter guesses
//  wordPool - this is the collection of 44 and has methods 
//     to return a random name along with dwindling the list
//     so no president appears more than once
//  userInterface - this manages the text content in the html
//    elements on the page
// There is one main flow function for listening to key pressed.
// If a game is finished the next game begins when the user
// hits spacebar.  When all 44 names are complete the user
// hits spacebar to start a whole new random sequence of the 44.
// ---------------------------------------------------------

// ---------------------------------------------------------
// Refactoring Needed:
// 1.  The page styling while nice, was the last effort put 
//     into the project and deserves a better organized and 
//     functional CSS and HTML files
//
// 2.  The javascript has tested out very solid with known
//     bugs.  It was developed small method by method each
//     unit tested using console.log and fed values/conditions.
//     The assemply of the logic flow to the call the mehtods
//     went pretty quickly due to the unit testing.
//     Console.log was used extentively during development
//     debugging.
//
//     However, there are aspects that could be improved:
//        A) I would have like to learn and implement classes
//        B) some array structures are in parallel instead
//           of leveraging arrays of objects
//        C) The quit function is undeveloped
//        F) some of the methods might be to small - may be
//           some opportunity to combine or group them better
// ---------------------------------------------------------

// ---------------------------------------------------------
// Enhancements:
//        A) I would like to have buttons and menus for 
//           various functions & features
//        B) I intended the Session ojbect to report an
//           overall summary of names won/loss after all 44
//           were completed
//        C) more facts/information displays after word is solved
// ---------------------------------------------------------


// Global variables
var messageElement = document.getElementById("message");
var playerLetterElement = document.getElementById("player-letter");
var lettersUsedElement = document.getElementById("letters-used");
var wordDisplayElement = document.getElementById("word-display");
var termDisplayElement = document.getElementById("term-display");
var guessCountElement = document.getElementById("guess-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");

// ----------------------------------------------------------
// object for session
// A session is the playing of the all 44 presidents name guesses
// Session keeps track of wins, losses and words won, lost
// Player will have chance to do another session after completion
// Future enhancement will include a stats page after session
// has been completed
// ----------------------------------------------------------
var session =  {
  playerName: "",
  sessionActive: false,
  wins: 0,
  losses: 0,
  wordsWon: [],
  wordsLost: [],

  // begin the session
  startSession: function() {
    console.log("in session.startSession");
    session.sessionActive = true;
    this.wins = 0;
    this.losses = 0;
    // clear arrays
    this.wordsLost.splice(0,this.wordsLost.length);
    this.wordsWon.splice(0,this.wordsWon.length);
    // start first game in session
    wordPool.initWordPool();
    game.startGame();
    userInterface.diagnosticDump();
  },


  // update session information following a game end
  recordGameResultInSession: function(word,result) {
  // save the game results into wins, loses, wordsWon/Lost  
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
    // future enhancement
  }

};

// ----------------------------------------------------------
// object for pool of words
// ----------------------------------------------------------
var wordPool = {
  // refactor point:  instead of using parallel arrays need to refactor as array of objects
  // masterWordList: ["POLK","NIXON","FORD",],  // shorter list for testing cycles
  masterWordList: ["GEORGE WASHINGTON","JOHN ADAMS","THOMAS JEFFERSON","JAMES MADISON","JAMES MONROE","JOHN QUINCY ADAMS","ANDREW JACKSON",
  "MARTIN VAN BUREN","WILLIAM HARRISON",
  "JOHN TYLER","JAMES POLK","ZACHARY TAYLOR","MILLARD FILLMORE","FRANKLIN PIERCE","JAMES BUCHANAN","ABRAHAM LINCOLN","ANDREW JOHNSON",
  "ULYSSES S GRANT","RUTHERFORD B HAYES","JAMES GARFIELD", 
  "CHESTER ARTHUR","GROVER CLEVELAND","BENJAMIN HARRISON","WILLIAM MCKINLEY","THEODORE ROOSEVELT","WILLIAM H TAFT",
  "WOODROW WILSON", "WARREN HARDING","CALVIN COOLIDGE","HERBERT HOOVER",
  "FRANKLIN D ROOSEVELT","HARRY S TRUMAN","DWIGHT EISENHOWER","JOHN F KENNEDY","LYNDON JOHNSON","RICHARD NIXON","GERALD FORD",
  "JIMMY CARTER","RONALD REAGAN","GEORGE H W BUSH","BILL CLINTON","GEORGE W BUSH","BARACK OBAMA","DONALD TRUMP"],
  // this of names that dwindles down as names played
  availableWords: [],

  // termList: ["32nd 1933-1937 37-41 41-45 45-45", "for nixon", "for ford"], // shorter list for testing cycles
  termList: [
    "1st 1789-1793 1793-1797", "2nd 1797-1801", "3rd 1801-1805 1805-1809", "4th 1809-1813 1813-1817", "5th 1817-1821 1821-1825", 
    "6th 1825-1829", "7th 1829-1833 1833-1837", "8th 1837-1841 ", "9th 1841-1841",
    "10th 1841-1845", "11th 1845-1849", "12th 1849-1850", "13th 1850-1853", "14th 1853-1857", "15th 1857-1861", "16th 1861-1865 1865-1865",
    "17th 1865-1869", "18th 1869-1873 1873-1877", "19th 1877-1881", "20th 1881-1881",
    "21st 1881-1885", "22nd, 24th 1885-1889 1893-1897", "23rd 1889-1893", "25th 1897-1901 1901-1901", "26th 1901-1905 1905-1909", "27th 1909-1913",
    "28th 1913-1917 1917-1921", "29th 1921-1923", "30th 1923-1925 1925-1929", "31st 1929-1933",
    "32nd 1933-1937 37-41 41-45 45-45", "33rd 1945-1949 1949-1953", "34th 1953-1957 1957-1961", "35th 1961-1963", "36th 1963-1965 1965-1969",
    "37th 1969-1973 1973-1974", "38th 1974-1977", "39th 1977-1981", "40th 1981-1985 1985-1989", "41st 1989-1993",
    "42nd 1993-1997 1997-2001", "43rd 2001-2005 2005-2009", "44th 2009-2013 2013-2017", "45th 2017 - Currently in Office"
  ],

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
    // console.log("in wordPool.getWordFromPool word left: " + this.availableWords.length);
    return nextWordToPlay;
  },

  // get word terms
  // refactor point - refactor to use array of objects instead of parallel arrays
  getTermForWord(word) {
    console.log("in wordPool.getTermForWord");
    return this.termList[this.masterWordList.indexOf(word)];
  }
};

// ----------------------------------------------------------
// object for user interface - i.e. the html page elements
// ----------------------------------------------------------
var userInterface = {

  // initialize the display
  initDisplay: function() {
    console.log("in userInterface.initDisplay");
    // turn word color to white as previous game result
    // will have set it to red of player did not guess the word
    wordDisplayElement.style.color = "#ffffff"; 
    userInterface.displayWordElement();
    userInterface.hideTermDisplayElement();
    userInterface.displayUsedLettersElement();
    userInterface.displayGuessRemainingElement();
    userInterface.displayWinCountElement();
    userInterface.displayLossCountElement();
    userInterface.displayMessageElement("use keys a through z");
  },  

  // display message element
  displayMessageElement: function(message) {
    console.log("in userInterface.displayMessageElement"); 
    messageElement.textContent = message; 
  },

  // display player letter element
  // no longer called - used during development
  displayPlayerLetterElement: function(message) {
    console.log("in userInterface.displayPlayerLetterElement"); 
    playerLetterElement.textContent = message; 
  },

  // display word element
  displayWordElement: function() {
    console.log("in userInterface.displayWordElement"); 
    // wordDisplayElement.textContent = "Word: " + game.getDisplayableGameWord(); 
    wordDisplayElement.textContent = game.getDisplayableGameWord(); 
  },

  // display used letters element
  displayUsedLettersElement: function() {
    console.log("in userInterface.displayUsedLettersElement"); 
    lettersUsedElement.textContent = "letters: " + game.getDisplayableUsedLetterList();
  },

  // display guess remaining element
  displayGuessRemainingElement: function() {
    console.log("in userInterface.displayGuessRemainingElement"); 
    guessCountElement.textContent = "chances: " + game.guessesRemaining;
  },

  // display wins element
  displayWinCountElement: function() {
    console.log("in userInterface.displayWinCountElement"); 
    winCountElement.textContent = "wins: " + session.wins;
  },

  // display losses element
  displayLossCountElement: function() {
    console.log("in userInterface.displayLossCountElement"); 
    lossCountElement.textContent = "losses: " + session.losses;
  },

  // show the term display
  // this element is toggled on after word is solved then 
  // turned off for the next word guess sequence
  showTermDisplayElement: function(word) {
    console.log("in userInterface.showTermDisplayElement"); 
    termDisplayElement.textContent = wordPool.getTermForWord(word);
    termDisplayElement.style.visibility = "visible";
  },

  // hide the term display
  hideTermDisplayElement: function() {
    console.log("in userInterface.hideTermDisplayElement"); 
    termDisplayElement.style.visibility = "hidden";
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
    console.log("display word: " + game.getDisplayableGameWord());
    console.log("word: " + game.gameWordString);
    console.log("used letters: " + game.getDisplayableUsedLetterList());
    console.log("guess remaining: " + game.guessesRemaining);
    console.log("game state: " + game.checkGameState());
    console.log("words remaining: " + wordPool.availableWords.length);
    console.log("wins: " + session.wins);
    console.log("losses: " + session.losses);
    console.log("game active: " + game.gameActive);
    console.log("session active: " + session.sessionActive);
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

var game = {
  gameActive: false,
  guessesRemaining: 6,
  gameWordString: "",
  gameWordArray: [],
  gameWordLetterStatusArray: [],
  gameDisplayWord: "",
  usedLetters: [],
  // there is a better way than this to check if character is a-z but using this array
  // until code is refactored with better method
  alphaLetters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
                  'O','P','Q','R','S','T','U','V','W','X','Y','Z'],

  // set up the game word and its support arrays for play
  initGameWord: function() {
    console.log("game.initGameWord");
    this.gameWordString = wordPool.getWordFromPool();
    // below statement used during development testing only
    // this.gameWordString = "GEORGE W BUSH";
    // this.gameWordString = "BENJAMIN HARRISON";
    // this.gameWordString = "FRANKLIN ROOSEVELT";
    this.gameWordArray = this.gameWordString.split('');
    // console.log("this is the game word: " + this.gameWordString);
    // this.gameWordArray.forEach(element => {
    //   console.log("game word array elements: " + element);
    // });
    this.gameWordArray.forEach(element => {
      if (element === " ") {
        this.gameWordLetterStatusArray.push(" ");
      }
      else {
        this.gameWordLetterStatusArray.push("-");
        // this.gameWordLetterStatusArray.push(element);  force the win state for testing
      }
    });
    // this.gameWordLetterStatusArray.forEach(element => {
    //   console.log("game word status array elements: " + element);
    // });  
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
   
   // clear word letter array
   clearWord: function() {
    console.log("in game.clearWord");  
    gameWordString = "";
    gameDisplayWord = "";
    this.gameWordArray.splice(0,this.gameWordArray.length);
    this.gameWordLetterStatusArray.splice(0,this.gameWordLetterStatusArray.length);
  }, 

  // add a letter to the picked letter list
  addLetterToUsedList: function(letter) {
    console.log("in game.addLetterToUsedList"); 
    this.usedLetters.push(letter); 
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
    userInterface.updateGameDisplay();
  },

  // solve word in case of loss
  solveWord: function() {
    console.log("in game.solveWord"); 
    for (i=0; i < this.gameWordArray.length; i++) {
      this.gameWordLetterStatusArray[i] = this.gameWordArray[i];
    // in case of loss show the solved word in Red
    wordDisplayElement.style.color = "#b22234";  
    }
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
  endGame: function(word,winOrLoss) {
    console.log("in game.endGame");
    session.recordGameResultInSession(word,winOrLoss);
    game.gameActive = false;
    userInterface.showTermDisplayElement(game.gameWordString);
    if (winOrLoss === "win") {
      userInterface.displayMessageElement("you won - press spacebar for next name");
    }
    else {
      game.solveWord();
      userInterface.displayMessageElement("you lost - press spacebar for next name");
    };
    userInterface.diagnosticDump();
  },  

  // perform necessary steps to get the next game going
  startGame: function() {
    console.log("in game.startGame"); 
    game.gameActive = true;
    game.guessesRemaining = 6;
    userInterface.hideTermDisplayElement();
    game.clearUsedLetters();
    game.clearWord();
    game.initGameWord();
    userInterface.initDisplay();
    userInterface.diagnosticDump();
  }
};


// -------------------------------------------------------------------
//  *** Start of game flow *** 
// -------------------------------------------------------------------
session.startSession();

 // Core program logic - this function is run whenever the user presses a key.
 document.onkeyup = function(event) {

  // Determines which key was pressed.
  var keyUserPressed = event.key.toUpperCase();
  var keyPressState = game.checkPickedLetter(keyUserPressed);   
  var gameState = game.checkGameState();
  // console.log("the letter pressed has a state of: " + keyPressState)
  // console.log("the letter pressed resulted in game state of: " + gameState);
  
  if (game.gameActive) {  // this is the in active game & active session branch of the mainloop
    if (keyPressState === "invalid") {
      userInterface.displayMessageElement("please press a thru z or 0 to quit.");
    };

    if (keyPressState === "used") {
      userInterface.displayMessageElement("you already used " + keyUserPressed);
    };

    if (keyPressState === "quit") {
      userInterface.displayMessageElement("quit will be availble in future versions");
    };

    if (keyPressState === "miss") {
      userInterface.displayMessageElement("letter '" + keyUserPressed + "' is a miss.");
      game.processLetterMiss(keyUserPressed);
      gameState = game.checkGameState();
      if (gameState === "loss") {
        // userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', you just lost.");
        game.endGame(game.gameWordString,"loss");
      }
      else {
        // userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', game goes on.");
      };
    };  

    if (keyPressState === "hit") {
      userInterface.displayMessageElement("letter '" + keyUserPressed + "' is a hit.");
      game.processLetterHit(keyUserPressed);
      gameState = game.checkGameState();
      userInterface.diagnosticDump();
      if (gameState === "loss") {
        // userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', you just lost.");
        game.endGame(game.gameWordString,"loss");
      }
        else if (gameState === "win") {
          // userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', you just won.");
          game.endGame(game.gameWordString,"win");
        }
        else { // games continues - not a win or loss yet
          // userInterface.displayMessageElement("You pressed '" + keyUserPressed + "', game goes on.");
        };
    };
  }
  else {  // this is the game over & session over branch of the mainloop
      console.log("in game not active check branch");
      if (session.sessionActive) { // session is active
        console.log("session is active");
        if (keyUserPressed === " ") {
          console.log("session is active, spacebar - check word avail");
          if (wordPool.isWordAvailable()) {
            console.log("word is available - start new game");
            game.startGame();
          }
          else {
            console.log("in game active branch - no words - end session");
            session.sessionActive = false;
            userInterface.displayMessageElement('no more names - hit spacebar to start over');
          }
        }
      } 
      else { // session is not active
        console.log("in session not active branch");
        if (keyUserPressed === " ") {
          console.log("in session not active branch - spacebar, start new session");
          session.startSession();
        }
      }
    } 
};

