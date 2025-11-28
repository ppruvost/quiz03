// quiz.js

// =============================
// GESTION DE SESSION POUR RECOMMENCER LE QUIZ
// =============================

window.addEventListener("load", () => {
    if (sessionStorage.getItem("quizStarted")) {
        // L'utilisateur est revenu alors qu'une session existait → reset complet
        resetQuizSession();
    }

    // Marque que le quiz est lancé dans cet onglet
    sessionStorage.setItem("quizStarted", "true");
});

// Réinitialisation complète du quiz
function resetQuizSession() {
    sessionStorage.removeItem("quizStarted");
    sessionStorage.removeItem("currentQuestion");
    sessionStorage.removeItem("score");
    sessionStorage.removeItem("shuffledQuestions");

    // Retour page d’accueil du quiz
    window.location.href = "index.html";
}
// =============================
// SYSTEME ANTI-TRICHE RENFORCÉ
// =============================

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        resetQuizSession();
    }
});

window.addEventListener("blur", () => {
    resetQuizSession();
});

document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
        resetQuizSession();
    }
});

// Plein écran
function goFullScreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
}

/* ============================================================
============== MUSIQUE DE FOND (STYLE KAHOOT) =================
============================================================ */

function startMusic() {
    const audio = document.getElementById("bgMusic");
    
    // Définir le volume et lancer la musique si le navigateur le permet
    audio.volume = 0.4;
    
    // Enlever le mute (pour permettre l'écoute une fois la page chargée)
    audio.muted = false;
    
    // Essayer de jouer la musique dès que possible
    audio.play().catch((error) => {
        console.log("Lecture automatique échouée, mais la musique est prête.");
    });
}

function stopMusic() {
    const audio = document.getElementById("bgMusic");
    audio.pause();
    audio.currentTime = 0;
}

/* ============================================================
============== VARIABLE GLOBALES ==============================
============================================================ */

let user = { nom: "", prenom: "" };
let current = 0;
let score = 0;
let shuffledQuestions = [];

// Mélange de tableaux
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Mélange questions + réponses
function shuffleQuestions() {
    return questions.map((q) => ({
        ...q,
        options: shuffleArray(q.options)
    }));
}

// Affichage d'une question
function showQuestion() {
    const question = shuffledQuestions[current];
    let optionsHTML = question.options.map((option, index) => {
        const inputId = `q${current}_opt${index}`;
        return `
            <div class="option-container">
                <input type="radio" id="${inputId}" name="q${current}" value="${option}">
                <label for="${inputId}">${option}</label>
            </div>
        `;
    }).join('');

    document.getElementById("quiz").innerHTML = `
        <h2>${question.question}</h2>
        ${optionsHTML}
        <button class="validate" onclick="validateAnswer()">Valider</button>
        <div id="explication"></div>
    `;
}

// Validation de la réponse
function validateAnswer() {
    const selected = document.querySelector(`input[name="q${current}"]:checked`);
    if (!selected) {
        document.getElementById("explication").innerHTML = "Veuillez sélectionner une réponse.";
        return;
    }

    const q = shuffledQuestions[current];
    const userAnswer = selected.value;
    const label = selected.nextElementSibling;

    label.classList.add("answer-selected");

    setTimeout(() => {
        if (userAnswer === q.bonne_reponse) {
            score++;
            label.classList.add("answer-correct");
            document.getElementById("explication").innerHTML =
                `<span class='success'>Bonne réponse !</span> ${q.explication}`;
        } else {
            label.classList.add("answer-wrong");
            document.getElementById("explication").innerHTML =
                `<span class='fail'>Mauvaise réponse.</span> ${q.explication}`;

            document.querySelectorAll(`input[name="q${current}"]`).forEach((input) => {
                if (input.value === q.bonne_reponse) {
                    input.nextElementSibling.classList.add("answer-correct-auto");
                }
            });
        }

        document.getElementById("score").innerText =
            `Score actuel : ${score} / ${shuffledQuestions.length}`;

        current++;

        if (current < shuffledQuestions.length) {
            setTimeout(showQuestion, 2500);
        } else {
            setTimeout(endQuiz, 2500);
        }
    }, 300);
}

// Fin du quiz
function endQuiz() {
    document.getElementById("quiz").innerHTML = `
        <h2>Quiz terminé !</h2>
        <p>Score final : ${score} / ${shuffledQuestions.length}</p>`;
}

// Lancement du quiz
document.getElementById("startQuiz").addEventListener("click", () => {
    startMusic(); // <-- la musique démarre au moment où l'utilisateur clique
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();

    if (!nom || !prenom) {
        alert("Merci de renseigner votre nom et prénom avant de commencer.");
        return;
    }

    user.nom = nom;
    user.prenom = prenom;

    shuffledQuestions = shuffleQuestions();  
    current = 0;
    score = 0;

    document.getElementById("userForm").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    showQuestion();
});
