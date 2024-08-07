document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('noteIt').style.display = 'none';
    document.getElementById('submittext').style.display = 'none';
    document.getElementById('answerSheet').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('headerBox').style.display = 'none';
    
    var ddddd = document.getElementById('generatedText');
      ddddd.style.border = "solid 1px #d7dbdd";
    ddddd.style.background = "white";
    ddddd.style.background = "linear-gradient(135deg, #e0f7fa 0%, #f9fbe7 100%)";
    ddddd.style.boxShadow= "0 8px 10px rgba(0, 0, 0, 0.1)";







    ddddd.style.color="black";
    ddddd.style.borderRadius = "23px";
    ddddd.style.width = "60%";
    ddddd.style.height = "50px";
    ddddd.style.fontSize = "20px";
    ddddd.style.padding = "3px";
    ddddd.style.fontWeight="normal";
    ddddd.addEventListener("mouseenter", function () {
        ddddd.style.background = "black";
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
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 1000); // Calculate end time by adding duration (in ms)
    // Format time to display (HH:MM AM/PM)
    const formatTime = (time) => {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    let timer = duration, minutes, seconds;
    countdownTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.innerHTML = `
            <span style="font-weight: normal; color: white;">Remaining:</span> ${minutes}:${seconds}
            <br>
            <span style="font-weight: normal; color: white;font-size:16px;">Start: ${formatTime(startTime)} </span>
            <span style="font-weight: normal; color: white;font-size:16px;">- End: ${formatTime(endTime)}  </span>
        `;

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
    const startQnumber = parseInt(document.getElementById('numberInput').value, 10);
    const startQ = startQnumber;
    const timePerQuestion = parseInt(document.getElementById('timePerQuestion').value, 10);
    const timeInSeconds = questionNumber * timePerQuestion;
    const timeInMinutes = timeInSeconds / 60;
    const timerDuration = customRound(timeInMinutes);
    const resultDiv = document.getElementById('minuteGarbage');
    resultDiv.textContent = `${timerDuration} minutes`;

    let timeLeft =0;
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


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min > max) {
        [min, max] = [max, min]; // Swap if min > max
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let randomNumberforNextuse;
let randomNumberforfurtheruse;
let randomNumberforfurtheruses;
let m;
let k;
let j;
let serialMustBeFollow=[];

function startExam() {
    const startQnumber = parseInt(document.getElementById('numberInput').value, 10);
    const startQ1 = startQnumber;
    const questionNumber = gucco1.length;
    console.log("The starting question number:",startQ1);
    const startingQwillBe = startQnumber+2;
    console.log("Number of questions: ",questionNumber);
    console.log("The last question number is:",startQ1+questionNumber-1);
    const TheLastQuestionNumber= startQ1+questionNumber-1;
    const TheLastQwillBe = TheLastQuestionNumber-2;
    console.log("the range is under",startingQwillBe,TheLastQwillBe);
    let randomNumber = getRandomNumber(startingQwillBe , TheLastQwillBe);
    console.log("The random number or the omr starting number will be:", randomNumber);
    randomNumberforNextuse= randomNumber;
    randomNumberforfurtheruse=randomNumber;
    randomNumberforNextuses= randomNumber;
    randomNumberforfurtheruses=randomNumber;
    m=startQnumber;
    k=randomNumber;
    j=randomNumber;
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
    
    for ( ; randomNumber <= TheLastQuestionNumber; randomNumber++) {
        answerSheetHTML += `<div id="question${randomNumber}"><strong> ${randomNumber}:</strong> `;
        for (let j = 0; j < 4; j++) {
            const option = String.fromCharCode(97 + j);
            answerSheetHTML += `<div class="option" onclick="selectOption(this, '${option}', ${randomNumber})">${option}</div>`;
        }
        answerSheetHTML += `</div>`;
        console.log("serial of questions", randomNumber);
        serialMustBeFollow.push(randomNumber);
    }
      let i=startQ;
      console.log("sob bad ekhane dek koto number ",i);
    for (; i < randomNumberforNextuse; i++) {
        answerSheetHTML += `<div id="question${i}"><strong> ${i}:</strong> `;
        for (let j = 0; j < 4; j++) {
            const option = String.fromCharCode(97 + j);
            answerSheetHTML += `<div class="option" onclick="selectOption(this, '${option}', ${i})">${option}</div>`;
        }
        answerSheetHTML += `</div>`;
        console.log("serial of questions", i);
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


 const selectedOptionss = [];
 let currentIndex = 0; 
function selectOption(option, letter, questionNumber) {
    if (answersSubmitted || questionNumber !== serialMustBeFollow[currentIndex]) return;
    const options = option.parentNode.querySelectorAll('.option');
    if (option.classList.contains('selected')) return;
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.onclick = null; 
    });
    option.classList.add('selected');
    option.dataset.questionNumber = questionNumber;
    selectedOptionss.push({ letter, questionNumber });
    console.log(`Selected option ${letter} for Question ${questionNumber}`);
    currentIndex++;
    if (currentIndex >= serialMustBeFollow.length) {
        document.getElementById('submittext').disabled = false;
    }
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
        const startQnumber = parseInt(document.getElementById('numberInput').value, 10);
        const selectedLetter = option.textContent.trim();
        const correctLetter = correctAnswers[option.dataset.questionNumber-startQnumber].trim();
        console.log("correctLetter",correctLetter);
        const questionNumber = parseInt(option.dataset.questionNumber);
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

    const startQnumber = parseInt(document.getElementById('numberInput').value, 10);
    for ( ; randomNumberforNextuse <= totalCount+startQnumber-1; randomNumberforNextuse++) {
        if (!answeredQuestions.includes(randomNumberforNextuse)) {
           const questionDiv = document.getElementById(`question${randomNumberforNextuse}`);
            questionDiv.innerHTML += `<div class="option skip">skipped</div>`;
        }
    }
   
    for ( ; m < randomNumberforNextuses; m++) {
        if (!answeredQuestions.includes(m)) {
            const questionDiv = document.getElementById(`question${m}`);
            questionDiv.innerHTML += `<div class="option skip">skipped</div>`;
        }
    }

    selectedOptionss.sort((a, b) => a.questionNumber - b.questionNumber);
    scrollToTop();

    document.getElementById('originalMarks').style.display = 'block';
    let output =  formatNumber(totalMarks) + "/" + totalCount;
    document.getElementById("originalMarks").innerHTML = output;
    const original_marks = (totalMarks * 100) / totalCount;
    const actual_marks = formatNumber(original_marks);
    document.getElementById('headerBox').style.display = 'block';
    let outputt =  formatNumber(actual_marks) + "/" + 100;
    document.getElementById("originalMarkss").innerHTML = outputt;
    const feedbackMessage = getFeedbackMessage(actual_marks);
    document.getElementById("originalMarksss").innerHTML = feedbackMessage;
    let timeDiff = endTimee - startTimee;
    let secondsss = Math.floor((timeDiff / 1000) % 60);
    let minutesss = Math.floor((timeDiff / (1000 * 60)) % 60);
    let outputttt =  minutesss  + " min"+"&nbsp;&nbsp;&nbsp;" + secondsss + " sec";
    document.getElementById("originalMarkssss").innerHTML = outputttt;

    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.onclick = null);
    const startQ = startQnumber;
     console.log("Number of questions:",correctAnswers.length);
    console.log("Check the arra:",correctAnswers);
    const thelastnumber =correctAnswers.length+startQ;
   
    let n =startQ;
    for (let x=1; n <= thelastnumber; n++) {
       if (x <=correctAnswers.length) {
            const correctLetter = correctAnswers[x - 1];
            console.log("correct letter:",correctLetter);
            x++; 
            const questionDiv = document.getElementById(`question${n}`);
            questionDiv.innerHTML += `<div class="correct-answer">Correct Answer: ${correctLetter}</div>`;
        }   
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
        return `Very good`;
    } else if (marks >= 75 && marks < 85) {
        return `Good`;
    } else if (marks >= 50 && marks < 75) {
        return `Need to improve`;
    } else {
        return `Very Bad`;
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












