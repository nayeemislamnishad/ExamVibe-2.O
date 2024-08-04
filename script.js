document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('noteIt').style.display = 'none';
    document.getElementById('submittext').style.display = 'none';
    document.getElementById('answerSheet').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('headerBox').style.display = 'none';
    
    var ddddd = document.getElementById('generatedText');
    ddddd.style.border = "solid 1px black";
    ddddd.style.background = "white";
    ddddd.style.color="black";
    ddddd.style.borderRadius = "23px";
    ddddd.style.width = "60%";
    ddddd.style.height = "50px";
    ddddd.style.fontSize = "20px";
    ddddd.style.padding = "3px";
    ddddd.style.fontWeight="normal";
    ddddd.addEventListener("mouseenter", function () {
        ddddd.style.backgroundColor = "black"; 
        ddddd.style.color = "white";    
        ddddd.style.fontWeight="normal";     
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
let startTimee;
let endTime;
let endTimee;
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
    const startQ = startQnumber;
    const timePerQuestion = parseInt(document.getElementById('timePerQuestion').value, 10);
    const timeInSeconds = questionNumber * timePerQuestion;
    const timeInMinutes = timeInSeconds / 60;
    const timerDuration = customRound(timeInMinutes);
    const resultDiv = document.getElementById('minuteGarbage');
    resultDiv.textContent = `${timerDuration} minutes`;

    let timeLeft =1;
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


function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max-min+1)) + min; 
}
// const questionNumber = gucco1.length;


let randomNumberforNextuse;
let randomNumberforfurtheruse;

let serialMustBeFollow=[];

function startExam() {
    
    const questionNumber = gucco1.length;
    const numberx=questionNumber/2;
    const numberxx= Math.ceil(numberx)+1;

    const numbery=questionNumber/3;
    const numberyy= Math.floor(numbery+1);
    let randomNumber = getRandomNumber(numberyy,numberxx);
    randomNumberforNextuse= randomNumber;
    randomNumberforfurtheruse=randomNumber;
    randomNumberforNextuses= randomNumber;
    randomNumberforfurtheruses=randomNumber;
    const startQ = startQnumber;
    const timePerQuestion = parseInt(document.getElementById('timePerQuestion').value, 10);
    const timeInSeconds = questionNumber * timePerQuestion;
    const timeInMinutes = timeInSeconds / 60;
    const timerDuration = customRound(timeInMinutes);
    const resultDiv = document.getElementById('minuteGarbage');
    resultDiv.textContent = `${timerDuration} minutes`;
    startTimee = new Date();
    startTime = new Date().toLocaleString();
    let answerSheetHTML = '<h2>OMR Answer Sheet: </h2>';

    for ( ; randomNumber <= questionNumber; randomNumber++) {
        answerSheetHTML += `<div id="question${randomNumber + startQ}"><strong> ${randomNumber + startQ}:</strong> `;
        for (let j = 0; j < 4; j++) {
            const option = String.fromCharCode(97 + j);
            answerSheetHTML += `<div class="option" onclick="selectOption(this, '${option}', ${randomNumber + startQ})">${option}</div>`;
        }
        answerSheetHTML += `</div>`;
        console.log("serial og questions", randomNumber);
        serialMustBeFollow.push(randomNumber);
    }

    for (let i=1 ; i < randomNumberforNextuse; i++) {
        answerSheetHTML += `<div id="question${i + startQ}"><strong> ${i + startQ}:</strong> `;
        for (let j = 0; j < 4; j++) {
            const option = String.fromCharCode(97 + j);
            answerSheetHTML += `<div class="option" onclick="selectOption(this, '${option}', ${i + startQ})">${option}</div>`;
        }
        answerSheetHTML += `</div>`;
        console.log("serial og questions", i);
        serialMustBeFollow.push(i);
    }

    document.getElementById('answerSheet').innerHTML = answerSheetHTML;
    hideAll();
    document.getElementById('submittext').style.display = 'block';
    var designSb = document.getElementById("submittext");
    designSb.style.fontSize = "20px";
    designSb.style.border = "solid 1px black";
    
    designSb.style.borderRadius = "23px";
    document.getElementById('answerSheet').style.display = 'block';
    document.getElementById('timer').style.display = 'block';
    const timerDisplay = document.getElementById('timer');
    startTimer(timerDuration * 60, timerDisplay);
    totalCount = parseInt(questionNumber);
}

