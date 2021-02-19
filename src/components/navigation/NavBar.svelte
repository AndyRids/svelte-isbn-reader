<script>
  import { fly } from 'svelte/transition';

  // reference to active component, 'ScannerISBN' || 'Search'
  export let componentName;

  // button flag for ISBN & author search or ISBN barcode scan
  let isAdd = false;

  // flags to check if componentName is 'SearchISBN', 'SearchAuthor' or 'ScannerISBN'
  $: searchActive = (componentName.substr(0, 6) === 'Search'  ? true : false);
  $: scannerActive = (componentName === 'ScannerISBN' ? true : false);

  const searchHandler = ({ target: { dataset } }) => ((isAdd = !isAdd), (componentName = dataset.component));
  const scannerHandler = () => ((isAdd = !isAdd), (componentName = 'ScannerISBN'));
  const popupHandler = () => (searchActive || scannerActive ? '' : (isAdd = !isAdd));

</script>

<nav class="nav">

  <ul class="nav__list">

    <li class="nav__item">
      <button on:click="{searchHandler}" class="button nav__button button--books" type="button">
        <img class="button__icon" src="./icons/buttons/books.svg" alt="books" width="36px" height="36px" />
      </button>
    </li>

    <li class="nav__item">
      <button on:click="{popupHandler}" class="button nav__button button--add" type="button">
        <img class="button__icon" src="./icons/buttons/add.svg" alt="add" width="36px" height="36px" style="--degrees: {isAdd && !searchActive && !scannerActive ? '45deg' : '0deg'}" />
      </button>
    </li>

    <li class="nav__item">
      <button on:click="{() => {}}" class="button nav__button button--settings" type="button">
        <img class="button__icon" src="./icons/buttons/settings.svg" alt="settings" width="36px" height="36px" />
      </button>
    </li>

    {#if isAdd & !scannerActive & !searchActive}
      <ul transition:fly="{{ x: -230, duration: 200 }}" class="nav__popup-list">
          <li class="nav__popup-item">
            <button on:click="{scannerHandler}" class="button nav__button button--barcode" type="button">
              <img class="button__icon" src="./icons/buttons/barcode.svg" alt="scan" width="36px" height="36px" />
            </button>
            <div class="nav__description">Scan ISBN</div>
          </li>

          <li class="nav__popup-item">
            <button on:click="{searchHandler}" class="button nav__button button--search" type="button" data-component="SearchISBN">
              <img class="button__icon" src="./icons/buttons/search.svg" alt="Search" width="36px" height="36px" />
            </button>
            <div class="nav__description">Search ISBN</div>
          </li>

          <li class="nav__popup-item">
            <button on:click="{searchHandler}" class="button nav__button button--search" type="button" data-component="SearchAuthor">
              <img class="button__icon" src="./icons/buttons/search.svg" alt="Search" width="36px" height="36px" />
            </button>
            <div class="nav__description">Search Author</div>
          </li>
      </ul>
    {/if}

  </ul>
  
</nav>

<style>
  .nav {
    align-items: center;
    background: var(--background-section);
    bottom: 0px;
    border: 1px solid var(--border);
    box-shadow: var(--box-shadow-section);
    display: flex;
    height: 65px;
    justify-content: center;
    left: 0;
    margin: 20px 0px;
    position: fixed;
    width: 100%;
    z-index: 3;
  }

  .nav__list {
    align-items: center;
    display: flex;
    gap: 20px;
    justify-content: center;
    list-style: none;
    position: relative;
    width: 100%;
  }

  .nav__item {
    position: relative;
  }

  .nav__button {
    height: 44px;
    position: relative;
    width: 44px;
  }

  .nav__popup-list {
    align-content: center;
    align-items: center;
    background: var(--background-section);
    border-radius: var(--radius-section);
    bottom: 100px;
    box-shadow: var(--box-shadow-section);
    display: grid;
    gap: 15px;
    grid-template-rows: repeat(3, 44px);
    height: 195px;
    left: 0;
    list-style: none;
    padding-left: 15px;
    position: absolute;
    width: 245px;
  }

  .nav__popup-list::after {
    background: var(--background-main);
    border: 3px solid var(--border);
    border-radius: 4px;
    content: '';
    height: 20%;
    position: absolute;
    right: 5px;
    width: 1px;
  }

  .nav__popup-item {
    align-items: center;
    display: grid;
    gap: 20px;
    grid-template-columns: 44px 1fr;
    justify-content: center;
    width: 100%;
  }

  .nav__description {
    background: var(--background-section);
  }

  .button__icon {
    transition: all 200ms linear;
    transform: rotate(var(--degrees));
  }
</style>