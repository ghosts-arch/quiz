<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  const { data, form }: PageProps = $props();

  let questions = $state(data.quiz.questions);
  // console.log(data.quiz.questions);
</script>

<a href="/">Retour</a>

<h1>{data.quiz?.name}</h1>

<form method="POST">
  <label for="question_label"
    >Question : <input type="text" name="question_label" /></label
  >
  <label for="answer_label"
    >Réponse : <input type="text" name="answer_label" /></label
  >
  <button type="submit">Ajouter</button>
</form>

<table>
  <thead>
    <tr>
      <th>Question</th>
      <th>Reponse</th>
    </tr>
  </thead>
  <tbody>
    {#each data?.quiz?.questions! as question}
      <tr>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td>
          <button>Editer</button>
          <button>Supprimer</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
