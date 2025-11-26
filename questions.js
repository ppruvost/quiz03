// =============================
// Variables globales
// =============================
let user = { nom: "", prenom: "" };
let current = 0;
let score = 0;
let shuffledQuestions = [];

// =============================
// Mélange d'un tableau
// =============================
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// =============================
// Mélange des questions + réponses
// =============================
function shuffleQuestions() {
    return questions.map((q) => ({
        ...q,
        options: shuffleArray(q.options)
    }));
}

// =============================
// LISTE DES QUESTIONS
// =============================
const questions = [
  { 
    question: "1. La vitesse linéaire en usinage (Vc) dépend de :", 
    options: ["N uniquement", "D uniquement", "D et N", "fz et Z"], 
    bonne_reponse: "D et N", 
    explication: "Vc = π × D × N / 1000 : elle dépend du diamètre et de la vitesse de rotation." 
  },

  { 
    question: "2. La relation correcte entre la vitesse linéaire Vc, le diamètre D et la fréquence de rotation N est :", 
    options: ["Vc = D / N", "Vc = π × D × N / 1000", "Vc = N / (π × D)", "Vc = D × 1000 / N"], 
    bonne_reponse: "Vc = π × D × N / 1000", 
    explication: "C’est la formule fondamentale utilisée en usinage." 
  },

  { 
    question: "3. Si le diamètre de l'outil augmente pour une même vitesse de rotation N, la vitesse de coupe Vc doit :", 
    options: ["Augmenter", "Rester identique", "Diminuer", "Devenir nulle"], 
    bonne_reponse: "Diminuer", 
    explication: "Un grand diamètre génère naturellement plus de vitesse linéaire." 
  },

  { 
    question: "4. La fréquence de rotation f en Hz est :", 
    options: ["N × 60", "N / 60", "N × 2π", "1/N"], 
    bonne_reponse: "N / 60", 
    explication: "1 Hz = 1 tour par seconde : f = N(tr/min)/60." 
  },

  { 
    question: "5. La relation entre ω et f est :", 
    options: ["ω = f", "ω = f/2π", "ω = 2πf", "ω = f × 60"], 
    bonne_reponse: "ω = 2πf", 
    explication: "Un tour = 2π radians." 
  },

  { 
    question: "6. La vitesse linéaire v d’un point en mouvement circulaire est :", 
    options: ["v = ω × r", "v = ω / r", "v = r / ω", "v = 2πr / ω"], 
    bonne_reponse: "v = ω × r", 
    explication: "Relation fondamentale du mouvement circulaire." 
  },

  { 
    question: "7. Une broche tourne à 1800 tr/min. La fréquence vaut :", 
    options: ["15 Hz", "20 Hz", "30 Hz", "60 Hz"], 
    bonne_reponse: "30 Hz", 
    explication: "f = 1800/60 = 30 Hz." 
  },

  { 
    question: "8. En atelier, augmenter trop fortement N pour un outil ou un matériau non adapté provoque :", 
    options: ["Un meilleur état de surface", "Un échauffement et une casse outil", "Un enlèvement de matière plus doux", "Aucun effet"], 
    bonne_reponse: "Un échauffement et une casse outil", 
    explication: "La Vc devient trop élevée, l’outil brûle ou se casse." 
  },

  { 
    question: "9. Convertir 240 tr/min en Hz :", 
    options: ["2 Hz", "4 Hz", "6 Hz", "8 Hz"], 
    bonne_reponse: "4 Hz", 
    explication: "240/60 = 4 Hz." 
  },

  { 
    question: "10. Une fz trop faible combinée à une grande vitesse de rotation entraîne :", 
    options: ["Une coupe franche", "Un frottement au lieu d’une coupe", "Une vibration atténuée", "Un enlèvement de copeaux optimal"], 
    bonne_reponse: "Un frottement au lieu d’une coupe", 
    explication: "fz trop faible = la dent glisse, chauffe et use l’outil." 
  },

  { 
    question: "11. Si N est trop faible pour un petit diamètre d’outil, on observe :", 
    options: ["Une coupe trop agressive", "Une absence de coupe (frottement, bruit)", "Un arrachement du porte-outil", "Une vitesse de coupe excessive"], 
    bonne_reponse: "Une absence de coupe (frottement, bruit)", 
    explication: "Petit D = il faut une grande vitesse angulaire." 
  },

  { 
    question: "12. Quelle grandeur augmente si on augmente f ?", 
    options: ["La vitesse linéaire Vc", "Le diamètre", "La période T", "La masse de la pièce"], 
    bonne_reponse: "La vitesse linéaire Vc", 
    explication: "Vc ∝ N donc ∝ f." 
  },

  { 
    question: "13. Mise en sécurité : avant de modifier N sur la machine, il faut :", 
    options: ["Rotation max", "Arrêter la broche", "Approcher l’outil", "Serrer l’étau"], 
    bonne_reponse: "Arrêter la broche", 
    explication: "Changer N en rotation est dangereux." 
  },

  { 
    question: "14. Une roue de 100 mm à 600 tr/min. Vc vaut :", 
    options: ["3 m/min", "60 m/min", "188 m/min", "600 m/min"], 
    bonne_reponse: "188 m/min", 
    explication: "Vc = π×0.1×600 ≈ 188 m/min." 
  },

  { 
    question: "15. Si T = 0,1 s, f vaut :", 
    options: ["2 Hz", "5 Hz", "10 Hz", "20 Hz"], 
    bonne_reponse: "10 Hz", 
    explication: "f = 1/T." 
  },

  { 
    question: "16. Unité de ω ?", 
    options: ["m/s", "tr/min", "rad/s", "Hz"], 
    bonne_reponse: "rad/s", 
    explication: "ω en radians par seconde." 
  },

  { 
    question: "17. Diminuer trop N pour un grand D entraîne :", 
    options: ["Vc trop faible", "Vc trop élevée", "Coupe agressive", "Instabilité"], 
    bonne_reponse: "Vc trop faible", 
    explication: "La pièce ne coupe plus." 
  },

  { 
    question: "18. Fraise D=10 mm, Vc=80 m/min → N ?", 
    options: ["200 tr/min", "800 tr/min", "1600 tr/min", "2500 tr/min"], 
    bonne_reponse: "2500 tr/min", 
    explication: "≈2546 tr/min." 
  },

  { 
    question: "19. Relier N et ω :", 
    options: ["ω = 2π × (N/60)", "ω = N×60", "ω = πN", "ω = N/(2π)"], 
    bonne_reponse: "ω = 2π × (N/60)", 
    explication: "Tours/min → tours/s → radians." 
  },

  { 
    question: "20. Une Vc trop faible entraîne :", 
    options: ["Échauffement important", "Casse outil immédiate", "Mauvais état de surface", "Coupe impossible"], 
    bonne_reponse: "Mauvais état de surface", 
    explication: "Copeaux mal formés." 
  }
];

// =============================
// AFFICHAGE D'UNE QUESTION
// =============================
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

// =============================
// VALIDATION
// =============================
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

// =============================
// FIN DU QUIZ
// =============================
function endQuiz() {
    document.getElementById("quiz").innerHTML = `
        <h2>Quiz terminé !</h2>
        <p>Score final : ${score} / ${shuffledQuestions.length}</p>`;
}

// =============================
// LANCEMENT DU QUIZ
// =============================
document.getElementById("startQuiz").addEventListener("click", () => {
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
