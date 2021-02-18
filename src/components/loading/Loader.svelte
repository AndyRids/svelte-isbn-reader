<script>

</script>

  <article class="loader">
    <section class="loader__spinner"></section>
  </article>


<style>
  .wrapper-loader {
    background: var(--background-main);
  }

.loader {
  border: 4px solid var(--border);
  border-radius: 50%;
  box-shadow: var(--box-shadow-loader);
  height: 100px;
  overflow: hidden;
  position: relative;
  width: 100px;
}

.loader::before {
  background: var(--background-main);
  border: 2px solid var(--border);
  border-radius: 50%;
  bottom: 10px;
  box-shadow: var(--box-shadow-loader-before);
  content: '';
  left: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
}

.loader__spinner {
  animation: spin 1s linear infinite;
  background-image: var(--background-spinner);
  border-radius: 50%;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>