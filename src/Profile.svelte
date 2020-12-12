<script>
  import firebase from './firebase.js';
  import QuoteForm from './QuoteForm.svelte';
  import { isModalVisible } from './stores.js';

  let currentUser = null;

  function signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        console.log('error', error.message);
      });
  }

  function signOut() {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        console.log('error', error.message);
      });
  }

  firebase.auth().onAuthStateChanged((user) => {
    currentUser = user;
  });

  function toggleModal() {
    isModalVisible.update((value) => !value);
  }
</script>

<style>
  .profile-menu {
    display: none;
  }
  .profile {
    cursor: pointer;
  }
  .profile::after {
    content: '';
    position: absolute;
    left: -20px;
    right: 0;
    bottom: -10px;
    height: 40px;
  }
  .profile:hover .profile-menu {
    display: block;
  }
</style>

<div class="profile relative inline-block text-right ml-auto z-10">
  <button
    class="w-12 h-12 border-solid border border-gray-400 rounded-full flex flex-shrink-0 items-center justify-center text-2xl">
    {#if currentUser && currentUser.photoURL}
      <img src={currentUser.photoURL} alt="currentUser.displayName" class="w-12 h-12 rounded-full" />
    {:else}👤{/if}
  </button>
  <div
    class="profile-menu origin-top-right absolute right-0 mt-2 whitespace-nowrap rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-10">
    {#if currentUser}
      <button
        on:click={toggleModal}
        type="button"
        class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-right border-none">Add
        Quote 📝</button>
      <button
        on:click={signOut}
        type="button"
        class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-right border-none">
        Sign out 👋
      </button>
    {:else}
      <button
        on:click={signIn}
        type="button"
        class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-right border-none">
        Sign in 🔒</button>
    {/if}
  </div>
</div>
{#if $isModalVisible}
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex min-h-full items-center justify-center text-center p-5">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-black opacity-75" on:click={toggleModal} />
      </div>
      <div class="bg-white rounded-lg text-left max-w-lg w-full overflow-hidden shadow-xl transform transition-all">
        <QuoteForm />
      </div>
    </div>
  </div>
{/if}
