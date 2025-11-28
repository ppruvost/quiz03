/* ============================================================
   ====================  LISTE DES QUESTIONS  ==================
   ============================================================ */

const questions = [
  { 
    question: "1. Coût de production : C(x) = x³ − 3x² + 2x + 50. Quelle est la dérivée C'(x) ?", 
    options: ["3x² − 6x + 2", "x² − 6x + 2", "3x² − 3x + 2", "3x² − 6x"], 
    bonne_reponse: "3x² − 6x + 2", 
    explication: "On dérive terme par terme : (x³)'=3x², (−3x²)'=−6x, (2x)'=2, la constante disparaît." 
  },

  { 
    question: "2. Satisfaction client : S(x) = −x³ + 6x² − 9x + 80. Calculer S'(2).", 
    options: ["−3", "3", "6", "0"], 
    bonne_reponse: "3", 
    explication: "S'(x)=−3x² + 12x − 9. Pour x=2 : −12 + 24 − 9 = 3." 
  },

  { 
    question: "3. Production journalière : P(x) = 2x³ − 9x² + 12x + 200. Que vaut P'(1) ?", 
    options: ["0", "5", "−2", "3"], 
    bonne_reponse: "0", 
    explication: "P'(x)=6x² − 18x + 12. Pour x=1 : 6 − 18 + 12 = 0." 
  },

  { 
    question: "4. Flux logistique : F(x) = −2x³ + 12x² − 18x + 100. Solutions de F'(x)=0 ?", 
    options: ["x=1 et x=3", "x=−1 et x=2", "x=2 et x=4", "x=0 et x=3"], 
    bonne_reponse: "x=1 et x=3", 
    explication: "F'(x)=−6(x−1)(x−3). Les racines sont x=1 et x=3." 
  },

  { 
    question: "5. Temps de traitement : T(x)=x³ + 3x² − 9x + 20. Calculer T'(1).", 
    options: ["−1","0","1","3"], 
    bonne_reponse: "0", 
    explication: "T'(x)=3x² + 6x − 9 → T'(1)=3+6−9=0." 
  },

  { 
    question: "6. Recette : R(x)=x³ − x² − x + 50. Que vaut R'(1) ?", 
    options: ["1","0","−1","2"], 
    bonne_reponse: "0", 
    explication: "R'(x)=3x² − 2x − 1 → R'(1)=3−2−1=0." 
  },

  { 
    question: "7. Satisfaction : S(x)=−x³ + 3x² + x + 60. Calculer S'(3).", 
    options: ["−8","8","0","5"], 
    bonne_reponse: "−8", 
    explication: "S'(3)=−27+18+1=−8." 
  },

  { 
    question: "8. Stock : I(x)=x³ − 6x² + 11x + 30. Calculer I'(2).", 
    options: ["−1","1","0","2"], 
    bonne_reponse: "−1", 
    explication: "I'(2)=12−24+11=−1." 
  },

  { 
    question: "9. Contrôle qualité : Q(x)=2x³ − 3x² − 12x + 40. Racines de Q'(x) ?", 
    options: ["x=−1 et x=2","x=1 et x=3","x=−2 et x=1","x=2 seulement"], 
    bonne_reponse: "x=−1 et x=2", 
    explication: "Q'(x)=6(x−2)(x+1)." 
  },

  { 
    question: "10. Organisation RH : W(x)=−x³ + 9x² − 24x + 30. Où la fonction décroît-elle ?", 
    options: ["[0;2[ et ]4;6]","[2;4]","[0;6]","]2;4["], 
    bonne_reponse: "[0;2[ et ]4;6]", 
    explication: "W'(x)=−3(x−2)(x−4) négative avant 2 et après 4." 
  },

  { 
    question: "11. Dossier client : f(x)=x³ − 4x² + 4x + 10. Points critiques ?", 
    options: ["x=2 et x=2/3","x=−1 et x=3","x=1 et x=4","x=0 et x=2"], 
    bonne_reponse: "x=2 et x=2/3", 
    explication: "Δ=16 → racines 2 et 2/3." 
  },

  { 
    question: "12. Temps machine : T(x)=2x³ − 12x² + 18x + 5. Solutions de T'(x)=0 ?", 
    options: ["x=1 et x=3","x=2 et x=4","x=0 et x=2","x=−1 et x=3"], 
    bonne_reponse: "x=1 et x=3", 
    explication: "T'(x)=6(x−1)(x−3)." 
  },

  { 
    question: "13. Satisfaction : S(x)=−x³ + 4x² + x + 20. Calculer S'(2).", 
    options: ["5","−5","0","3"], 
    bonne_reponse: "5", 
    explication: "S'(2)=−12+16+1=5." 
  },

  { 
    question: "14. Coût marginal : PC(x)=x³ − 2x² − x + 10. Calculer PC'(3).", 
    options: ["14","10","0","8"], 
    bonne_reponse: "14", 
    explication: "PC'(3)=27−12−1=14." 
  },

  { 
    question: "15. Stock critique : I(x)=−2x³ + 9x² − 1x + 50. Calculer I'(1).", 
    options: ["11","−11","0","5"], 
    bonne_reponse: "11", 
    explication: "I'(1)=−6+18−1=11." 
  },

  { 
    question: "16. Flux logistique : F(x)=x³ − 9x² + 24x + 10. F'(x) ?", 
    options: ["3x² − 18x + 24","x² − 18x + 24","3x² − 9x + 24","3x² − 18x + 10"], 
    bonne_reponse: "3x² − 18x + 24", 
    explication: "Dérivation terme par terme." 
  },

  { 
    question: "17. Contrôle qualité : C(x)=−x³ + 3x² + 9x + 40. C'(3) ?", 
    options: ["0","9","−9","3"], 
    bonne_reponse: "0", 
    explication: "C'(3)=−27+18+9=0." 
  },

  { 
    question: "18. Livraison : D(x)=2x³ − 15x² + 36x + 5. Racines de D'(x) ?", 
    options: ["x=2 et x=3","x=1 et x=4","x=−1 et x=3","x=0 et x=6"], 
    bonne_reponse: "x=2 et x=3", 
    explication: "D'(x)=6(x−2)(x−3)." 
  },

  { 
    question: "19. Efficience : E(x)=−x³ + 6x² − 9x + 15. Calculer E'(2).", 
    options: ["3","−3","0","6"], 
    bonne_reponse: "3", 
    explication: "E'(2)=−12+24−9=3." 
  },

  { 
    question: "20. Modélisation : M(x)=x³ − x² + 4x + 8. M'(x) ?", 
    options: ["3x² − 2x + 4","x² − 2x + 4","3x² − x + 4","3x² − 2x"], 
    bonne_reponse: "3x² − 2x + 4", 
    explication: "Dérivée : 3x² − 2x + 4." 
  }
];


/* ============================================================
   =================== FIN DES QUESTIONS ================
   ============================================================ */
