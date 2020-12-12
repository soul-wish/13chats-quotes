<script>
  import { database } from './firebase';
  import { isModalVisible, currentQuoteIndex, quotes } from './stores.js';
  let quote = '';
  let author = '';

  function addQuote() {
    database.ref('quotes').push(
      {
        quote,
        author,
        timestamp: Date.now(),
      },
      (error) => {
        if (error) {
          return alert('Opps 🤷‍♂️');
        }
        isModalVisible.set(false);
        currentQuoteIndex.set($quotes.length - 1);
      }
    );
  }
</script>

<form class="bg-white p-5 space-y-4" on:submit|preventDefault={addQuote}>
  <div>
    <textarea
      id="quote"
      name="quote"
      required
      rows="3"
      class="appearance-none block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
      placeholder="Quote text"
      bind:value={quote} />
  </div>
  <div>
    <input
      id="author"
      name="author"
      required
      class="appearance-none block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
      placeholder="Quote author"
      bind:value={author} />
  </div>
  <button
    type="submit"
    class="w-full p-2 border-none font-medium rounded-md text-white bg-green-500 hover:bg-green-600">
    Add Quote
  </button>
</form>
