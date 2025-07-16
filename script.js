
// Select all screens
const welcomeScreen = document.getElementById('welcomeScreen');
const aboutScreen = document.getElementById('aboutScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

// Buttons
const nameInput = document.getElementById('name');
const startBtn = document.getElementById('startBtn');
const aboutBtn = document.getElementById('aboutBtn');
const scoreBtn = document.getElementById('scoreBtn');

let currentQ = 0;
let score = 0;
let userName = '';
let hasAnswered = false;

const questions = [
  {
    question: "What goes up but never comes down?",
    options: ["A balloon", "Age", "Smoke", "Temperature"],
    answer: "Age"
  },
  {
    question: "What has to be broken before you can use it?",
    options: ["Glass", "Promise", "Egg", "Box"],
    answer: "Egg"
  },
  {
    question: "Which month has 28 days?",
    options: ["February", "All of them", "None", "January"],
    answer: "All of them"
  },
  {
    question: "What gets wetter the more it dries?",
    options: ["Towel", "Sponge", "Rain", "Air"],
    answer: "Towel"
  },
  {
    question: "What has a face and two hands but no arms or legs?",
    options: ["Clock", "Doll", "Robot", "Calendar"],
    answer: "Clock"
  },
  {
    question: "If a plan crashes on the border of the US and Canada, where do they bury the survivors?",
    options: ["Canada", "US", "Both", "Nowhere"],
    answer: "Nowhere"
  },
  {
    question: "What has keys but can't open locks?",
    options: ["Locksmith", "Map", "Keyboard", "Treasure"],
    answer: "Keyboard"
  },
  {
    question: "What weights more? A pound of feathers or a pound of bricks?",
    options: ["Feathers", "Bricks", "Both are equal", "Neither"],
    answer: "Both are equal"
  },
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    options: ["Time", "M", "Second", "Air"],
    answer: "M"
  },
  {
    question: "If you throw a red stone into the blue sea, what will it become?",
    options: ["Red", "Wet", "Sink", "Lost"],
    answer: "Wet"
  }
];

// Load quiz screen
function loadQuizScreen() {
  welcomeScreen.style.display = 'none';
  quizScreen.style.display = 'flex';
  quizScreen.innerHTML = `
    <div class="container">
      <h2 id="questionCount">Question 1 of 10</h2>
      <p id="questionText">Loading...</p>
      <ul id="optionsList"></ul>
      <div class="controls">
        <button id="skipBtn">⏭️ Skip</button>
        <button id="checkBtn">✅ Check Answer</button>
        <button id="nextBtn" style="display: none;">➡️ Next</button>
      </div>
    </div>
  `;
  showQuestion();
  setupButtons();
}

// Show Questions
function showQuestion() {
  const q = questions[currentQ];
  document.getElementById('questionCount').textContent = `Question ${currentQ + 1} of 10`;
  document.getElementById('questionText').textContent = `🤔 ${q.question}`;
  const optionsList = document.getElementById('optionsList');
  optionsList.innerHTML = '';

  q.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.className = 'option';
    li.style.cursor = 'pointer';
    li.onclick = () => selectOption(li);
    optionsList.appendChild(li);
  });

  hasAnswered = false;
  const nextBtn = document.getElementById('nextBtn');
  const checkBtn = document.getElementById('checkBtn');
  const skipBtn = document.getElementById('skipBtn');

  nextBtn.style.display = 'none';
  checkBtn.disabled = false;
  skipBtn.disabled = false;
}

// Select Option
function selectOption(selectedLi) {
  if (hasAnswered) return;
  document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
  selectedLi.classList.add('selected');
}

// Buttons
function setupButtons() {
  const checkBtn = document.getElementById('checkBtn');
  const skipBtn = document.getElementById('skipBtn');
  const nextBtn = document.getElementById('nextBtn');

  checkBtn.addEventListener('click', () => {
    if (hasAnswered) return;

    const selected = document.querySelector('.option.selected');
    if (!selected) return alert('Please select an option!');

    const correct = questions[currentQ].answer;
    if (selected.textContent === correct) {
      selected.style.backgroundColor = '#55efc4';
      selected.style.color = '#fff';
      score++;
    } else {
      selected.style.backgroundColor = '#ff7675';
      selected.style.color = '#fff';
      document.querySelectorAll('.option').forEach(opt => {
        if (opt.textContent === correct) {
          opt.style.backgroundColor = '#55efc4';
          opt.style.color = '#000';
        }
      });
    }

    hasAnswered = true;
    nextBtn.style.display = 'inline-block';
    checkBtn.disabled = true;
    skipBtn.disabled = true;
  });

  nextBtn.addEventListener('click', () => {
    currentQ++;
    currentQ === questions.length ? endQuiz() : showQuestion();
  });

  skipBtn.addEventListener('click', () => {
    if (hasAnswered) return; // Prevent skip after answering
    currentQ++;
    currentQ === questions.length ? endQuiz() : showQuestion();
  });
}

// End Quiz
function endQuiz() {
  quizScreen.style.display = 'none';
  resultScreen.style.display = 'flex';
  let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
  scores.push({ name: userName, score: score });
  localStorage.setItem('quizScores', JSON.stringify(scores));

  resultScreen.innerHTML = `
    <div class="container">
      <h2>🎉 Quiz Complete!</h2>
      <p>Well done, <strong>${userName}</strong>! 🧠</p>
      <p>Your Score: <strong>${score} / ${questions.length}</strong></p>
      <button onclick="location.reload()">🔄 Play Again</button>
    </div>
  `;
}

// About Screen
aboutBtn.addEventListener('click', () => {
  welcomeScreen.style.display = 'none';
  aboutScreen.style.display = 'flex';
  aboutScreen.innerHTML = `
    <div class="container">
        <h2>ℹ️ About SenseiQ</h2>
        <p>
        Welcome to <strong>SenseiQ</strong> – the fun, fast, and slightly tricky common sense quiz app! 🎉  
        This quiz is built to test not just your memory, but your instincts and logic too! 🧩  
        </p>

        <h3>🎮 How to Play:</h3>
        <ul>
            <li>📝 You’ll face <strong>10 common sense questions</strong></li>
            <li>🔘 Each question has <strong>4 options</strong></li>
            <li>💥 You can <strong>Skip</strong> if you’re unsure</li>
            <li>✅ After answering, click <strong>Next</strong> to move on</li>
            <li>🏁 At the end, your score will be saved with your name</li>
        </ul>

        <p>Ready to show off your street smarts? 😄</p>
        <button id="backBtn" onclick="goBack()">🔙 Back to Home</button>
    </div>
  `;
});

function goBack() {
  aboutScreen.style.display = 'none';
  welcomeScreen.style.display = 'flex';
}

// Scoreboard
scoreBtn.addEventListener('click', () => {
  const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
  if (scores.length === 0) return alert("📉 No scores yet. Play to get started!");

  let list = scores.map((s, i) => `${i + 1}. ${s.name}: ${s.score}/10`).join('\n');
  alert(`🏆 Score Board:\n\n${list}`);
});

startBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) return alert('Please enter your name! 👤');
  userName = name;
  localStorage.setItem('quizUser', userName);
  loadQuizScreen();
});
