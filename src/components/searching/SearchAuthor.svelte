<script>
  import getBookDetails from '../../api/getBookDetails';
  import Loader from '../loading/Loader.svelte';
  import SearchResultsFull from '../searching/SearchResultsFull.svelte';

  // reference to active component; 'ScannerISBN', 'SearchISBN', 'SearchAuthor'
  export let componentName;

  let authorName = '';
  let bookDetails;

  let isModal = false;
  let bookIndex;

  $: console.log(bookDetails);

  const moreInfo = ({ target: { dataset } }) => ((bookIndex = Number(dataset.index)), (isModal = !isModal));

  // when searchButton is clicked
  function searchHandler() {
    // if input is not empty
    if (!authorName) return;
    // trim any leading or trailing spaces
    const name = authorName.trim();
    // fetch book details by author name
    bookDetails = getBookDetails('fetchByAuthor', name);
  }

</script>

  <div class="wrapper-search">

    <section class="search">

      <input bind:value="{authorName}" class="input search__input" type="text" placeholder="Search for author" pattern="^[a-zA-Z]+[ ]?[a-zA-Z]*$" />
  
      <button on:click="{searchHandler}" class="button button--search search__button" type="button">
        <img class="button__search-icon" src="./icons/buttons/search.svg" alt="search ISBN button" width="35px" height="35px" />
      </button>
  
      <button on:click="{() => (componentName = '')}" class="button button--close search__button" type="button">
        <img class="button__icon" src="./icons/buttons/close.svg" alt="close window" width="35px" height="35px" />
      </button>
  
    </section>

    <section class="results">

      {#if bookDetails}
        {#await bookDetails}
          <div class="wrapper-loader">
            <Loader />
          </div>
        
        {:then { books }}

          {#each books as book, index}

            <article class="card">
              <div class="card__header">
                <figure class="card__figure">
                  <img src="{book?.image}" alt="book cover" class="card__image" height="100%" width="100%" />
                </figure>
              </div>
          
              <div class="card__body">
                <p class="card__description">{book?.title}</p>
              </div>

              <div class="card__footer">
                <button on:click="{() => {}}" class="button card__button button--add" type="button">
                  <img class="button__icon" src="./icons/buttons/add.svg" alt="add" width="35px" height="35px" />
                </button>
              
                <button on:click="{() => {}}" class="button card__button button--no" type="button">
                  <img class="button__icon" src="./icons/buttons/close.svg" alt="no" width="35px" height="35px" />
                </button>

                <button on:click="{moreInfo}" class="button card__button button--info" type="button" data-index="{index}">
                  <img class="button__icon" src="./icons/buttons/info.svg" alt="information" width="35px" height="35px" />
                </button>
              </div>
            </article>

          {/each}

          {#if isModal && bookIndex !== undefined}
            <SearchResultsFull bind:isModal book="{books[bookIndex]}" />
          {/if}

        {/await}
      {/if}

    </section>

    
  </div>

 

<style>
  .wrapper-search {
    align-items: center;
    background: var(--background-section);
    border: 1px solid var(--border);
    box-shadow: var(--box-shadow-section);
    display: grid;
    grid-template-rows: 65px auto;
    height: 100%;
    justify-items: center;
    margin-bottom: 110px;
    max-height: calc(100% - 110px);
    width: 100%;
  }

  .search {
    align-items: center;
    background: var(--background-section);
    border: 1px solid var(--border);
    border-bottom: none;
    display: grid;
    gap: 10px;
    grid-template-columns: auto 1fr 44px 44px auto;
    height: 65px;
    justify-items: center;
    max-width: 500px;
    width: 100%;
  }

  .search::before, .search::after { content: ''; }

  .search__input {
    border-radius: var(--radius-input);
    height: 44px;
    width: 100%;
  }

  .input {
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 1.1rem;
    padding: 0 5px;
  }

  .input::placeholder {
    font-size: 0.9rem;
    font-style: italic;
    opacity: 0.9;
  }
  .input:focus {
    outline-style: solid;
    outline-color: transparent;
    box-shadow: 0 0 0 3px #5a7abe;
  }
  .search__input:invalid, .search__input:focus:invalid {
    box-shadow: 0 0 0 3px #be5a5a;
  }
  .search__input:invalid + .search__button {
    background: #f5898980;
    cursor: not-allowed;
    pointer-events: none;
  }

  .search__button {
    height: 44px;
    position: relative;
    width: 44px;
  }

  .results {
    /* align-content: center; */
    align-items: center;
    border: 1px solid var(--border);
    display: grid;
    gap: 30px 20px;
    grid-template-columns: repeat(auto-fill, 172px);
    height: 100%;
    justify-content: center;
    max-width: 500px;
    overflow-y: auto;
    width: 100%;
  }

  .wrapper-loader {
    align-items: center;
    bottom: 105px;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }

  .card {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: auto;
    justify-content: center;
    width: 172px;
  }

  .card__header {
    border: 1px solid var(--border);
    border-radius: var(--radius-section);
    box-shadow: var(--box-shadow-section);
    width: 100%
  }

  .card__figure {
    height: 254px;
    margin: 0;
    overflow: hidden;
    padding: 0;
    width: 170px;
  }

  .card__image {
    border-radius: var(--radius-section);
  }

  .card__body {
    width: 100%;
  }

  .card__description {
    font-size: 1rem;
    overflow: hidden;
    margin: 0;
    padding: 0px 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card__footer {
    align-items: center;
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  .card__button {
    height: 44px;
    position: relative;
    width: 44px;
  }
</style>