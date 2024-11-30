document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.favorite-game-container')) {
        init2Truths1Lie();
    }

    if (document.querySelector('.this-or-that-container')) {
        createThisOrThatRounds();
        initThisOrThatGame();
    }

    initVisibilityHandling();

    window.addEventListener('scroll', handleVisibility);
});

const games = [
    {
        type: '2Truths1Lie',
        statements: [
            {text: "I love camping in the Forest.", isLie: false},
            {text: "I love relaxing at the Beach.", isLie: true},
            {text: "I love exploring and hiking up the Mountains.", isLie: false}
        ],
        explanation: "Correct! The Lie is: I love relaxing at the Beach. I'm not particularly fond of direct heat unless I'm feeling cold, nor do I enjoy the hassle of applying SPF 9,000 with a butter knife to avoid getting sunburned. I'll also, just save everyone some time and not get into a rant of how sand is eternal.<br><br>Truths:<br>1. I love the mountains. Ever since I was little, the mountains always gave me such a sense of wonder. Fun fact: When I was just 7 years old, my family lived in a beautiful 3-story mansion atop a hill nestled among a bowl of mountains. We used to venture through the forest to a nearby large lake, where everyone had claimed their own sizable boulder. However, I opted to claim a small cave that could only be accessed by scaling a nearby tree. This easily made living near the mountains a cherished experience of mine.<br>2. I love the forest. Despite its dangers and the presence of ticks, venturing through the woods alone and with family was one of my favorite pastimes. Not-so-fun-fact: In the forest, I used to journey to reach my small cave, cow patties would easily be mistaken for tree stumps. Unfortunately, this was a lesson I learned the hard way.",
        hint: "Sand is Eternal."
    },
    {
        type: '2Truths1Lie',
        statements: [
            {text: "My Favorite past-time is scrolling through Tik-Tok.", isLie: true},
            {text: "Learning whatever is in front of me.", isLie: false},
            {text: "Working on personal projects.", isLie: false}
        ],
        explanation: "Correct! The Lie is: Scrolling through Tik-Tok. While Tik-Tok offers plenty of entertaining and educational content, I prefer to stay productive and use my time to learn and grow as much as possible while I still have time.<br><br>My favorite pastime, by far, is learning. Whether it’s diving into a personal project like coding a website or tackling something new like understanding circuit maps to fix a dryer, I thrive on gaining knowledge and utilizing it to create new ideas. I also love learning how to build 3D printed projects and solar-powered robot cars with my daughters. I have a blast teaching them what I've learned, and they soak it all in like a sponge. Learning alongside people I love makes the experience both enriching and enjoyable.",
        hint: "It's really hard for me to sit still and not be productive."
    },
    {
        type: '2Truths1Lie',
        statements: [
            {text: "My oldest brother performed on the Hit-Show So You Think You Can Dance.", isLie: false},
            {text: "My oldest sister sang in concerts in 32 countries in Europe.", isLie: false},
            {text: "My other sister was a child prodigy in piano.", isLie: true}
        ],
        explanation: "Correct! The Lie is: My other sister was a child prodigy in piano. Although Amy wasn't a prodigy, she is incredibly musically inclined.<br><br>Yes, my oldest sister Elisa did sing in 32 countries in Europe! She traveled with a missionary group called Jesus Revolution.<br><br><a href='https://youtu.be/sIx09cJtUlU?si=kLjv-9davhh-4t1e' target='_blank'>Yes, my oldest brother Knowlton did perform on So You Think You Can Dance. Check it out.</a>",
        hint: "The family is musically inclined, anything more is a bit of a stretch."
    },
    {
        type: '2Truths1Lie',
        statements: [
            {text: "I have a stamp on my passport for holding the record time of balancing an egg on a nail in the center of the equator.", isLie: false},
            {text: "I was raised in Norway from age 2-11.", isLie: false},
            {text: "I have screen time in Criminal Minds as an extra playing a dead person.", isLie: true}
        ],
        explanation: "Correct! The Lie is: I have screen time in Criminal Minds playing as a dead person. While I've had some interesting experiences, acting on Criminal Minds isn't one of them. My incredible cousin Ashlyn Ross did so, however. She was also in American Horror Story series titled Freak Show.<br><br>Yes, I have a stamp on my passport for holding the record time of balancing an egg on a nail in the center of the equator.<br><br>Yes, I was raised in Norway from age 2-11. It was a wonderful experience, and I cherish the memories from that time.",
        hint: "I gave one truth away on the welcome page."
    },
    {
        type: '2Truths1Lie',
        statements: [
            {text: "I've been paid to flip burgers.", isLie: true},
            {text: "I've been paid to sing.", isLie: false},
            {text: "I've been paid to sleep.", isLie: false}
        ],
        explanation: "That's right! The lie is that I've been paid to flip burgers.<br><br>You might wonder how I got paid to sleep. While working offshore, there were times we only worked seven days out of our 28-day rotation due to hurricanes in the Gulf. It was also during this time that I honed my Cornhole skills, even with the boat swaying in rough weather.<br><br>As for singing, I had the privilege of performing (singing, dancing, and acting) on stage and tour for four years, getting paid per song. It was an incredible experience, as it felt like getting paid to do something I love and would do for free. I was also fortunate to be coached by Kari Campbell, Peter Samuels, and Hunter Plake, who appeared on The Voice in 2017.",
        hint: "No, this is Patrick."
    },
    {
        type: '2Truths1Lie',
        statements: [
            {text: "My Cousin Steven Broussard is an Executive Producer for Marvel Studios.", isLie: false},
            {text: "My Aunt Sara Ballantyne was once recognized as World's best mountain biker.", isLie: false},
            {text: "My Cousin Erling Haaland plays professional soccer for Manchester City and the Norway national team.", isLie: true}
        ],
        explanation: "Great job! While last names can be misleading, the lie is that Erling Haaland is my cousin.<br>(Unless I discover otherwise, which would be pretty crazy.)<br><br> However, I am related to Steven and Sara, and I have several other incredible and well-known family members. Shout out to my sister-in-law Marianne Haaland, who is an actress, writer, and director involved in many films and currently working with Netflix. Also, my cousin Ashlynn Ross, whom I mentioned earlier, and my cousin Hannah Perry, a singer-songwriter who has gone viral on TikTok.",
        hint: "Last names can be decieving."
    }
];