// Initialize a global array to store selected options







 const selectedOptionss = [];
 let currentIndex = 0;  // Keeps track of the current position in the serialMustBeFollow array
// let serialMustBeFollow = [1, 3, 5, 2, 4];  // Example array of question indexes

function selectOption(option, letter, questionNumber) {
    // Check if the current question matches the one to be answered according to the array
    if (answersSubmitted || questionNumber !== serialMustBeFollow[currentIndex]) return;

    // Get all options for the current question
    const options = option.parentNode.querySelectorAll('.option');

    // If the clicked option is already selected, do nothing
    if (option.classList.contains('selected')) return;

    // Disable all options for this question
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.onclick = null; // Disable click for all options
    });

    // Add 'selected' class to the clicked option
    option.classList.add('selected');
    option.dataset.questionNumber = questionNumber;

    // Save the selected option and question number
    selectedOptionss.push({ letter, questionNumber });

    // Log the selected option and update the array
    console.log(`Selected option ${letter} for Question ${questionNumber}`);

    // Move to the next question in the array
    currentIndex++;

    // If all questions are answered, enable the submit button
    if (currentIndex >= serialMustBeFollow.length) {
        document.getElementById('submittext').disabled = false;
    }
}


// function selectOption(option, letter, questionNumber) {
//     if (answersSubmitted) return;

//     // Get all options for the current question
//     const options = option.parentNode.querySelectorAll('.option');
    
//     // If the clicked option is already selected, do nothing
//     if (option.classList.contains('selected')) return;

//     // Disable all options for this question
//     options.forEach(opt => {
//         opt.classList.remove('selected');
//         opt.onclick = null; // Disable click for all options
//     });

//     // Add 'selected' class to the clicked option
//     option.classList.add('selected');
//     option.dataset.questionNumber = questionNumber;

//     // Save the selected option and question number
//     selectedOptionss.push({ letter, questionNumber });

