// Тоглогчийн ээлжийг хадгалах хувьсагч, 1-р тоглогчийг 0, 2-р тоглогчийг 1 гэж тэмдэглэе
var activePlayer = 0;

// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0];

// Яг идэвхитэй тоглогчын ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore = 0;


// Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө. 
var diceNumber = Math.floor(Math.random() * 6) + 1

// <div class="player-score" id="score-0">43</div>

// window.document.querySelector("#score-0").textContent = dice;

// document.querySelector("#score-1").innerHTML = "<em>YES!<em>";

// Программ эхлэхэд бэлтгэе

document.getElementById("score-0").textContent = 0;
document.getElementById("score-1").textContent = 0;
document.getElementById("current-0").textContent = 0;
document.getElementById("current-0").textContent = 0;

var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";


// Шоог шидэх эвент листенер---------------------------------------------------------------------------------------------------
document.querySelector(".btn-roll").addEventListener("click", function () {
    // 1-6 доторхи санамсаргүй нэг тоо гаргаж авна
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    // Шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.style.display = "block";
    // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ 
    diceDom.src = "dice-" + diceNumber + ".png";
    // Шооны буусан тоо нь 1-с ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог өөрчилнө
    if (diceNumber !== 1) {
        // 1-c ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө. 
        roundScore = roundScore + diceNumber;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    } else {
        // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
        // Энэ тоглогчийн ээлжийндээ цуглуулсан оноог 0 болгоно. 
        switchToNextPlayer();
    }
});


// HOLD товчны эвент листенер -------------------------------------------------------------------------------------------------

document.querySelector(".btn-hold").addEventListener("click", function () {
    // Уг тоглогчийн цуглуулсан ээлжийн оноог глобаль оноон дээр нь нэмж өгнө.

    // if (activePlayer === 0) {
    //     scores[0] = scores[0] + roundScore;
    // } else {
    //     scores[1] = scores[1] + roundScore;
    // }

    scores[activePlayer] = scores[activePlayer] + roundScore;

    // Дэлгэц дээр оноог нь харуулна 
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг шалгах (оноо нь 100-с их эсэх)
    if (scores[activePlayer] >= 20) {
        // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана 
        document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    } else {
        // Толглогчийн ээлжийг солино. 
        switchToNextPlayer();
    }

    // Ээлжийн оноог нь 0 болгоно
    // roundScore = 0;
    // document.getElementById("current-" + activePlayer).textContent = "0";



});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг. ------------------------------------------------------------
function switchToNextPlayer() {
    // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
    // Энэ тоглогчийн ээлжийндээ цуглуулсан оноог 0 болгоно. 
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;

    // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ 
    // Хэрэв идэвхитэй тоглогч нь 0 байвал идэвхитэй тоглогчийг 1 болго.
    // Үгүй бол идэвхитэй тоглогчийг 0 болго.
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    // Улаан цэгийг шилжүүлэх 
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // 1 буусан учир нөгөө тоглогчруу шилжихэд шоог түр алга болно. 
    diceDom.style.display = "none";
};

// Шинэ тоглоом эхлүүлэх товчний эвент листенер
document.querySelector(".btn-new").addEventListener("click", function () {
    alert("clicked")
});