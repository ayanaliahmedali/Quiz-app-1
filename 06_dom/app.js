// Sample questions array (questions and answer choices)
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 3, // index of correct answer in the answers array
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 3,
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 40; // Time per question
let timer;
let quizFinished = false;

// Elements from the DOM
const questionContainer = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const scoreContainer = document.getElementById('score');
const timerContainer = document.getElementById('time-left');
const feedbackContainer = document.getElementById('feedback');

// Initialize the quiz by showing the first question
function startQuiz() {
    showQuestion();
    startTimer();
}

// Show the current question and answers
function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Display the question
    questionContainer.textContent = currentQuestion.question;

    // Display the possible answers
    answerButtons.forEach((btn, index) => {
        btn.textContent = currentQuestion.answers[index];
        btn.onclick = () => handleAnswerClick(index);
    });
}

// Handle when an answer button is clicked
function handleAnswerClick(answerIndex) {
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    // Check if the selected answer is correct
    if (answerIndex === correctAnswer) {
        score++;
        feedbackContainer.textContent = "Correct!";
    } else {
        feedbackContainer.textContent = "Wrong!";
    }

    // Update score display
    scoreContainer.textContent = `Your score: ${ score }`;

    // Move to the next question or finish the quiz if it's the last question
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        setTimeout(() => {
            feedbackContainer.textContent = ''; // Clear feedback
            showQuestion();
        }, 1000); // Wait a second before showing next question
    } else {
        setTimeout(endQuiz, 1000);
    }
}

// Start the timer countdown
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerContainer.textContent = `Time: ${ timeLeft } seconds`;
        } else {
            clearInterval(timer);
            feedbackContainer.textContent = "Time's up!";
            setTimeout(nextQuestion, 1000);
        }
    }, 1000);
}

// Move to the next question after a delay
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        timeLeft = 30; // Reset time
        showQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

// End the quiz and show the final score
function endQuiz() {
    quizFinished = true;
    feedbackContainer.textContent = `Quiz Finished! Your final score is: ${score}`;
    clearInterval(timer);
}

// Start the quiz
startQuiz();