const questions = [
    {
      questionImage: 'assets/img/q1.png',
      options: [
        { image: 'assets/img/q1a1.png', isCorrect: true },
        { image: 'assets/img/q1a2.png', isCorrect: false },
        { image: 'assets/img/q1a3.png', isCorrect: false },
        { image: 'assets/img/q1a4.png', isCorrect: false },
      ],
    },
    {
      questionImage: 'assets/img/q2.png',
      options: [
        { image: 'assets/img/q2a1.png', isCorrect: false },
        { image: 'assets/img/q2a2.png', isCorrect: false },
        { image: 'assets/img/q2a3.png', isCorrect: true },
        { image: 'assets/img/q2a4.png', isCorrect: false },
      ],
    },
    {
      questionImage: 'assets/img/q3.png',
      options: [
        { image: 'assets/img/q3a1.png', isCorrect: false },
        { image: 'assets/img/q3a2.png', isCorrect: true },
        { image: 'assets/img/q3a3.png', isCorrect: false },
        { image: 'assets/img/q3a4.png', isCorrect: false },
      ],
    },
    {
      questionImage: 'assets/img/q4.png',
      options: [
        { image: 'assets/img/q4a1.png', isCorrect: false },
        { image: 'assets/img/q4a2.png', isCorrect: false },
        { image: 'assets/img/q4a3.png', isCorrect: false },
        { image: 'assets/img/q4a4.png', isCorrect: true },
      ],
    },
    {
      questionImage: 'assets/img/q5.png',
      options: [
        { image: 'assets/img/q5a1.png', isCorrect: false },
        { image: 'assets/img/q5a2.png', isCorrect: false },
        { image: 'assets/img/q5a3.png', isCorrect: false },
        { image: 'assets/img/q5a4.png', isCorrect: true },
      ],
    },
    {
      questionImage: 'assets/img/q6.png',
      options: [
        { image: 'assets/img/q6a1.png', isCorrect: false },
        { image: 'assets/img/q6a2.png', isCorrect: false },
        { image: 'assets/img/q6a3.png', isCorrect: false },
        { image: 'assets/img/q6a4.png', isCorrect: true },
      ],
    },
    {
      questionImage: 'assets/img/q7.png',
      options: [
        { image: 'assets/img/q7a1.png', isCorrect: false },
        { image: 'assets/img/q7a2.png', isCorrect: true },
        { image: 'assets/img/q7a3.png', isCorrect: false },
        { image: 'assets/img/q7a4.png', isCorrect: false },
      ],
    },
    {
      questionImage: 'assets/img/q8.png',
      options: [
        { image: 'assets/img/q8a1.png', isCorrect: false },
        { image: 'assets/img/q8a2.png', isCorrect: false },
        { image: 'assets/img/q8a3.png', isCorrect: true },
        { image: 'assets/img/q8a4.png', isCorrect: false },
      ],
    },
    {
      questionImage: 'assets/img/q9.png',
      options: [
        { image: 'assets/img/q9a1.png', isCorrect: true },
        { image: 'assets/img/q9a2.png', isCorrect: false },
        { image: 'assets/img/q9a3.png', isCorrect: false },
        { image: 'assets/img/q9a4.png', isCorrect: false },
      ],
    },
    {
      questionImage: 'assets/img/q10.png',
      options: [
        { image: 'assets/img/q10a1.png', isCorrect: false },
        { image: 'assets/img/q10a2.png', isCorrect: false },
        { image: 'assets/img/q10a3.png', isCorrect: true },
        { image: 'assets/img/q10a4.png', isCorrect: false },
      ],
    },
  ];
  
  let currentQuestion = 0;

  function preloadQuizImages(questions) {
    questions.forEach((q) => {
      // Preload question image
      const qImg = new Image();
      qImg.src = q.questionImage;
  
      // Preload each option image
      q.options.forEach((opt) => {
        const optImg = new Image();
        optImg.src = opt.image;
      });
    });
  }
  
  // Call this function early in your script
  preloadQuizImages(questions);
  
  function loadQuestion(index) {
    const qBox = document.getElementById('question-box');
    const aBox = document.getElementById('answer-box');
    qBox.innerHTML = `<img src="${questions[index].questionImage}" alt="Question Image" class="dropzone" id="dropzone">`;
    aBox.innerHTML = '';
  
    questions[index].options.forEach((opt, i) => {
      const img = document.createElement('img');
      img.src = opt.image;
      img.draggable = true;
      img.dataset.correct = opt.isCorrect;
      img.addEventListener('dragstart', dragStart);
      aBox.appendChild(img);
    });
  
    setupDropzone();
    updateActiveButton();
  }
  
  function setupDropzone() {
    const dropzone = document.getElementById('dropzone');
    dropzone.addEventListener('dragover', (e) => e.preventDefault());
    dropzone.addEventListener('drop', handleDrop);
  }
  
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.correct);
  }
  
  function handleDrop(e) {
    e.preventDefault();
    const isCorrect = e.dataTransfer.getData('text/plain') === 'true';
    if (isCorrect) {
      alert('✅ Correct Answer!');
    } else {
      alert('❌ Try Again!');
    }
  }
  
  function createNavigation() {
    const nav = document.getElementById('nav-box');
    nav.innerHTML = ''; // Clear existing buttons
    for (let i = 0; i < questions.length; i++) {
      const btn = document.createElement('button');
      btn.textContent = i + 1;
      btn.dataset.index = i;
      if (i === currentQuestion) {
        btn.classList.add('active-btn');
      }
      btn.onclick = () => {
        currentQuestion = i;
        loadQuestion(i);
        updateActiveButton();
      };
      nav.appendChild(btn);
    }
  }
  
  function updateActiveButton() {
    const buttons = document.querySelectorAll('#nav-box button');
    buttons.forEach((btn, i) => {
      if (parseInt(btn.dataset.index) === currentQuestion) {
        btn.classList.add('active-btn');
      } else {
        btn.classList.remove('active-btn');
      }
    });
  }  
  
  createNavigation();
  loadQuestion(currentQuestion);
  
  //conffetti style
  // Add the confetti library
