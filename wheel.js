// Get references to the modal and button
const wheelModal = document.getElementById('wheelModal');
const startButton = document.getElementById('start-button');
const nameInput = document.getElementById('nameInput');
const addNameButton = document.getElementById('addNameButton');
const spinButton = document.getElementById('spin');
const winner = document.getElementById('winner');
const randomTaskButton = document.getElementById('randomTaskButton');
const randomTaskWrapper = document.getElementById('randomTaskWrapper');
const randomTaskDisplay = document.getElementById('randomTask');
const taskWrapper = document.getElementById('taskWrapper');

// Load supportTeam from localStorage
let supportTeam = JSON.parse(localStorage.getItem('supportTeam')) || []; // Load from localStorage

// List of random tasks
const tasks = [
  "Clap two times",
  "Make a cute face",
  "Jump three times",
  "Do a funny dance",
  "Spin around once",
  "Pretend you're a superhero",
  "Say something funny",
  "Act like a chicken for 5 seconds",
];

// Initially hide the modal when the page loads
wheelModal.style.display = 'none';

// Show the modal when the start button is clicked
startButton.addEventListener('click', () => {
  wheelModal.style.display = 'flex'; // Show the modal with flex positioning
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === wheelModal) {
    wheelModal.style.display = 'none'; // Hide the modal
  }
});

// Function to add name to the supportTeam array
addNameButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    supportTeam.push(name);
    localStorage.setItem('supportTeam', JSON.stringify(supportTeam)); // Save to localStorage
    showResultPopup1(`${name} telah ditambah ke roda!`);
    nameInput.value = ''; // Clear the input field
  }
});

// Trigger addNameButton functionality when pressing Enter in the nameInput field
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addNameButton.click(); // Simulate a click on the Add Name button
  }
});

