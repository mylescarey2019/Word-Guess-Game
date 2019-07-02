// javascript for Word Guess game
//
// ---------------------------------------------------------

// Creates an array that lists out all of the options (Rock, Paper,Scissors, spocK,
    // Lizard).
var validTurnChoices = ["r", "p", "s","k","l"];

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
  masterWordList: ["WASHINGTON","JOHNADAMS","JEFFERSON","MADISON","MONROE","JOHNQADAMS","JACKSON","VAN BUREN","WILLIAMHARRISON",
  "TYLER","POLK","TAYLOR","FILLMORE","PIERCE","BUCHANAN","LINCOLN","ANDREWJOHNSON","GRANT","HAYES","GARFIELD", 
  "ARTHUR","CLEVELAND","BENJAMINHARRISON","MCKINLEY","ROOSEVELT","TAFT","WILSON","HARDING","COOLIDGE","HOOVER",
  "ROOSEVELT","TRUMAN","EISENHOWER","KENNEDY","LYNDONJOHNSON","NIXON","FORD","CARTER","REAGAN","GEORGEBUSH",
  "CLINTON","GEORGEBUSH","OBAMA","TRUMP"],
  availableWords: ["WASHINGTON","JOHNADAMS","JEFFERSON","MADISON","MONROE","JOHNQADAMS","JACKSON","VAN BUREN","WILLIAMHARRISON",
  "TYLER","POLK","TAYLOR","FILLMORE","PIERCE","BUCHANAN","LINCOLN","ANDREWJOHNSON","GRANT","HAYES","GARFIELD", 
  "ARTHUR","CLEVELAND","BENJAMINHARRISON","MCKINLEY","ROOSEVELT","TAFT","WILSON","HARDING","COOLIDGE","HOOVER",
  "ROOSEVELT","TRUMAN","EISENHOWER","KENNEDY","LYNDONJOHNSON","NIXON","FORD","CARTER","REAGAN","GEORGEBUSH",
  "CLINTON","GEORGEBUSH","OBAMA","TRUMP"],

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
    
    // placeholder
    placeholder: function() {
      console.log("in game.placeholder");  
    }
  }
  


// -------------------------------------------------------------------
//  *** Start of game flow *** 
// -------------------------------------------------------------------
session.beginSession();
game.placeholder();

wordPool.masterWordList.forEach(element => {
  console.log(element);
});  

console.log("words remaining: " + wordPool.isWordAvailable());

// ----------------------------------------------------------
// this is a section to simply validate each method as it is coded
// if appropriate call location is not yet known
wordPool.getWordFromPool();
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