function init2Truths1Lie() {
    const gameContainer = document.querySelector('.favorite-game-container');
    if (!gameContainer) return; 

    games.forEach(game => {
        createGame(game, gameContainer);
    });
}

function createGame(game, gameContainer) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game-instance';
    game.statements.forEach((statement) => {
        const button = document.createElement('button');
        button.textContent = statement.text;
        button.className = 'statement-btn btn btn-primary';
        button.onclick = () => handleGuess(button, statement, game);
        gameDiv.appendChild(button);
    });
    gameContainer.appendChild(gameDiv);
}

function handleGuess(button, statement, game) {
    const allButtons = button.parentNode.querySelectorAll('.statement-btn');
    if (statement.isLie) {
        button.classList.add('correct');
        allButtons.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
            if (!btn.classList.contains('correct')) {
                btn.style.background = "rgba(30, 30, 30, 1)";
                btn.style.borderColor = "#007BFF";
            }
        });
        showModal(game.explanation, false);
    } else {
        button.classList.add('incorrect');
        button.disabled = true;
        showModal(game.hint, true);
    }
}

function initVisibilityHandling() {
    const handleVisibility = () => {
        const thisOrThatContainer = document.querySelector('.this-or-that-container');
        const leftContent = document.querySelector('.left-side');
        const rightContent = document.querySelector('.right-side');

        if (!thisOrThatContainer) return;

        const containerRect = thisOrThatContainer.getBoundingClientRect();
        const containerVisible =
            containerRect.top >= 0 &&
            containerRect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

        if (containerVisible) {
            leftContent.style.display = 'none';
            rightContent.style.display = 'none';
        } else {
            leftContent.style.display = 'block';
            rightContent.style.display = 'block';
        }
    };

    handleVisibility();
    window.addEventListener('scroll', handleVisibility);
    window.addEventListener('resize', handleVisibility);
}  

