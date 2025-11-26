// =============================
// Initialisation EmailJS
// =============================
(function () {
  emailjs.init("TJHX0tkW1CCz7lv7a"); // clé publique fournie
})();

// Sauvegarde de la fonction endQuiz originale (définie dans questions.js)
const oldEndQuiz = endQuiz;

// =============================
// Fin du quiz + Envoi EmailJS + Confettis + Jingle
// =============================
endQuiz = function () {
  // Exécution normale
  oldEndQuiz();

  // Lecture du jingle
  const sound = document.getElementById("victorySound");
  if (sound) sound.play();

  // Confettis
  confetti({
    particleCount: 200,
    spread: 120,
    startVelocity: 45,
    origin: { y: 0.6 }
  });

  // Score final
  const scoreFinal = `${score} / ${shuffledQuestions.length}`;

  // Préparation du résumé
  let recap = "";
  shuffledQuestions.forEach((q, i) => {
    recap += `Q${i + 1}: ${q.question}\n`;
    recap += `Réponse élève : ${q.userAnswer || "Aucune"}\n`;
    recap += `Bonne réponse : ${q.bonne_reponse}\n\n`;
  });

  // Paramètres EmailJS
  const emailParams = {
    nom: user.nom,
    prenom: user.prenom,
    score: scoreFinal,
    details: recap,
    email: "lyceepro.mermoz@gmail.com" // adresse professeur
  };

  // Envoi
  emailjs
    .send("service_cgh817y", "template_ly7s41e", emailParams)
    .then(() => {
      alert("✅ Résultats envoyés automatiquement par e-mail à votre professeur. Merci !");
    })
    .catch((error) => {
      console.error("❌ Erreur EmailJS :", error);
      alert("Une erreur est survenue lors de l'envoi : " + JSON.stringify(error));
    });
};

