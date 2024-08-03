document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('noteIt').style.display = 'none';
    document.getElementById('submittext').style.display = 'none';
    document.getElementById('answerSheet').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('originalMarks').style.display = 'none';
    var ddddd = document.getElementById('generatedText');
    ddddd.style.border = "solid 2px #0a147b42";
    ddddd.style.background = "skyblue";
    ddddd.style.borderRadius = "20px";
    ddddd.style.width = "60%";
    ddddd.style.height = "50px";
    ddddd.style.fontSize = "20px";
    ddddd.style.padding = "3px";
    ddddd.addEventListener("mouseenter", function () {
        ddddd.style.backgroundColor = "gold"; // Change background color on hover
        ddddd.style.color = "black";          // Change text color on hover
    });

    window.onbeforeunload = function () {
        if (!answersSubmitted) {
            return "Are you sure you want to leave? Your answers will be lost.";
        }
    };
});

let totalCount = 0;
let answersSubmitted = false;
let countdownTimer;
let startTime;
let endTime;
let isAutomaticSubmission = false;

// Custom Alert
function showCustomAlert(message) {
    return new Promise((resolve) => {
        document.getElementById('alertContent').innerText = message;
        document.getElementById('customAlert').style.display = 'block';
        window.resolveCustomAlert = function () {
            document.getElementById('customAlert').style.display = 'none';
            resolve();
        };
    });
}

// Custom Confirm
function showCustomConfirm(message) {
    return new Promise((resolve) => {
        document.getElementById('confirmContent').innerText = message;
        document.getElementById('customConfirm').style.display = 'block';
        window.resolveCustomConfirm = function (response) {
            document.getElementById('customConfirm').style.display = 'none';
            resolve(response);
        };
    });
}

function startTimer(duration, display) {
    document.getElementById('answers').style.display = 'none';
    document.getElementById('needTag').style.display = 'none';
    document.getElementById('numberInput').style.display = 'none';
    document.getElementById('numberInputText').style.display = 'none';

    let timer = duration, minutes, seconds;
    countdownTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(countdownTimer);
            isAutomaticSubmission = true;
            submitAnswers();
        }
    }, 1000);
}

async function generateAnswerSheet() {
    const confirmed = await showCustomConfirm("Are you sure you want to generate the answer sheet?");
    if (confirmed) {
        startReviseTimer();
    }
}

function startReviseTimer() {
    document.getElementById("answers").style.display = "none";
    document.getElementById("numberInput").style.display = "none"; 
    document.getElementById("timePerQuestion").style.display = "none";
    document.getElementById("timePerQuestionText").style.display = "none";
    document.getElementById("numberInputText").style.display = "none"; 
    document.getElementById("needTag").style.display = "none";

    const questionNumber = gucco1.length;
    const timePerQuestion = parseInt(document.getElementById('timePerQuestion').value, 10);
    const timeInSeconds = questionNumber * timePerQuestion;
    const timeInMinutes = timeInSeconds / 60;
    const timerDuration = customRound(timeInMinutes);
    console.log(timerDuration);
    const resultDiv = document.getElementById('minuteGarbage');
    resultDiv.textContent = `${timerDuration} minutes`;

    let timeLeft = 15;  // Change this to 15 for 15 seconds
    const timerElement = document.getElementById('timer');
    const submitButton = document.getElementById('generatedText');

    submitButton.style.display = 'block';
    timerElement.style.display = 'none';

    submitButton.disabled = true;
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            submitButton.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            submitButton.textContent = 'Ready... 1, 2, 3, Go!';

            setTimeout(() => {
                submitButton.style.display = 'none';
                startExam();
            }, 2000);
        }
    }, 1000);
}

