<script>
  import { fade } from 'svelte/transition';
  // book details
  export let book = {};
  // error message from API fetch / book not found
  export let errorMessage = '';

  // display modal flag
  export let isModal;

  $: ({ title = 'N/A', authors, date_published, publisher = 'N/A', isbn13} = book)

</script>

<div transition:fade="{{ duration: 200 }}" class="wrapper-modal">

  <article class="book-details">
    <div class="book-details__heading">
      {#if !errorMessage}
        <button on:click="{() => {}}" class="button heading__button button--add" type="button">
          <img class="button__icon" src="./icons/buttons/add.svg" alt="add" width="35px" height="35px" />
        </button>
      {/if}
      
      <button on:click="{() => (isModal = !isModal)}" class="button heading__button button--close" type="button">
        <img class="button__icon" src="./icons/buttons/close.svg" alt="add" width="35px" height="35px" />
      </button>
    </div>
    <div class="book-details__body">
      {#if !errorMessage}
        <h3 class="book-details__title">Title</h3>
        <p class="book-details__copy">{title}</p>
    
        <h3 class="book-details__title">Authors</h3>
        <p class="book-details__copy">{authors}</p>
    
        <h3 class="book-details__title">Published</h3>
        <p class="book-details__copy">{date_published ? date_published.toString().substr(0, 4) : 'N/A'}</p>
    
        <h3 class="book-details__title">Publisher</h3>
        <p class="book-details__copy">{publisher}</p>
    
        <h3 class="book-details__title">ISBN</h3>
        <p class="book-details__copy">{isbn13}</p>
      {:else}
        <h3 class="book-details__title">Error</h3>
        <p class="book-details__copy">{errorMessage}</p>
      {/if}
    </div>
  </article>

</div>

<style>
  .wrapper-modal {
    align-items: center;
    background: var(--background-modal);
    bottom: 0;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 5;
  }

  .book-details {
    background: var(--background-section);
    border: 1px solid var(--border);
    border-radius: var(--radius-section);
    box-sizing: var(--box-shadow-section);
    max-width: min(400px, 95%);
    overflow-y: auto;
    width: 100%;
  }

  .book-details__heading {
    align-items: center;
    border-bottom: 1px solid var(--border);
    display: flex;
    gap: 10px;
    height: 65px;
    justify-content: flex-end;
    max-width: 500px;
    width: 100%
  }

  .book-details__heading::after {
    content: '';
  }

  .book-details__body {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100%;
    justify-content: left;
  }

  .book-details__body::before,
  .book-details__body::after { content: ''; }

  .book-details__title {
    font-size: 1.2rem;
  }

  .book-details__copy {
    font-size: 1rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
  }

  .book-details__title,
  .book-details__copy {
    padding-left: 0.3rem;
  }

  .heading__button {
    height: 44px;
    position: relative;
    width: 44px;
  }
</style>