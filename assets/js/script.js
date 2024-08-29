/*jshint esversion: 6 */ 

// array of objects containing quiz questions, options, and correct answers
const quizData = [
    {
        question: "What is the Capital of France?",
        options: [
            { img: "assets/images/berlin.jpeg", answer: "a", name: "Berlin" },
            { img: "assets/images/delhi.jpeg", answer: "b", name: "Delhi" },
            { img: "assets/images/rome.jpeg", answer: "c", name: "Rome" },
            { img: "assets/images/paris.jpeg", answer: "d", name: "Paris" }
        ],
        correct: "d"
    },
    {
        question: "What is the Capital of Germany?",
        options: [
            { img: "assets/images/berlin.jpeg", answer: "a", name: "Berlin" },
            { img: "assets/images/delhi.jpeg", answer: "b", name: "Delhi" },
            { img: "assets/images/rome.jpeg", answer: "c", name: "Rome" },
            { img: "assets/images/paris.jpeg", answer: "d", name: "Paris" }
        ],
        correct: "a"
    },
    {
        question: "What is the Capital of India?",
        options: [
            { img: "assets/images/berlin.jpeg", answer: "a", name: "Berlin" },
            { img: "assets/images/delhi.jpeg", answer: "b", name: "Delhi" },
            { img: "assets/images/rome.jpeg", answer: "c", name: "Rome" },
            { img: "assets/images/paris.jpeg", answer: "d", name: "Paris" }
        ],
        correct: "b"
    },
    {
        question: "What is the Capital of Syria?",
        options: [
            { img: "assets/images/berlin.jpeg", answer: "a", name: "Berlin" },
            { img: "assets/images/delhi.jpeg", answer: "b", name: "Delhi" },
            { img: "assets/images/rome.jpeg", answer: "c", name: "Rome" },
            { img: "assets/images/damascus.jpeg", answer: "d", name: "Damascus" }
        ],
        correct: "d"
    },
    {
        question: "What is the Capital of Italy?",
        options: [
            { img: "assets/images/berlin.jpeg", answer: "a", name: "Berlin" },
            { img: "assets/images/delhi.jpeg", answer: "b", name: "Delhi" },
            { img: "assets/images/rome.jpeg", answer: "c", name: "Rome" },
            { img: "assets/images/damascus.jpeg", answer: "d", name: "Damascus" }
        ],
        correct: "c"
    },
];
// get references to various DOM elements used in the quiz 
const usernameContainer = document.getElementById("username-container");
const quiz = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next-question");
const restartBtn = document.getElementById("restart");
const results = document.getElementById("results");
const startQuizBtn = document.getElementById("start-quiz");

// variables to store the current szste of the quiz
let username;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// this function is to load the current quiz question and its options
function loadQuiz () {
    restartBtn.style.display = "none"; // hide the restart button during the quiz

    // get the data for the current question
    const currentQuizData = quizData[currentQuestion];
        // populate the quiz element with the question and answer options
    quiz.innerHTML = 
        `<div>    
            <div class="question">${currentQuizData.question}</div>
            <ul class="answers">
                ${currentQuizData.options.map(option => `
                    <li>
                        <img src="${option.img}" data-answer="${option.answer}" >
                        <p>${option.name}</p>
                    </li>
                `).join("")}
            </ul>
        </div>`; 
        
    // add click event listeners to the images representing answer options
        const images = document.querySelectorAll(".answers img");
    images.forEach(img => {
        img.addEventListener("click", () => {
            images.forEach(image => image.classList.remove("selected")); //remove selection from all images
            img.classList.add("selected"); //add selection class to the clicked image
            selectedAnswer = img.getAttribute("data-answer"); // store the selected answer
        });
    });

    submitBtn.style.display = "block"; // show submit button
    nextBtn.style.display = "none";  // hide next question button
}

// function to show feedback (correct/incorrect) to the user to enhance UX
function showFeedback(isCorrect) {
    results.innerHTML = `<p>${isCorrect ? `Correct` : `Incorrect` }</p>`;
}

// function to start the quiz
function startQuiz() {
    username = document.getElementById("username").value;
    if(!username) {
        alert("Please enter your username!"); // alert if username empty
        return;
    }

    // hide username input and show quiz container
    usernameContainer.style.display = "none";
    quiz.style.display = "block";
    loadQuiz();
}

// event listener for the submit button to check the selected answer
submitBtn.addEventListener("click", () => {
    if(selectedAnswer) {
        const isCorrect = selectedAnswer == quizData[currentQuestion].correct; // check if answer is correct
        if(isCorrect) score++; // if correct then increment score
        showFeedback(isCorrect);
        submitBtn.style.display = "none"; // hide submit button
        nextBtn.style.display = "block"; // show next question button
    }   else {
        alert("Please select an answer"); // if no answer selected then alert
    }
});

// event listener for the next question button to load next question or show results
nextBtn.addEventListener("click", () => {
    currentQuestion++; // move to the next question
    results.innerHTML = ""; // clear previous feed back
    selectedAnswer = null; // reset selected answer

    if(currentQuestion < quizData.length) {
        loadQuiz(); // load next question
    }   else { 
        // quiz finished, show score
        quiz.innerHTML = "";
        results.innerHTML = `<p>${username}, you scored ${score} out of ${quizData.length}!</p>`;
        submitBtn.style.display = "none"; // hide submit button
        nextBtn.style.display = "none"; // hide next button
        restartBtn.style.display = "block"; // show restart button
    }
});

 // event listener for the start quiz button
startQuizBtn.addEventListener("click", startQuiz);