function showResultPopup1(message, triggerConfetti = false) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <div class="popup-content">
      <h3>${message}</h3>
    </div>
  `;

  document.body.appendChild(popup);

  if (triggerConfetti) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    clapAudio.play();
  }

  setTimeout(() => {
    popup.remove();
  }, 1000);
}

// Function to select a random winner from the names in supportTeam
function everythingIsAwesome() {
  const selectedName = winner.innerHTML.replace(' telah terpilih !!!!', ''); // Get the winner's name without the suffix
  winner.innerHTML = selectedName + ' telah terpilih !!!!'; // Display the winner's name with the suffix

  // Get the winnerWrapper element
  const winnerWrapper = document.getElementById('winnerWrapper');

  // Remove any existing delete button
  const existingDeleteButton = winnerWrapper.querySelector('.delete-button');
  if (existingDeleteButton) {
    existingDeleteButton.remove();
  }

  // Add a new delete button dynamically
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Name';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => {
    // Remove the name from the supportTeam array
    supportTeam = supportTeam.filter(name => name !== selectedName);
    localStorage.setItem('supportTeam', JSON.stringify(supportTeam)); // Update localStorage

    // Clear the winner display and remove the delete button
    winner.innerHTML = 'Pilihan Nama Pemenang';
    deleteButton.remove();
  });

  // Append the new delete button to the winnerWrapper
  winnerWrapper.appendChild(deleteButton);

  // Trigger confetti and play audio
  confetti();
  clapAudio.play(); // Ensure clapAudio is defined
  spinAudio.pause(); // Pause the spin sound
  spinAudio.currentTime = 0; // Reset the spin sound to the beginning
}

// Function to simulate spinning the wheel and selecting a winner
let isSpinning = false; // Flag to track if the roulette is running

spinButton.addEventListener("click", function () {
  if (isSpinning) return; // Prevent multiple clicks if already spinning

  if (supportTeam.length > 0) {
    isSpinning = true; // Set the flag to true
    spinButton.disabled = true; // Disable the spin button
    spinAudio.play(); // Play the spin sound
    clapAudio.pause(); // Pause the clap sound
    clapAudio.currentTime = 0; // Reset the clap sound to the beginning

    roulette(10, 500); // Start the roulette
  } else {
    showResultPopup1(`Sila tambah nama ke dalam roda!`); // Show a message if no names are added
  }
});

function roulette(interval, maxinterval) {
  // Hide the delete button during the roulette
  const deleteButton = document.querySelector('.delete-button');
  if (deleteButton) {
    deleteButton.style.display = 'none';
  }

  if (interval >= maxinterval) {
    everythingIsAwesome(); // Display the winner

    // Show the delete button after the winner is selected
    if (deleteButton) {
      deleteButton.style.display = 'block';
    }

    randomTaskWrapper.style.display = 'block'; // Show the Random Task button
    taskWrapper.style.display = 'block'; // Show the task wrapper

    // Re-enable the spin button and reset the flag
    spinButton.disabled = false;
    isSpinning = false; // Reset the flag
    return;
  }

  var willitbe = supportTeam[Math.floor(Math.random() * supportTeam.length)];
  winner.innerHTML = willitbe;
  setTimeout(function () {
    roulette(interval * 1.1, maxinterval);
  }, interval);
}

// Function to simulate the spinning effect for the random task selection
let isTaskSpinning = false; // Flag to track if the task roulette is running

// Start the task roulette when the "Random Task" button is clicked
randomTaskButton.addEventListener('click', () => {
  if (isTaskSpinning) return; // Prevent multiple clicks if already spinning

  isTaskSpinning = true; // Set the flag to true
  randomTaskButton.disabled = true; // Disable the random task button
  spinAudio.play(); // Play the spin sound
  clapAudio.pause(); // Pause the clap sound
  clapAudio.currentTime = 0; // Reset the clap sound to the beginning

  taskRoulette(10, 500); // Start the task roulette
});

function taskRoulette(interval, maxinterval) {
  if (interval >= maxinterval) {
    // Display the randomly selected task when the roulette stops
    const selectedTask = tasks[Math.floor(Math.random() * tasks.length)];
    randomTaskDisplay.innerHTML = selectedTask;

    // Play the task select sound
    taskSelectAudio.play();
    spinAudio.pause(); // Pause the spin sound
    spinAudio.currentTime = 0; // Reset the spin sound to the beginning

    // Re-enable the random task button and reset the flag
    randomTaskButton.disabled = false;
    isTaskSpinning = false; // Reset the flag
    return;
  }

  // Display a random task from the tasks array
  const task = tasks[Math.floor(Math.random() * tasks.length)];
  randomTaskDisplay.innerHTML = task;

  // Keep simulating the roulette effect with increasing intervals
  setTimeout(function () {
    taskRoulette(interval * 1.1, maxinterval);
  }, interval);
}

// Get references to the new modal and buttons
const nameListButton = document.getElementById('nameListButton');
const nameListModal = document.getElementById('nameListModal');
const closeNameListButton = document.getElementById('closeNameListButton');
const nameListTableBody = document.querySelector('#nameListTable tbody');

// Function to populate the name list modal
function populateNameList() {
  // Clear the table body
  nameListTableBody.innerHTML = '';

  // Populate the table with names from localStorage
  supportTeam.forEach((name, index) => {
    const row = document.createElement('tr');

    // Name column
    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);

    // Action column with delete button
    const actionCell = document.createElement('td');
    const deleteIcon = document.createElement('span');
    actionCell.addEventListener('click', () => {
      // Remove the name from the supportTeam array
      supportTeam.splice(index, 1);
      localStorage.setItem('supportTeam', JSON.stringify(supportTeam)); // Update localStorage

      // Refresh the table
      populateNameList();
    });
    actionCell.style.cursor = 'pointer'; // Change cursor to pointer for better UX
    actionCell.textContent = '🗑️'; // Bin icon
    actionCell.classList.add('bin-icon');
    actionCell.appendChild(deleteIcon);
    row.appendChild(actionCell);

    nameListTableBody.appendChild(row);
  });
}

// Show the name list modal when the "Show List" button is clicked
nameListButton.addEventListener('click', () => {
  populateNameList();
  nameListModal.style.display = 'flex'; // Show the modal
});

// Close the name list modal when the close button is clicked
closeNameListButton.addEventListener('click', () => {
  nameListModal.style.display = 'none'; // Hide the modal
});