//     // Log the selected option and update the array
//     console.log(`Selected option ${letter} for Question ${questionNumber}`);
// }












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
    const idToHide = document.getElementById('submittext');
    if (!isAutomaticSubmission) {
        const confirmed = await showCustomConfirm("Are you sure you want to submit your answers? You won't be able to change them later.");
        if (!confirmed) return;
    }
    if (answersSubmitted) return;
    answersSubmitted = true;
    clearInterval(countdownTimer);
    endTimee = new Date();
    endTime = new Date().toLocaleString();
    idToHide.style.display = 'none';
    const selectedOptions = document.querySelectorAll('.option.selected');
    const correctAnswers = gucco1.split('');
    let totalMarks = 0;
    let answeredQuestions = [];

    selectedOptions.forEach(option => {
        const selectedLetter = option.textContent.trim();
        const correctLetter = correctAnswers[option.dataset.questionNumber - startQnumber -1 ].trim();
        const questionNumber = parseInt(option.dataset.questionNumber - startQnumber );

        if (selectedLetter === correctLetter) {
            option.classList.add('correct');
            totalMarks += 1;
        } else {
            option.classList.add('incorrect');
            totalMarks -= 0.25;
        }
        option.classList.remove('selected');
        answeredQuestions.push(questionNumber);
    });

    for ( ; randomNumberforNextuse <= totalCount; randomNumberforNextuse++) {
        if (!answeredQuestions.includes(randomNumberforNextuse)) {
            const questionDiv = document.getElementById(`question${randomNumberforNextuse}`);
            questionDiv.innerHTML += `<div class="option skip">skipped</div>`;
        }
    }
    for (let i=1 ; i < randomNumberforNextuses; i++) {
        if (!answeredQuestions.includes(i)) {
            const questionDiv = document.getElementById(`question${i}`);
            questionDiv.innerHTML += `<div class="option skip">skipped</div>`;
        }
    }

     selectedOptionss.sort((a, b) => a.questionNumber - b.questionNumber);
    scrollToTop();
    document.getElementById('originalMarks').style.display = 'block';
    //  let output = "You Actually Optained: " + formatNumber(totalMarks) + "/" + totalCount;
    
    // document.getElementById("originalMarks").textContent = output;
    let output = "✅You Actually Obtained:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + formatNumber(totalMarks) + "/" + totalCount;
    document.getElementById("originalMarks").innerHTML = output;
    






    const original_marks = (totalMarks * 100) / totalCount;
    const actual_marks = formatNumber(original_marks);



    document.getElementById('headerBox').style.display = 'block';
    let outputt = "✅You Optained out of 100: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + formatNumber(actual_marks) + "/" + 100;
    document.getElementById("originalMarkss").innerHTML = outputt;

    // document.getElementById('originalMarksss').style.display = 'block';
    const feedbackMessage = getFeedbackMessage(actual_marks);
    document.getElementById("originalMarksss").innerHTML = feedbackMessage;




    let timeDiff = endTimee - startTimee;
    // Convert the difference to seconds and minutes
    let secondsss = Math.floor((timeDiff / 1000) % 60);
    let minutesss = Math.floor((timeDiff / (1000 * 60)) % 60);

    let outputttt = "✅Time used :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + minutesss  + " min"+"&nbsp;&nbsp;&nbsp;" + secondsss + " sec";
    document.getElementById("originalMarkssss").innerHTML = outputttt;


    //  const original_marks = (totalMarks * 100) / totalCount;
    //  const actual_marks = formatNumber(original_marks);
    //  const feedbackMessage = getFeedbackMessage(actual_marks);
    // const feedbackElement = document.createElement('div');
    // feedbackElement.textContent = feedbackMessage;
    // feedbackElement.classList.add('feedback-message');
    // const answerSheetContainer = document.getElementById('answerSheet');
    // answerSheetContainer.appendChild(feedbackElement);
    //  const justifyUser = document.createElement('div');
    // justifyUser.innerHTML = "Start Time: " + startTime + "<br>" + "Submit Time: " + endTime;
    // justifyUser.classList.add('justifyUserDesign');
    // const justifyUserContainer = document.getElementById('answerSheet');
    // justifyUserContainer.appendChild(justifyUser);
    // const scratches = document.createElement('div');
    // scratches.classList.add('scratches');
    // justifyUser.appendChild(scratches);

    
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.onclick = null);
    const startQ = startQnumber;

    
    for (; randomNumberforfurtheruse <= correctAnswers.length; randomNumberforfurtheruse++) {
        const correctLetter = correctAnswers[randomNumberforfurtheruse - 1];
        const questionDiv = document.getElementById(`question${randomNumberforfurtheruse + startQ}`);
        questionDiv.innerHTML += `<div class="correct-answer">Correct Answer: ${correctLetter}</div>`;
    }
    for (let i=1; i < randomNumberforfurtheruses; i++) {
        const correctLetter = correctAnswers[i - 1];
        const questionDiv = document.getElementById(`question${i + startQ}`);
        questionDiv.innerHTML += `<div class="correct-answer">Correct Answer: ${correctLetter}</div>`;
    }


    if (isAutomaticSubmission) {
        await showCustomAlert("Time's up! Your answers have been automatically submitted.");
    } else {
        await showCustomAlert("Your answers have been successfully submitted.");
    }

    window.onbeforeunload = function () {
        if (answersSubmitted) {
            return "You have already submitted your answers. Are you sure you want to leave?";
        }
        if (!answersSubmitted) {
            return "Are you sure you want to leave? Your answers will be lost.";
        }
    };
}

function getFeedbackMessage(marks) {
    if (marks >= 85 && marks <= 100) {
        return `✅Performance:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Very good`;
    } else if (marks >= 75 && marks < 85) {
        return `✅Performance:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Good`;
    } else if (marks >= 50 && marks < 75) {
        return `✅Performance:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Need to improve`;
    } else {
        return `✅Performance:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Very Bad`;
    }
}

function hideAll() {
    document.getElementById('generatedText').style.display = 'none';
}

window.onbeforeunload = function () {
    if (answersSubmitted) {
        return "You have already submitted your answers. Are you sure you want to leave?";
    }
    if (!answersSubmitted) {
        return "Are you sure you want to leave? Your answers will be lost.";
    }
};













