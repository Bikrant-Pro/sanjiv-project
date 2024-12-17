document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");
    const animatedH1 = document.getElementById("animated-h1");
    const animatedP = document.getElementById("animated-p");

    function typeEffect(element, text, delay, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, delay);
            } else if (callback) {
                setTimeout(callback, 1000); // Wait before disappearing
            }
        }
        type();
    }

    // Show preloader first
    setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.8s ease";
        setTimeout(() => {
            preloader.style.display = "none";

            // Show content with animation
            content.style.display = "block";

            // Type h1 and p text with effects
            typeEffect(animatedH1, h1Text, 100, () => {
                typeEffect(animatedP, pText, 100, () => {
                    // Remove content after animation
                    setTimeout(() => {
                        content.style.opacity = "0";
                        content.style.transition = "opacity 0.8s ease";
                        setTimeout(() => {
                            content.style.display = "none";
                        }, 800);
                    }, 500); // Keep content visible after typing
                });
            });
        }, 800);
    }, 1500); // Preloader duration
});





const question = document.getElementById('question');
const optionsList = document.getElementById('options');
const submitBtn = document.getElementById('submits');
const resultDiv = document.getElementById('results');

const questions = [
  // Add your quiz questions here
  {
    question: "1. What is the main ingredient in a vegan burger?",
    options: [" Beef", " Chicken", " Soy Protein", " Pork"],
    correctAnswer: 3
  },

  {
    question: "2. Which of these is a popular dairy-free milk alternative?",
    options: ["Almond milk", "Cow's milk", "Goat's milk", "Sheep's milk"],
    correctAnswer: 1
  },


  {
    question: "3. Which of these is a popular Indian vegetarian dish made with lentils?",
    options: [" Biryani", "Dosa", " Dal Makhani", "Momos"],
    correctAnswer: 3
  },

  {
    question: "4. What is the main ingredient in tofu?",
    options: [" Soybeans", "Wheat", " Rice", "Corn"],
    correctAnswer: 1
  },

  {
    question: "5. In which sport is a birdie a good thing?",
    options: [" Basketball", "Football", " Golf", "Tennis"],
    correctAnswer: 3
  },

  {
    question: "6. Which of these is a popular vegetarian cuisine from Thailand?",
    options: [" Pad Thai", "Sushi", " Pizza", "Burger"],
    correctAnswer: 1
  },

  {
    question: "7. What is the highest peak in the world?",
    options: [" K2", "Mount Everest", " Kanchenjunga", "Lhotse"],
    correctAnswer: 2
  },



  {
    question: "8. Which vitamin is abundant in leafy green vegetables like spinach?",
    options: [" Vitamin C", "Vitamin D", " Vitamin K", "Vitamin B12"],
    correctAnswer: 3
  },
  // ... more questions
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  question.textContent = currentQuestion.question;

  optionsList.innerHTML = ''; // Clear previous options

  currentQuestion.options.forEach((option, index) => {
    const listItem = document.createElement('li');
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'answer';
    radioInput.id = `answer${index + 1}`;
    radioInput.value = index + 1;

    const label = document.createElement('label');
    label.htmlFor = `answer${index + 1}`;
    label.textContent = option;

    listItem.appendChild(radioInput);
    listItem.appendChild(label);
    optionsList.appendChild(listItem);
  });
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const userAnswer = parseInt(selectedAnswer.value);
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (userAnswer === correctAnswer) {
      score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      showResult();
    }
  }
}

function showResult() {
  const percentage = (score / questions.length) * 100;
  resultDiv.textContent = `Your score is ${score}/${questions.length} (${percentage}%).`;

  if (percentage >= 75) {
    const menuItems = [
      "Veg Mo:Mo",
      "Vegetable Biryani",
      "Veg Chowmein",
      "Veg Burger",
      "Veg Pizza",
      "Dosa",
    ];

    const randomIndex = Math.floor(Math.random() * menuItems.length);
    const randomMenuItem = menuItems[randomIndex];

    resultDiv.textContent += `\nCongratulations! You've won a free ${randomMenuItem} from our menu! 
    `;
  } else {
    resultDiv.textContent += "\nYour score is less than 75%. Try again tomorrow for a chance to win a free meal!";
  }
}

displayQuestion();
submitBtn.addEventListener('click', checkAnswer);