<script lang="ts">
  import type { SessionStatistiques } from "$lib/server/database/models/session_statistiques";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
  let currentQuestion = $state(0);
  let userInputs: string[] = $state([]);
  let currentUserInput: string = $state("");
  let score = $state(0);
  let start = $state(Date.now());
  let end: number = $state(0);
  let isFinished = $state(false);
  let sessions: SessionStatistiques[] = $state([]);

  const isLastQuestion = (): boolean => {
    return currentQuestion + 1 == data.quiz.length;
  };
  const saveCurrentSession = async () => {
    const response = await fetch("/api/sessions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizName: data.quizName,
        totalQuestions: data.quiz.length,
        score: score,
        duration: end - start,
      }),
    });
    console.log(await response.json());
  };
  const getLastSessions = async () => {
    const response = await fetch("/api/sessions/last", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.sessions);
    return data;
  };
  const validateUserAnswer = async (): Promise<void> => {
    if (currentUserInput === data.quiz[currentQuestion].answer) {
      score += 1;
    }
    userInputs.push(currentUserInput);
    currentUserInput = "";
    if (isLastQuestion()) {
      isFinished = true;
      end = Date.now();
      saveCurrentSession();
      sessions = await getLastSessions();
    } else {
      currentQuestion += 1;
    }
  };
</script>

<a href="/">Retour</a>

<h1>Quiz {data.quizName}</h1>
{#if !isFinished}
  <h2>{data.quiz[currentQuestion].question}</h2>
  <input type="text" bind:value={currentUserInput} />
  <button onclick={validateUserAnswer}>Next</button>
{:else}
  <h1>You completed the {data.quizName}'s quiz !</h1>
  <h2>Your score is {score}/{data.quiz.length}</h2>
  <p>
    Duration : {Math.floor((end - start) / 60000)} minutes {Math.floor(
      ((end - start) % 60000) / 1000
    )} seconds
  </p>
  {#each data.quiz as question, index}
    <p>Question {index + 1} : {question.question}</p>
    {#if userInputs[index] === question.answer}
      <p>Your answer : {userInputs[index]} (correct)</p>
    {:else}
      <p>
        Your answer : {userInputs[index]} (incorrect, the correct answer is : {question.answer})
      </p>
    {/if}
  {/each}
  <h2>Dernières sessions</h2>
  {#each sessions as session}
    {session.quizName}
    {session.score}
    {session.totalQuestions}
    {session.duration}
  {/each}
{/if}
