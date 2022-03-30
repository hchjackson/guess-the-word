const guessedLettersElement = document.querySelector(".guessed-letters"); // The unordered list where the player’s guessed letters will appear.
const guessLetterButton = document.querySelector(".guess"); // The button with the text “Guess!” in it.
const letterInput = document.querySelector(".letter"); // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); // The empty paragraph where the word in progress will appear.
const remainingGuessesElement = document.querySelector(".remaining"); // The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span"); // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); // The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again"); // The hidden button that will appear prompting the player to play again.

let word = "magnolia";
// const word = "magnolia"; // For testing out the game
const guessedLetters = []; // Will contain all the letters the player guesses
let remainingGuesses = 8; // Max number of guesses the player can make

const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  // console.log(words);

  const wordArray = words.split("\n");
  // const wordArray = words.split(/[\r\n|\r|\n]/);
  // console.log(wordArray);

  const randomIndex = Math.floor(Math.random() * wordArray.length);
  // console.log(randomIndex);
  word = wordArray[randomIndex].trim(); // Generates the random word for the game
  placeholder(word);
};

// Fire off the game
getWord();

// Display our symbols as placeholders for chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

// getWord(word);
// placeholder(word);

// Add event listener for when play clicks Guess button
guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message paragraph
  message.innerText = "";
  // Let's grab what was entered in the letterInput
  const guess = letterInput.value;
  // Let's make sure that it's a single letters
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // We've got a letter! Let's guess!
    makeGuess(guess);
  }
  letterInput.value = "";
});

// Check player's input to only allow letters, no numbers or symbols
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/; // Regular expression to ensure input is a letters

  if (input.length === 0) {
    // Scenario 1 - Is the input empty?
    message.innerText = "Please enter a letter.";
  }
  else if (input.length > 1) {
    // Scenario 2 - Did you type more than one letter?
    message.innerText = "Please enter a single letter.";
  }
  else if(!input.match(acceptedLetter)) { // Does the input not match regular expression pattern
    // Scenario 3 - Did you type a number, a special character or some other non letter thing?
    message.innerText = "Please enter a letter from A to Z.";
  }
  else {
    // Scenerio 4 - We finally got a single letter, omg yay
    return input;
  }
};

// Capture input
const makeGuess = function (guess) {
  guess = guess.toUpperCase(); // convert guess to uppercase
  // check to see if array contains letter
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  }
  else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

// Show the guessed letters
const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const listItem = document.createElement("li");
    listItem.innerText = letter;
    guessedLettersElement.append(listItem);
  }
};

// Update the word in progress
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  // console.log(wordArray);

  const revealWord = [];

  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    }
    else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord); // To confirm If-Else loop is working properly
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

// Count # of guesses remaining
const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();

  // check to see if array contains letter
  if (!upperWord.includes(guess)) {
    // womp womp - bad guess, lose a chance
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -=1;
  }
  else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  }
  else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  }
  else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

// Check if the player won
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
  }
};
