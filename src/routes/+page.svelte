<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<h1>Quel quiz voulez vous faire ?</h1>
<ol>
  {#each data.quizs as quiz}
    <li><a href="/quiz/{quiz.id}">{quiz.name}</a></li>{/each}
</ol>

<a href="/quizs/create">Créer un quiz</a>
