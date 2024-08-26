const quizes = [
    {
        question: "What is the Capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lesbon",
        correct: "c"
    },
    {
        question: "What is the Capital of Germany?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lesbon",
        correct: "a"
    },
    {
        question: "What is the Capital of Italy?",
        a: "Berlin",
        b: "Madrid",
        c: "Rome",
        d: "Lesbon",
        correct: "c"
    },
    {
        question: "What is the Capital of Britain?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "London",
        correct: "d"
    },
    {
        question: "What is the Capital of UAE?",
        a: "Dubai",
        b: "Madrid",
        c: "Abu Dahbi",
        d: "Lesbon",
        correct: "c"
    },
    {
        question: "What is the Capital of Kuwait?",
        a: "Kuwait",
        b: "Dubai",
        c: "Ahmadi",
        d: "Lesbon",
        correct: "a"
    },
    {
        question: "What is the Capital of Iraq?",
        a: "Berlin",
        b: "Bagdad",
        c: "Basra",
        d: "Dubai",
        correct: "b"
    },
    {
        question: "What is the Capital of Syria?",
        a: "Berlin",
        b: "Damascus",
        c: "Paris",
        d: "Aleppo",
        correct: "b"
    },
    {
        question: "What is the Capital of Spain?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lesbon",
        correct: "b"
    },
    {
        question: "What is the Capital of India?",
        a: "New Delhi",
        b: "Mumbai",
        c: "Paris",
        d: "Lesbon",
        correct: "a"
    }
];

const quiz = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const submitBtnContainer = document.getElementById("submit-button-container");
const restartBtn = document.getElementById("continue");
const results = document.getElementById("results");

let currentQuestion = 0;
let score = 0;

function loadQuiz () {
    const currentQuizData = quizes[currentQuestion];
    quiz.innerHTML = 
        `<div>    
            <div class="question">${currentQuizData.question}</div>
            <ul class="answers">
                <li><input class="list-input" type="radio" name="answer" value="a" />${currentQuizData.a}</li>
                <li><input class="list-input" type="radio" name="answer" value="b" />${currentQuizData.b}</li>
                <li><input class="list-input" type="radio" name="answer" value="c" />${currentQuizData.c}</li>
                <li><input class="list-input" type="radio" name="answer" value="d" />${currentQuizData.d}</li>
            </ul>
        </div>`;
}

function getSelectedAnswer() {
    const answers = document.querySelectorAll(`input[name="answer"]`);
    console.log(answers)
    let answer;

    answers.forEach(ans => {
        if(ans.checked) {
            answer = ans.value;
        }
    });

    return answer;
}

submitBtn.addEventListener("click", () => {
    const selectedAnswer = getSelectedAnswer();

    if(selectedAnswer) {
        if(selectedAnswer === quizes[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if(currentQuestion < quizes.length) {
            loadQuiz();
        }   else {
            quiz.innerHTML = "";
            submitBtnContainer.innerHTML = "";
            results.innerHTML = `You scored ${score} out of ${quizes.length}`;
            restartBtn.innerHTML = `
                <button onClick="window.location.reload()">Restart</button>
            `;
        }
    }
});

loadQuiz();
