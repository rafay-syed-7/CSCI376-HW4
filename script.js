// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Scripts", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false }
    ]
  },
  {
    question: "What is the print statemtent in Java?",
    answers: [
      { text: "System.out.print()", correct: true},
      { text: "print()", correct: false},
      { text: "printStatement()", correct: false},
      { text: "texthere()", correct: false}
    ]
  }

];

// 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
// We look at the id attributes in the index.html file. What value is put in document.getElementById() must match the id attributes in the HTML file 
// The specific id attribues are within divs. 
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const hintButton = document.getElementById("hint-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
    // Each question may have a different number of options, despite each only having 4, so its better design to have them dynamically created rather
    // than hard coding them in. Other elements like next button are static because their presence is consistent regardless of the question.
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    // 4. What is the line below doing? 
    // Its adding the button just created to the answerButtonsElement 
    // so our id answerButtons is filled with the dynamically created buttons that are then displayed 
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  hintButton.style.visibility = "visible";
  nextButton.style.visibility = "hidden";
  answerButtonsElement.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }
  hintButton.style.visibility = "hidden";

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
  // So the button is displayed after the user selects an answer. If this wasn't included, the button would remain hidden
  // so the user couldn't get to the next question 
  nextButton.style.visibility = "visible";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Restart";
  nextButton.style.visibility = "visible";
  hintButton.style.visibility = "hidden";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

hintButton.addEventListener("click", () => {
  hintButton.style.visibility = "hidden";
  allAnswers = Array.from(answerButtonsElement.children);

  //finds wrong answer and makes sure button isn't disabled
  firstWrong = allAnswers.find(btn => btn.dataset.correct != "true");
  
  if(firstWrong) {
    firstWrong.classList.add("wrong");
    firstWrong.disabled = true;
  }
});

// 6. Summarize in your own words what you think this block of code is doing. 
// Handles what should happen if Next button is clicked. If there are more questions left, calls the handleNextButton function which either shows score or next question
// Otherwise restarts quiz
nextButton.addEventListener("click", () => { 
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});



startQuiz();
