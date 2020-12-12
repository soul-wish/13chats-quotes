<script>
  import Header from './Header.svelte';
  import Quotes from './Quotes.svelte';
  import Footer from './Footer.svelte';
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  html,
  body {
    padding: 0;
    height: 100%;
  }
</style>

<div class="flex flex-col min-h-full bg-gray-700 text-gray-50">
  <Header />
  <Quotes />
  <Footer />
</div>
