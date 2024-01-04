const allOptions = ["Εγώ", "Εσύ", "Αυτός/Αυτή/Αυτό", "Εμείς", "Εσείς", "Αυτοί/Αυτές/Αυτά"];

const allQuestions = [
    { verb: "Μένω", answer: "Εγώ" },
    { verb: "Μένεις", answer: "Εσύ" },
    { verb: "Μένει", answer: "Αυτός/Αυτή/Αυτό" },
    { verb: "Μένουμε", answer: "Εμείς" },
    { verb: "Μένετε", answer: "Εσείς" },
    { verb: "Μένουν", answer: "Αυτοί/Αυτές/Αυτά" },

    { verb: "Δουλεύω", answer: "Εγώ" },
    { verb: "Δουλεύεις", answer: "Εσύ" },
    { verb: "Δουλεύει", answer: "Αυτός/Αυτή/Αυτό" },
    { verb: "Δουλεύουμε", answer: "Εμείς" },
    { verb: "Δουλεύετε", answer: "Εσείς" },
    { verb: "Δουλεύουν", answer: "Αυτοί/Αυτές/Αυτά" },

    { verb: "Έχω", answer: "Εγώ" },
    { verb: "Έχεις", answer: "Εσύ" },
    { verb: "Έχει", answer: "Αυτός/Αυτή/Αυτό" },
    { verb: "Έχουμε", answer: "Εμείς" },
    { verb: "Έχετε", answer: "Εσείς" },
    { verb: "Έχουν", answer: "Αυτοί/Αυτές/Αυτά" },

    { verb: "Είμαι", answer: "Εγώ" },
    { verb: "Είσαι", answer: "Εσύ" },
    { verb: "Είναι", answer: "Αυτός/Αυτή/Αυτό" },
    { verb: "Είμαστε", answer: "Εμείς" },
    { verb: "Είστε", answer: "Εσείς" },
    { verb: "Είναι", answer: "Αυτοί/Αυτές/Αυτά" },
];

let testData = [];
let numQuestions = 0;
let currentQuestion = 0;
let score = 0;
let answered = false; // Kullanıcının soruyu cevaplayıp cevaplamadığını kontrol etmek için değişken ekledik

document.getElementById('nextButton').style.display = 'none';

function startTest() {
    numQuestions = parseInt(document.getElementById('numQuestions').value);
    if (numQuestions > 0 && numQuestions <= allQuestions.length) {
        testData = getRandomTestQuestions(numQuestions);
        document.getElementById('startTest').style.display = 'none';
        document.getElementById('nextButton').style.display = 'block';
        displayQuestion();
    } else {
        alert("Geçerli bir soru sayısı giriniz. Toplam fiil sayısından fazla veya sıfır olmamalıdır. En fazla " + allQuestions.length + " olabilir!");
    }
}

function getRandomTestQuestions(num) {
    const selectedQuestions = [];
    while (selectedQuestions.length < num) {
        const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        if (!selectedQuestions.includes(randomQuestion)) {
            selectedQuestions.push(randomQuestion);
        }
    }
    return selectedQuestions;
}

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
    answered = false; // Yeni soru geldiğinde kullanıcının cevaplamadığını varsayalım
}

function checkAnswer(answer) {
    if (!answered) { // Kullanıcı daha önce cevap vermediyse işlem yap
        answered = true; // Kullanıcının cevapladığını işaretle
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
}

function nextQuestion() {
    if (!answered) { // Kullanıcı daha önce cevap vermediyse uyarı göster
        alert("Lütfen soruyu cevaplayın.");
    } else {
        displayQuestion();
    }
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