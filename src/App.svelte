<script>
  import { onMount } from 'svelte';

  // components
  import NavBar from './components/navigation/NavBar.svelte';
  import SearchISBN from './components/searching/SearchISBN.svelte';
  import SearchAuthor from './components/searching/SearchAuthor.svelte';
  import ScannerISBN from './components/scanning/ScannerISBN.svelte';
  

  // current displayed component name
  let componentName = '';

  // reference to imported SearchISBN, SearchAuthor & ScannerISBN components
  const components = { SearchISBN, SearchAuthor, ScannerISBN };

  onMount(() => { });
</script>
<NavBar bind:componentName />

  <div class="wrapper-flex wrapper-flex--start">
    

    {#if componentName}

      <svelte:component this={components[componentName]} bind:componentName />

    {/if}
    
  </div>

<style>

</style>