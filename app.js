// Тоглоомын бүх газарт ашиглагдах глобаль хувьсагчдыг энд зарлая

// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;

// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална.
var activePlayer;

// 2 тоглогчийн цуглуулсан оноонууд
var scores;

// Идэвхитэй тоглогчийн цуглуулж байгаа ээлжийн оноо 
var roundScore;

// Шооны зургийг үзүүлэх элементийг DOM-с хайж олоод энд хадгалья
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүлнэ
initGame();

// Тоглоомыг шинээр эхлэхэд бэлтгэнэ
function initGame() {
    // Тоглоом эхэллээ гэдэг төлөвт оруулна.
    isNewGame = true;

    // Тоглогчийн ээлжийг хадгалах хувьсагч, 1-р тоглогчийг 0, 2-р тоглогчийг 1 гэж тэмдэглэе
    activePlayer = 0;

    // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
    scores = [0, 0];

    // Яг идэвхитэй тоглогчын ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;

    // Программ эхлэхэд бэлтгэе
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-0").textContent = 0;

    // Тоглогчдын нэрийг буцааж гаргах 
    // хэрэв winner болсоны дараа шинэ тоглоом эхлүүлэхэд winner гэсэн нэрийг нь Player 1 болгоно.
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    // Тоглоом дууссан ч гэсэн шинээр эхлэхэд улаан өнгөтэй class ийг авч хаях
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    // NEWGAME товчийг дарахад 1,2-р panel-с асtive class -г авч алга болгоно. 
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    // NEWGAME товчийг дарахад эхний тоглогч дээр Active class аа нэмнэ.
    document.querySelector(".player-0-panel").classList.add("active");


    diceDom.style.display = "none"; // Шоог вэбээс харагдахгүй болгох
};

// Шоог шидэх эвент листенер---------------------------------------------------------------------------------------------------
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (isNewGame === true) {
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
    } else {
        alert("Тоглоом дууссан байна NEW GAME товчийг дарж шинээр эхлэнэ үү");
    };
});


// HOLD товчны эвент листенер -------------------------------------------------------------------------------------------------
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (isNewGame === true) {
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
        if (scores[activePlayer] >= 100) {
            // Тоглоомыг дууссан төлөвт оруулна
            isNewGame = false; // ялагч боллоо гэхэд шинэ тоглоом нь худлаа болоод дууссан гэсэн үг 
            // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана 
            document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        } else {
            // Толглогчийн ээлжийг солино. 
            switchToNextPlayer();
        }
    } else {
        alert("Тоглоом дууссан байна NEW GAME товчийг дарж шинээр эхлэнэ үү");
    }

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

// NEW GAME буюу Шинэ тоглоом эхлүүлэх товчний эвент листенер----------------------------------------------
document.querySelector(".btn-new").addEventListener("click", initGame);
