<script>
  import { onMount } from 'svelte';
  import { database } from './firebase.js';
  import { currentQuoteIndex, quotes } from './stores.js';

  onMount(() => {
    database.ref('quotes/').on('value', (snapshot) => {
      quotes.set(Object.values(snapshot.val()));
    });
  });

  function changeQuote(indexOffset) {
    const newQuoteIndex = $currentQuoteIndex + indexOffset;
    if (newQuoteIndex === -1) {
      return currentQuoteIndex.set($quotes.length - 1);
    }
    if (newQuoteIndex === $quotes.length) {
      return currentQuoteIndex.set(0);
    }
    return currentQuoteIndex.set(newQuoteIndex);
  }
</script>

<main class="flex-1 flex flex-col items-center justify-center relative p-8 pb-12">
  {#if $quotes.length}
    <pre class="text-4xl sm:px-12 whitespace-pre-wrap">{$quotes[$currentQuoteIndex].quote}</pre>
    <div class="w-full text-right sm:px-12 pt-4 text-yellow-500 text-lg">
      &copy;
      {$quotes[$currentQuoteIndex].author}
    </div>
    <div
      class="buttons text-2xl absolute bottom-5 right-5 flex items-center justify-between w-16 sm:w-full sm:px-8 sm:bottom-auto sm:right-auto">
      <button
        type="button"
        class="border-none transition transform hover:scale-110 focus:outline-none"
        on:click={() => changeQuote(-1)}>←</button>
      <button
        type="button"
        class="border-none transition transform hover:scale-110 focus:outline-none"
        on:click={() => changeQuote(1)}>→</button>
    </div>
  {/if}
</main>
