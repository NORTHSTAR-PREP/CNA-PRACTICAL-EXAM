let selectedQuestions = [];
let currentQuestion = 0;
let userAnswers = [];

let timer;
let timeLeft = 0;

function startExam(){

clearInterval(timer);

currentQuestion = 0;
userAnswers = [];

document.getElementById("result-container").innerHTML = "";

let totalQuestions =
parseInt(
document.getElementById("questionCount").value
);

totalQuestions =
Math.min(
totalQuestions,
questionBank.length
);

selectedQuestions =
shuffleArray([...questionBank])
.slice(0,totalQuestions);

document.getElementById("exam-container")
.style.display="block";

let selectedTime =
parseInt(
document.getElementById("timeSelect").value
);

timeLeft = selectedTime * 60;

startTimer();

showQuestion();
}

function startTimer(){

    clearInterval(timer);

    if(timeLeft === 0){

        document.getElementById("timer")
        .innerHTML = "Practice Mode";

        return;
    }

    timer = setInterval(()=>{

        timeLeft--;

        let hours =
        Math.floor(timeLeft / 3600);

        let minutes =
        Math.floor((timeLeft % 3600) / 60);

        let seconds =
        timeLeft % 60;

        document.getElementById("timer")
        .innerHTML =

        `${hours.toString().padStart(2,"0")}
        :
        ${minutes.toString().padStart(2,"0")}
        :
        ${seconds.toString().padStart(2,"0")}`;

        if(timeLeft <= 0){

            clearInterval(timer);

            alert("Time Up!");

            submitExam();
        }

    },1000);
}

function showQuestion(){

let q =
selectedQuestions[currentQuestion];

document.getElementById("question")
.innerHTML=q.question;

let html="";

q.options.forEach((option,index)=>{

html+=`
<div class="answer"
onclick="selectAnswer(${index})">
${option}
</div>
`;

});

document.getElementById("answers")
.innerHTML=html;

let saved =
userAnswers[currentQuestion];

if(saved!==undefined){

document
.querySelectorAll(".answer")
[saved]
.classList.add("selected");

}

document.getElementById("progress-text")
.innerHTML=
`Question ${currentQuestion+1}
of ${selectedQuestions.length}`;

let percent =
((currentQuestion+1)
/ selectedQuestions.length)*100;

document.getElementById("progress-fill")
.style.width=
percent+"%";
}

function selectAnswer(index){

userAnswers[currentQuestion]=index;

document
.querySelectorAll(".answer")
.forEach(answer=>{

answer.classList.remove("selected");

});

document
.querySelectorAll(".answer")
[index]
.classList.add("selected");
}

function nextQuestion(){

if(currentQuestion <
selectedQuestions.length-1){

currentQuestion++;

showQuestion();
}
}

function previousQuestion(){

if(currentQuestion>0){

currentQuestion--;

showQuestion();
}
}

function submitExam(){

clearInterval(timer);

let score=0;
let review="";

selectedQuestions.forEach((q,index)=>{

let user =
userAnswers[index];

let correct =
user===q.correct;

if(correct){
score++;
}

review+=`

<div class="review-item">

<h3>
${index+1}. ${q.question}
</h3>

<p class="${correct?'correct':'wrong'}">

Your Answer:
${user!==undefined
? q.options[user]
: "Not Answered"}

</p>

<p class="correct">

Correct Answer:
${q.options[q.correct]}

</p>

<p>

Explanation:
${q.explanation}

</p>

</div>

`;

});

let percentage =
Math.round(
(score/
selectedQuestions.length)
*100
);

document.getElementById("exam-container")
.style.display="none";

document.getElementById("result-container")
.innerHTML = `

<h1>
Score:
${score}/${selectedQuestions.length}
</h1>

<h2>${percentage}%</h2>

<button onclick="startExam()">
Start New Exam
</button>

${review}

`;`

<h1>
Score:
${score}/${selectedQuestions.length}
</h1>

<h2>
${percentage}%
</h2>

${review}

`;
}

function shuffleArray(array){

return array.sort(
()=>Math.random()-0.5
);
}

function toggleDarkMode(){

document.body
.classList.toggle("dark");

}