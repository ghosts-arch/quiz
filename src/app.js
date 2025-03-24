import { createInterface } from "node:readline/promises";
import { initDatabase } from "./database/database.js";
import { SessionStatistiques } from "./database/models/session_statistiques.js";

const regionsQuiz = [
  {
    question: "question 1 about regions",
    answer: "answer 1 about regions",
  },
  {
    question: "question 2 about regions",
    answer: "answer 2 about regions",
  },
  {
    question: "question 3 about regions",
    answer: "answer 3 about regions",
  },
  {
    question: "question 4 about regions",
    answer: "answer 4 about regions",
  },
  {
    question: "question 5 about regions",
    answer: "answer 5 about regions",
  },
  {
    question: "question 6 about regions",
    answer: "answer 6 about regions",
  },
  {
    question: "question 7 about regions",
    answer: "answer 7 about regions",
  },
];

const charactersQuiz = [
  {
    question: "question 1 about characters",
    answer: "answer 1 about characters",
  },
  {
    question: "question 2 about characters",
    answer: "answer 2 about characters",
  },
  {
    question: "question 3 about characters",
    answer: "answer 3 about characters",
  },
  {
    question: "question 4 about characters",
    answer: "answer 4 about characters",
  },
  {
    question: "question 5 about characters",
    answer: "answer 5 about characters",
  },
  {
    question: "question 6 about characters",
    answer: "answer 6 about characters",
  },
  {
    question: "question 7 about characters",
    answer: "answer 7 about characters",
  },
];

const weaponsQuiz = [
  {
    question: "question 1 about weapons",
    answer: "answer 1 about weapons",
  },
  {
    question: "question 2 about weapons",
    answer: "answer 2 about weapons",
  },
  {
    question: "question 3 about weapons",
    answer: "answer 3 about weapons",
  },
  {
    question: "question 4 about weapons",
    answer: "answer 4 about weapons",
  },
  {
    question: "question 5 about weapons",
    answer: "answer 5 about weapons",
  },
  {
    question: "question 6 about weapons",
    answer: "answer 6 about weapons",
  },
  {
    question: "question 7 about weapons",
    answer: "answer 7 about weapons",
  },
];

initDatabase();
const input = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const runQuiz = async (quizName, questions, file) => {
  const userInputs = [];
  let score = 0;
  const start = Date.now();
  for (const question of questions) {
    console.log(question.question);
    const answer = await input.question("Votre réponse : ");
    if (answer.toLowerCase().trim() === question.answer.toLowerCase().trim()) {
      score += 1;
    }
    userInputs.push(answer);
  }
  const end = Date.now();
  console.log(`You completed the ${quizName}'s quiz !`);
  console.log(
    `Duration : ${Math.floor((end - start) / 60000)} minutes ${Math.floor(
      ((end - start) % 60000) / 1000
    )} seconds`
  );
  console.log(`Your score : ${score}/${questions.length}`);
  console.log("----- Correction -----");
  for (let i = 0; i < questions.length; i++) {
    console.log(`\nQuestion ${i + 1} : ${questions[i].question}`);
    console.log(`Correct answer : ${questions[i].answer}`);
    console.log(`Your answer : ${userInputs[i]}\n`);
  }
  // await writeFile(file, userInputs.join("\n"));
  await SessionStatistiques.create({
    quizName,
    score,
    total_questions: questions.length,
    duration: end - start,
  });
};

while (true) {
  console.log(
    "Quel quiz voulez-vous faire ?\n\t1. quiz 1\n\t2. quiz 2\n\t3. quiz 3\n\t4. quitter"
  );
  const choice = await input.question("Votre choix : ");
  switch (choice) {
    case "1":
      await runQuiz("regions", regionsQuiz, "regionsQuiz.txt");
      break;
    case "2":
      await runQuiz("characters", charactersQuiz, "charactersQuiz.txt");
      break;
    case "3":
      await runQuiz("weapons", weaponsQuiz, "weaponsQuiz.txt");
      break;
    case "4":
      console.log("Goodbye!");
      process.exit(0);
    default:
      console.log("Choix invalide");
  }
}