function showModal(text, isHint) {
    if (typeof bootstrap === 'undefined' || !bootstrap.Modal) {
        console.error("Bootstrap Modal is not available.");
        return;
    }

    const modal = new bootstrap.Modal(document.getElementById('explanationModal'));
    const modalText = document.getElementById('explanationText');
    const modalTitle = document.getElementById('explanationModalLabel');

    modalTitle.textContent = isHint ? "Oops... Not Quite" : "Explanation";
    modalText.innerHTML = isHint ? "Hint: " + text : text;
    modal.show();
}

function createThisOrThatRounds() {
    const roundsData = [
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/Beach.webp", alt: "Beach", isCorrect: false},
                {src: "assets/images/favorites/this_or_that/mountains.jpg", alt: "Mountains", isCorrect: true}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/coffee.jpg", alt: "Coffee", isCorrect: true},
                {src: "assets/images/favorites/this_or_that/tea.jpg", alt: "Tea", isCorrect: false}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/cats.jpg", alt: "Cats", isCorrect: false},
                {src: "assets/images/favorites/this_or_that/dogs.jpg", alt: "Dogs", isCorrect: true}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/football.jpg", alt: "Football", isCorrect: false},
                {src: "assets/images/favorites/this_or_that/basketball.jpg", alt: "Basketball", isCorrect: true}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/summer.jpg", alt: "Summer", isCorrect: false},
                {src: "assets/images/favorites/this_or_that/winter.jpg", alt: "Winter", isCorrect: true}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/console.jpg", alt: "Console Gaming", isCorrect: false},
                {src: "assets/images/favorites/this_or_that/PC.jpg", alt: "PC Gaming", isCorrect: true}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/OnlineShopping.jpg", alt: "Online Shopping", isCorrect: true},
                {src: "assets/images/favorites/this_or_that/InStoreShopping.jpg", alt: "In-Store Shopping", isCorrect: false}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/Texting.jpg", alt: "Texting", isCorrect: false},
                {src: "assets/images/favorites/this_or_that/Calling.jpg", alt: "Calling", isCorrect: true}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/iPhone.jpg", alt: "iPhone", isCorrect: true},
                {src: "assets/images/favorites/this_or_that/Android.jpg", alt: "Android", isCorrect: false}
            ]
        },
        {
            question: "Which do I prefer?",
            images: [
                {src: "assets/images/favorites/this_or_that/Movies.jpg", alt: "Movies", isCorrect: false},
                {src: "assets/images/favorites/this_or_that/TvShows.jpg", alt: "TV Shows", isCorrect: true}
            ]
        },
    ];

    const container = document.querySelector('.this-or-that-container');
    if (!container) return; // Guard clause if container is missing

    roundsData.forEach((round, index) => {
        const roundDiv = document.createElement('div');
        roundDiv.className = 'round';
        roundDiv.id = `round-${index + 1}`;
        roundDiv.style.display = index === 0 ? 'block' : 'none';

        const questionP = document.createElement('p');
        questionP.textContent = round.question;
        roundDiv.appendChild(questionP);

        const choicesDiv = document.createElement('div');
        choicesDiv.className = 'choices';

        round.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.className = 'choice-img';
            img.dataset.answer = image.isCorrect ? 'correct' : 'incorrect';
            choicesDiv.appendChild(img);
        });

        roundDiv.appendChild(choicesDiv);
        container.appendChild(roundDiv);
    });
}

function initThisOrThatGame() {
    const rounds = document.querySelectorAll('.round');
    if (!rounds.length) return;

    let currentRound = 0;

    rounds[currentRound].style.display = 'block';

    rounds.forEach((round, index) => {
        const choices = round.querySelectorAll('.choice-img');
        choices.forEach(choice => {
            choice.addEventListener('click', function () {
                handleChoice(this, rounds, index);
            });
        });
    });
}

// Handle User Choices in This or That
function handleChoice(choice, rounds, index) {
    const correct = choice.dataset.answer === 'correct';

    if (correct) {
        choice.classList.add('correct');
    } else {
        choice.classList.add('incorrect');
    }

    setTimeout(() => {
        rounds[index].style.display = 'none';
        if (index + 1 < rounds.length) {
            rounds[index + 1].style.display = 'block';
        } else {
            alert("You've completed the game!");
        }
    }, 1000);
}