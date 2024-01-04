const testData = [
    { verb: "koşuyorum", answer: "ben" },
    { verb: "geliyorsun", answer: "sen" },
    // Diğer veriler...
];

const allOptions = ["εγώ", "εσύ", "αυτός / αυτή / αυτό", "εμείς", "εσείς", "αυτοί / αυτές / αυτά"]; // Geniş şahıs zamiri listesi

let currentQuestion = 0;
let score = 0;

function getRandomOptions(correctAnswer) {
    let options = [correctAnswer];
    while (options.length < 3) {
        let randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function displayQuestion() {
    const question = testData[currentQuestion];
    const choices = getRandomOptions(question.answer);
    document.getElementById('question').innerText = `Bu fiil hangi şahıs zamirine ait: ${question.verb}?`;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    choices.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        choicesContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    if (answer === testData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < testData.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function nextQuestion() {
    displayQuestion();
}

function showResults() {
    const result = document.getElementById('result');
    result.innerText = `Testi tamamladınız! Skorunuz: ${score} / ${testData.length}`;
    document.getElementById('choices').innerHTML = '';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'block';
}

function restartTest() {
    location.reload(); // Sayfayı yeniden yükler
}

displayQuestion();
