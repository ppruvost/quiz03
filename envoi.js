// =============================
// Initialisation EmailJS (version recommandée pour iPhone/Safari)
// =============================
(function () {
  emailjs.init({
    publicKey: "TJHX0tkW1CCz7lv7a",
    blockHeadless: true
  });
})();

// Sauvegarde de la fonction endQuiz originale
const oldEndQuiz = endQuiz;

// Verrou anti-double-envoi
let sendingInProgress = false;

// =============================
// Fin du quiz + Envoi EmailJS + Confettis + Jingle
// =============================
endQuiz = async function () {
  // Exécution normale
  oldEndQuiz();

  // Lecture du jingle
  const sound = document.getElementById("victorySound");
  if (sound) {
    try {
      await sound.play();
    } catch (e) {
      console.warn("Lecture audio bloquée par Safari :", e);
    }
  }

  // Confettis
  try {
    confetti({
      particleCount: 200,
      spread: 120,
      startVelocity: 45,
      origin: { y: 0.6 }
    });
  } catch (e) {
    console.warn("Confettis non compatibles :", e);
  }

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
    email: "lyceepro.mermoz@gmail.com"
  };

  // Empêche plusieurs envois
  if (sendingInProgress) {
    alert("L’envoi est déjà en cours…");
    return;
  }
  sendingInProgress = true;

  // Timeout Safari obligatoire si status = 0
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject({ status: 0, text: "Timeout iPhone" }), 15000)
  );

  try {
    await Promise.race([
      emailjs.send("service_cgh817y", "template_ly7s41e", emailParams),
      timeout
    ]);

    alert("✅ Résultats envoyés automatiquement par e-mail à votre professeur. Merci !");
  } catch (error) {
    console.error("❌ Erreur EmailJS / Safari :", error);

    let msg = "";

    if (error?.status === 0) {
      msg = "Safari n’a pas pu contacter le serveur (status 0). "
          + "Vérifiez que vous avez du réseau et réessayez.";
    } else {
      msg = JSON.stringify(error);
    }

    alert("Une erreur est survenue lors de l'envoi : " + msg);
  }

  sendingInProgress = false;
};
