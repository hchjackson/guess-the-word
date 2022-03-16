const guessedLetters = document.querySelector(".guessed-letters"); // The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess"); // The button with the text “Guess!” in it.
const letterInput = document.querySelector(".letter"); // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); // The empty paragraph where the word in progress will appear.
const remainingGuesses = document.querySelector(".remaining"); // The paragraph where the remaining guesses will display.
const remainingSpan = document.querySelector(".remaining span"); // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); // The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again"); // The hidden button that will appear prompting the player to play again.

const word = "magnolia"; // For testing out the game

// To add and display placeholders for chosen word's letters
const placeholder = function (mysteryWord) {
  const mysteryArray = [];
  for (const letter of mysteryWord) {
    console.log(letter);
    mysteryArray.push("●");
  }
  wordInProgress.innerText = mysteryArray.join("");
};

placeholder(word);

// Add event listener for when play clicks Guess button
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const mysteryLetter = letterInput.value;
  console.log(mysteryLetter);
  letterInput.value = "";
});
