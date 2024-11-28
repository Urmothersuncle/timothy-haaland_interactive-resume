document.addEventListener('DOMContentLoaded', () => {
    initGuessTheTruth();
});

const games = [
    {
        type: 'GuessTheTruth',
        question: "Age:",
        statements: [
            {text: "23", isTrue: false},
            {text: "27", isTrue: false},
            {text: "30", isTrue: true},
            {text: "35", isTrue: false}
        ],
        explanation: "Correct! I actually just turned 30 this year.",
        hint: "Try an even number."
    },
    {
        type: 'GuessTheTruth',
        question: "Where I live:",
        statements: [
            {text: "Trondheim, Trøndelag, Norway", isTrue: false},
            {text: "Meredith, New Hampshire, United States", isTrue: false},
            {text: "Lafayette, Louisiana, United States", isTrue: true}
        ],
        explanation: "Correct! Although I have moved around a lot in my life, I currently reside in Louisiana.",
        hint: "Where else you gonna gator-back through a drive-thru daiquiri joint and snag you some crawdads?"
    },
    {
        type: 'GuessTheTruth',
        question: "Where I'm from:",
        statements: [
            {text: "Stavanger, Rogaland, Norway", isTrue: true},
            {text: "St Albans, England, United Kingdom", isTrue: false},
            {text: "Lafayette, Louisiana, United States", isTrue: false}
        ],
        explanation: "Correct! My family moved to Norway when I was 2 yrs old, and we moved back to the US when I was 11 yrs old.",
        hint: "You might think there's No Way I was raised there."
    },
    {
        type: 'GuessTheTruth',
        question: "Next Career Goal:",
        statements: [
            {text: "House Flipping", isTrue: false},
            {text: "Buy into a Franchise", isTrue: false},
            {text: "Web Development", isTrue: true}
        ],
        explanation: "Correct! My current goal is to get my foot in the door with Web Development.",
        hint: "Please don't miss this one..."
    }
];

function initGuessTheTruth() {
    const container = document.querySelector('.game-container');
    games.forEach(game => {
        if (game.type === 'GuessTheTruth') {
            const gameSection = document.createElement('div');
            gameSection.className = 'game';

            const questionHeading = document.createElement('h3');
            questionHeading.textContent = game.question;
            gameSection.appendChild(questionHeading);

            game.statements.forEach(statement => {
                const button = document.createElement('button');
                button.className = 'number-button';
                button.textContent = statement.text;
                button.dataset.isTrue = statement.isTrue.toString(); // Ensure data is stored as string
                button.addEventListener('click', function() { handleGuess(this, gameSection, game); });
                gameSection.appendChild(button);
            });

            container.appendChild(gameSection);
        }
    });
}

function handleGuess(button, gameSection, game) {
    const isTrue = button.dataset.isTrue === 'true';
    const allButtons = gameSection.querySelectorAll('.number-button');

    if (isTrue) {
        button.classList.add('correct');
        allButtons.forEach(btn => {
            btn.disabled = true; 
            btn.classList.add('disabled'); 
        });
        showModal(game.explanation, false); 
    } else {
        button.classList.add('incorrect');
        button.disabled = true; 
        showModal(game.hint, true); 
    }
}

function showModal(text, isHint) {
    const modal = new bootstrap.Modal(document.getElementById('explanationModal'));
    const modalText = document.getElementById('explanationText');
    const modalTitle = document.getElementById('explanationModalLabel');

    modalTitle.textContent = isHint ? "Oops... Not Quite" : "Explanation";
    modalText.innerHTML = isHint ? "Hint: " + text : text;
    modal.show();
}
