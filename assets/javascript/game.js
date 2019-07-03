// ---------------------------------------------------------
// javascript Presidential Word Guess game
// ---------------------------------------------------------

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

// ----------------------------------------------------------
// object for pool of word
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
// properties to be determined later - need more understanding how
// on page elements will be manipulated during game play first
  usedLetters: [],

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
  clearUsedLetters: function() {
    console.log("in userInterface.clearUsedLetters");  
    this.usedLetters.splice(0,this.usedLetters.length);
    // this is where the on page element of picked letters will be reset
    // how this looks is TBD      
    },
   

  // add a letter to the picked letter list
  // starting to think this belongs in the game object 
  // and should be replaced here with just a method
  // that updates what word is shown on screen - not sure yet
  addLetterToUsedList: function(letter) {
    console.log("in userInterface.addLetterToUsedList"); 
    this.usedLetters.push(letter); 
    // this is where list of letters already used will be added to 
    // caller sends one letter to add to list
  },  

  // find all occurance of letter in game word and reveal it on page
  // starting to think this belongs in the game object 
  // and should be replaced here with just a method
  // that updates what word is shown on screen - not sure yet
  showLetter: function(letter) {
    console.log("in userInterface.showLetter"); 
    // this is where letter in the on page word element will be 
    // changed to be visable - function will have to find all
    // ocuurances in the word 
    // caller sends one letter to add to list
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
    return this.gameWordLetterStatusArray.join('');
  }
};
  


// -------------------------------------------------------------------
//  *** Start of game flow *** 
// -------------------------------------------------------------------
session.beginSession();
wordPool.initWordPool();
game.initGameWord();
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

userInterface.clearWordElement();
// show used letter list
userInterface.usedLetters.forEach(element => {
  console.log(element)
});
// add some letters to used letter list
userInterface.addLetterToUsedList('Q');
userInterface.addLetterToUsedList('R');
userInterface.addLetterToUsedList('A');
// show used letter list
userInterface.usedLetters.forEach(element => {
  console.log(element)
});
// clear used letter list
userInterface.clearUsedLetters();
// show used letter list
userInterface.usedLetters.forEach(element => {
  console.log(element)
});

userInterface.showLetter();


// ----------------------------------------------------------


session.recordGameResults();
session.endSession();