function customRound(number) {
    if (Number.isInteger(number)) {
        return number;
    }
    let floor = Math.floor(number);
    if (number - floor > 0.5) {
        return floor + 1;
    } else {
        return floor;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getShuffledIndices(questionNumber) {
    let indices = Array.from({ length: questionNumber }, (_, i) => i);

    let customShuffle = [];
    customShuffle = customShuffle.concat(indices.slice(12, 17));
    customShuffle = customShuffle.concat(indices.slice(17, 25));
    customShuffle = customShuffle.concat(indices.slice(3, 12));
    customShuffle = customShuffle.concat(indices.slice(0, 3));

    return customShuffle;
}

function startExam() {
    const questionNumber = gucco1.length;
    const startQ = startQnumber;
    const timePerQuestion = parseInt(document.getElementById('timePerQuestion').value, 10);
    const timeInSeconds = questionNumber * timePerQuestion;
    const timeInMinutes = timeInSeconds / 60;
    const timerDuration = customRound(timeInMinutes);
    console.log(timerDuration);
    const resultDiv = document.getElementById('minuteGarbage');
    resultDiv.textContent = `${timerDuration} minutes`;

    startTime = new Date().toLocaleString();
    let answerSheetHTML = '<h2>OMR Answer Sheet</h2>';
    const shuffledIndices = getShuffledIndices(questionNumber);

    for (let i = 0; i < questionNumber; i++) {
        const questionIndex = shuffledIndices[i];
        answerSheetHTML += `<div id="question${questionIndex + startQ}"><strong> ${questionIndex + startQ}:</strong> `;
        for (let j = 0; j < 4; j++) {
            const option = String.fromCharCode(97 + j);
            answerSheetHTML += `<div class="option" onclick="selectOption(this, '${option}', ${questionIndex})">${option}</div>`;
        }
        answerSheetHTML += `</div>`;
    }
    document.getElementById('answerSheet').innerHTML = answerSheetHTML;
    hideAll();
    document.getElementById('submittext').style.display = 'block';
    var designSb = document.getElementById("submittext");
    designSb.style.fontSize = "20px";
    designSb.style.border = "solid 2px #0dc722";
    designSb.style.borderRadius = "20px";
    document.getElementById('answerSheet').style.display = 'block';
    document.getElementById('timer').style.display = 'block';
    const timerDisplay = document.getElementById('timer');
    startTimer(timerDuration * 60, timerDisplay);
    totalCount = parseInt(questionNumber);
}

function selectOption(option, letter, questionNumber) {
    if (answersSubmitted) return;
    const options = option.parentNode.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    option.dataset.questionNumber = questionNumber;
    console.log(`Selected option ${letter} for Question ${questionNumber}`);
}

function formatNumber(number) {
    if (Number.isInteger(number)) {
        return number;
    } else {
        return parseFloat(number.toFixed(2));
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function submitAnswers() {
    if (!isAutomaticSubmission) {
        const confirmed = await showCustomConfirm("Are you sure you want to submit your answers?");
        if (!confirmed) {
            return;
        }
    }

    answersSubmitted = true;
    endTime = new Date().toLocaleString();
    clearInterval(countdownTimer);
    let score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let missedQuestions = 0;
    const answers = [];
    const correctAnswersKey = {};

    // Prepare the correct answers key
    const shuffledIndices = getShuffledIndices(totalCount);
    for (let i = 0; i < totalCount; i++) {
        const questionIndex = shuffledIndices[i];
        correctAnswersKey[questionIndex] = answerSheet[questionIndex];
    }

    // Collect and evaluate answers
    for (let i = 1; i <= totalCount; i++) {
        const questionElement = document.getElementById(`question${i + startQnumber - 1}`);
        const selectedOption = questionElement.querySelector('.option.selected');
        if (selectedOption) {
            const selectedAnswer = selectedOption.innerText;
            answers.push(selectedAnswer);
            const questionNumber = parseInt(selectedOption.dataset.questionNumber, 10);
            if (correctAnswersKey[questionNumber] === selectedAnswer) {
                score += 5;
                correctAnswers++;
            } else {
                score -= 1;
                incorrectAnswers++;
            }
        } else {
            answers.push('-');
            missedQuestions++;
        }
    }

    const correctScore = formatNumber(correctAnswers);
    const incorrectScore = formatNumber(incorrectAnswers);
    const missedScore = formatNumber(missedQuestions);

    let resultHTML = `<h2>Answer Summary</h2>`;
    resultHTML += `<p>Total Questions: ${totalCount}</p>`;
    resultHTML += `<p>Correct Answers: ${correctScore}</p>`;
    resultHTML += `<p>Incorrect Answers: ${incorrectScore}</p>`;
    resultHTML += `<p>Missed Questions: ${missedScore}</p>`;
    resultHTML += `<p>Score: ${score}</p>`;
    resultHTML += `<p>Start Time: ${startTime}</p>`;
    resultHTML += `<p>End Time: ${endTime}</p>`;
    resultHTML += `<h3>Detailed Answers:</h3>`;

    for (let i = 0; i < totalCount; i++) {
        const questionIndex = shuffledIndices[i];
        resultHTML += `<p>Question ${i + 1 + startQnumber - 1}: Your Answer - ${answers[i]}, Correct Answer - ${correctAnswersKey[questionIndex]}</p>`;
    }

    document.getElementById('answerSheet').innerHTML = resultHTML;
    document.getElementById('submittext').style.display = 'none';
    document.getElementById('originalMarks').style.display = 'block';
    scrollToTop();
}
