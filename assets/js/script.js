const quizes = [
    {
        question: "What is the Capital of France?",
        options: [
            { img: "/assets/images/berlin.jpeg", answer: "a" },
            { img: "/assets/images/berlin.jpeg", answer: "b" },
            { img: "/assets/images/berlin.jpeg", answer: "c" },
            { img: "/assets/images/berlin.jpeg", answer: "d" }
        ],
        correct: "c"
    }
];

const usernameContainer = document.getElementById("username-container");
const quiz = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next-question");
const restartBtn = document.getElementById("continue");
const results = document.getElementById("results");
const startQuizBtn = document.getElementById("start-quiz");

let username;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function loadQuiz () {
    const currentQuizData = quizes[currentQuestion];
    quiz.innerHTML = 
        `<div>    
            <div class="question">${currentQuizData.question}</div>
            <ul class="answers">
                ${currentQuizData.options.map(option => `
                    <li>
                        <img src="${option.img}" data-answer="${option.answer}" >
                    </li>
                `).join("")}
            </ul>
        </div>`; 
        
    const images = document.querySelectorAll(".answers img");
    images.forEach(img => {
        img.addEventListener("click", () => {
            images.forEach(image => image.classList.remove("selected"));
            img.classList.add("selected");
            selectedAnswer = img.getAttribute("data-answer");
        });
    });

    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
}

function showFeedback(isCorrect) {
    results.innerHTML = `<p>${isCorrect ? `Correct` : `Incorrect` }</p>`;
}

function startQuiz() {
    username = document.getElementById("username").value;
    if(!username) {
        alert("Please enter your username!");
        return;
    }

    usernameContainer.style.display = "none";
    quiz.style.display = "block";
    loadQuiz();
}

submitBtn.addEventListener("click", () => {
    if(selectedAnswer) {
        const isCorrect = selectedAnswer == quizData[currentQuestion].correct;
        if(isCorrect) score++;
        showFeedback(isCorrect);
        submitBtn.style.display = "none";
        nextBtn.style.display = "block";
    }   else {
        alert("Please select an answer");
    }
});

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    results.innerHTML = "";
    selectedAnswer = null;

    if(currentQuestion < quizData.length) {
        loadQuiz();
    }   else {
        quiz.innerHTML = "";
        results.innerHTML = `<p>${username}, you scored ${score} out of ${quizData.length}!</p>`;
        submitBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
});

startQuizBtn.addEventListener("click", startQuiz);