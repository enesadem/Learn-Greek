// Önce, CSV dosyasından verileri okumak için bir fonksiyon
function fetchVerbs(callback) {
    // Örnek CSV dosya yolu (kendi dosyanızın yolunu belirtin)
    const csvFilePath = 'verblar.csv';

    // CSV dosyasını okuma işlemi
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            // CSV verilerini diziye dönüştür
            const rows = data.split('\n');
            const verbs = [];

            rows.forEach(row => {
                const columns = row.split(',');
                const verb = {
                    infinitive: columns[0].trim(),
                    person1: columns[1].trim(),
                    person2: columns[2].trim(),
                    person3: columns[3].trim()
                };
                verbs.push(verb);
            });

            // Callback fonksiyonunu çalıştır ve verileri iletecek
            callback(verbs);
        })
        .catch(error => console.error('CSV dosyası okuma hatası:', error));
}

// Test fonksiyonunu başlat
function startTest() {
    // Verileri al ve testi başlat
    fetchVerbs(verbs => {
        const testContainer = document.getElementById('test-container');
        
        // Rastgele bir fiil seç
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        
        // Soruyu hazırla
        const question = `Aşağıdaki fiilin 3. şahıs zamiri nedir?<br><br>
                          Fiil: ${randomVerb.infinitive}`;
        
        // Şık seçeneklerini hazırla
        const options = [
            randomVerb.person1,
            randomVerb.person2,
            randomVerb.person3
        ];

        // Şıkları karıştır
        options.sort(() => Math.random() - 0.5);

        // Soruyu ve şıkları ekrana yazdır
        testContainer.innerHTML = `<p>${question}</p>`;
        options.forEach((option, index) => {
            testContainer.innerHTML += `<button onclick="checkAnswer('${option}', '${randomVerb.person3}')">${option}</button>`;
        });
    });
}

// Kullanıcının cevabını kontrol et
function checkAnswer(selectedOption, correctAnswer) {
    const resultContainer = document.getElementById('result-container');

    // Cevabı kontrol et ve sonucu ekrana yazdır
    if (selectedOption === correctAnswer) {
        resultContainer.innerHTML = '<p>Doğru! Tebrikler!</p>';
    } else {
        resultContainer.innerHTML = `<p>Üzgünüm, doğru cevap: ${correctAnswer}</p>`;
    }

    // Yeni bir test başlat
    startTest();
}

// Sayfa yüklendiğinde testi başlat
document.addEventListener('DOMContentLoaded', startTest);
