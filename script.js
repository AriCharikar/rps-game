// DOM Elements
const buttons = document.querySelectorAll('.btn');
const result = document.querySelector('.result--round-container');
const finalResult = document.querySelector('.result--final-container');
const playerScore = document.querySelector('.score--player');
const computerScore = document.querySelector('.score--computer');
const restartSection = document.querySelector('.restart');
const playerUsed = document.querySelector('.used--player');
const computerUsed = document.querySelector('.used--computer');
const instructionButton = document.querySelector('.toggle--instruction');
const instructionContainer = document.querySelector('.instruction--container');

// Counters for player, computer and game
let playerCounter = 0;
let comCounter = 0;
let gameCounter = 0;

// Event listeners for each button (chrome safari and firefox)
buttons.forEach(button => {
    button.addEventListener('click', startGame);
})

// Helper functions
// Function for computer's choice of Chrome firefox or safari
function computerDecision() {
    const randomChoice = Math.trunc(Math.random() * 3) + 1;
    if (randomChoice === 1) {
        return 'chrome';
    } else if (randomChoice === 2) {
        return 'firefox';
    } else {
        return 'safari';
    }
}

// Function for showing the Browser the player and computer chose.
function chooseBrowser(choice, user) {
    if (choice === 'firefox') {
        user.innerHTML = `<i class="fab fa-${choice}-browser" aria-label="${choice}"></i>`
    } else {
        user.innerHTML = `<i class="fab fa-${choice}" aria-label="${choice}"></i>`
    }
}

// Functions important to the logic of the game.
// Functionality of game and winning/losing conditions.
function startGame(e) {
    const comChoice = computerDecision();
    let playerChoice = e.target.ariaLabel;

    const loseMessage = `Sorry! You used ${playerChoice} and the computer used ${comChoice} so the computer won!`

    const winMessage = `Nice! You crushed the computer's ${comChoice} with your ${playerChoice}`

    const drawMessage = `Draw! Player used ${playerChoice} and the computer used ${comChoice}`;

    // Creating the logic of the game (works like rock paper scissors)
    if (comChoice === playerChoice) {
        result.textContent = drawMessage;
        comCounter += 0.5;
        playerCounter += 0.5;
        gameCounter++;
    } else if (comChoice === 'chrome') {
        if (playerChoice === 'firefox') {
            result.textContent = loseMessage;
            comCounter++;
            gameCounter++;
        } else if (playerChoice === 'safari') {
            result.textContent = winMessage;
            playerCounter++;
            gameCounter++;
        }
    } else if (comChoice === 'safari') {
        if (playerChoice === 'chrome') {
            result.textContent = loseMessage;
            comCounter++;
            gameCounter++;
        } else if (playerChoice === 'firefox') {
            result.textContent = winMessage;
            playerCounter++;
            gameCounter++;
        }
    } else if (comChoice === 'firefox') {
        if (playerChoice === 'safari') {
            result.textContent = loseMessage;
            comCounter++;
            gameCounter++;
        } else if (playerChoice === 'chrome') {
            result.textContent = winMessage;
            playerCounter++;
            gameCounter++;
        }
    }
    // Setting the text content for the round scores 
    playerScore.textContent = `You: ${playerCounter}`;
    computerScore.textContent = `Computer: ${comCounter}`;

    // Setting the browsers display for the players
    chooseBrowser(playerChoice, playerUsed);
    chooseBrowser(comChoice, computerUsed);

    // Checking to see if the game should end
    if (gameCounter === 5 || playerCounter >= 3 || comCounter >= 3) {
        endGame(playerCounter, comCounter);
    }
}


// A function that ends the game, creates a new button, and allows the user to play again
function endGame(scoreOne, scoreTwo) {

    // Disables the buttons so that the player cannot fiddle with the buttons after the game has completed.
    buttons.forEach(button => {
        button.disabled = true;
    })

    if (scoreOne > scoreTwo) {
        finalResult.textContent = `Player wins ${playerCounter} to ${comCounter}!`
    } else if (scoreOne < scoreTwo) {
        finalResult.textContent = `Computer WINS! ${comCounter} to ${playerCounter}`
    } else {
        finalResult.textContent = `Draw!`;
    }

    // Resetting all of the game's logic
    
    playerScore.textContent = '';
    computerScore.textContent = '';

    playerCounter = 0;
    comCounter = 0;
    gameCounter = 0;
    result.textContent = '';
    
    // Creating and removing a restart button and re-enabling the buttons on click

    const newButton = document.createElement('button');
    const newButtonText = document.createTextNode('Play Again');
    
    newButton.appendChild(newButtonText);
    restartSection.appendChild(newButton);
    
    newButton.classList.add('restart--btn');
    const restartButton = document.querySelector('.restart--btn');
    
    // Event listener for newly created button to restart the game

    restartButton.addEventListener('click', function() {
        buttons.forEach(button => {
            button.disabled = false;
        })
        restartSection.removeChild(restartButton);
        finalResult.textContent = '';    
        playerUsed.innerHTML = '';
        computerUsed.innerHTML = '';
    })
}

// Toggle the instructions

instructionButton.addEventListener('click', function() {
    instructionContainer.classList.toggle('hide');
});