const confetti = window.confetti;

// Add clap audio for correct answer
const clapAudio = new Audio('assets/sound/clap.mp3'); // Replace with your clap sound URL
const wrongclapAudio = new Audio('assets/sound/wrong.mp3'); // Replace with your wrong sound URL
const spinAudio = new Audio('assets/sound/spin.mp3'); // Replace with your spin sound URL
const taskSelectAudio = new Audio('assets/sound/select.mp3'); // Replace with your task select sound URL

// Function to show a popup with confetti and audio
function showResultPopup(isCorrect) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <div class="popup-content">
        <h3>${isCorrect ? '✅ Betul!' : '❌ Salah!'}</h3>
      </div>
    `;
    
    // Append popup to the body
    document.body.appendChild(popup);
    
    // Trigger confetti for correct answers
    if (isCorrect) {
      confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
      });
      wrongclapAudio.pause(); // Stop clap audio if playing
      wrongclapAudio.currentTime = 0; // Reset clap audio to the beginning
      playAudio(clapAudio);
    } else {
      clapAudio.pause(); // Stop clap audio if playing
      clapAudio.currentTime = 0; // Reset clap audio to the beginning
      playAudio(wrongclapAudio);
    }

    function playAudio(audio) {
      audio.pause(); // Stop current playback
      audio.currentTime = 0; // Reset to the beginning
      audio.play(); // Play the audio
    }
    
    // Remove the popup after 1 second (1000 ms)
    setTimeout(() => {
      closePopup();
    }, 1000);
  }
  
  // Function to close the popup
  function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  }
  

// Function to close the popup
function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
}

// Updated handleDrop function to show popup instead of alert
function handleDrop(e) {
  e.preventDefault();
  const isCorrect = e.dataTransfer.getData('text/plain') === 'true';
  showResultPopup(isCorrect);  // Show the result popup with confetti
}

// filepath: c:\Users\ajiem\OneDrive\Desktop\Project\quizSejarah\wheel.js

const fullscreenButton = document.getElementById('fullscreenButton');

fullscreenButton.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});