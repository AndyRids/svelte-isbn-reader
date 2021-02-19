<script>
  // 
  import { onMount, onDestroy } from 'svelte';

  // APIs
  import Quagga from 'quagga';
  import getBookDetails from '../../api/getBookDetails';

  // components
  import Loader from '../loading/Loader.svelte';
  import SearchResultsFull from '../searching/SearchResultsFull.svelte';

  // stores
  import { ISBN } from '../../stores/stores';

  // reference to active component, 'ScannerISBN' || 'SearchAuthor'
  export let componentName;

  // camer torth activation flag
  let isTorch = false;
  let isModal = false;
  let bookDetails;

  const config = {
    inputStream:
    {
      name: 'Live',
      type: 'LiveStream',
      constraints:
      {
        width: 640,
        height: 480,
        aspectRatio: { min: 4 / 3, max: 16 / 9 },
        facingMode: 'environment'
      },
      singleChannel: false,
    },
    area:
    {
      // defines rectangle of the detection/localization area
      top: '0%',
      right: '0%',
      left: '0%',
      bottom: '0%'
    },
    frequency: 'full',
    locator:
    {
      patchSize: 'medium',
      halfSample: true,
      debug:
      {
        showCanvas: true,
        showPatches: true,
        showFoundPatches: true,
        showSkeleton: true,
        showLabels: false,
        showPatchLabels: true,
        showRemainingPatchLabels: false,
        boxFromPatches:
        {
          showTransformed: false,
          showTransformedBox: false,
          showBB: true
        },
      },
    },
    numOfWorkers: 2,
    decoder:
    {
      readers: ['ean_reader'],
      multiple: false,
      debug:
      {
        drawBoundingBox: true,
        showFrequency: false,
        drawScanline: true,
        showPattern: false
      }
    },
  };

  $: isISBN = $ISBN ? true : false;

  const toggleTorch = () => {
    // toggle torch status flag
    isTorch = !isTorch;

    // get active camera track
    const track = Quagga.CameraAccess.getActiveTrack();
    // console.log(track.getSettings());
    // define torch status options based on status flag
    const options = isTorch ? { advanced: [{ torch: true }] } : { advanced: [{ torch: false }] };

    // apply contrasnts to the track - torch on || off
    return track.applyConstraints(options).catch((error) => console.log(error));
  };

  // draw frame & line around processed barcode
  Quagga.onProcessed((result) => {
    const {  ctx: { overlay: context } } = Quagga.canvas;
    
    // if no result, return early
    if (!result) return;

    // if no codeResult & code, return early
    if (!result?.codeResult && !result?.codeResult?.code) return;

    const { line, box } = result;

    const lineCoords = { x: 'x', y: 'y' };
    const boxCoords = { x: 0, y: 1 };

    const lineStyle = { color: '#002d3e', lineWidth: 2 };
    const boxStyle = { color: '#9DCDE3', lineWidth: 2 };

    Quagga.ImageDebug.drawPath(box, boxCoords, context, boxStyle);
    Quagga.ImageDebug.drawPath(line, lineCoords, context, lineStyle);
  });

  /**
   * once a barcode is read successfully, Quagga.stop()
  */
  Quagga.onDetected((result) => {
    const { codeResult: { code } } = result;

    if (code) {
      ISBN.setISBN(code);

      Quagga.stop();
    }
  });

  const initQuagga = () => Quagga.init(config, (error) => (error ? Quagga.stop() : Quagga.start()));
  const stopQuagga = () => (Quagga.stop(), (componentName = ''));

  const correctISBN = () => {
    isModal = !isModal;
    
    bookDetails = getBookDetails('fetchByISBN', $ISBN).catch((error) => error);

    ISBN.resetISBN();

    return initQuagga();
  };

  const wrongISBN = () => (ISBN.resetISBN(), initQuagga());

  onMount(initQuagga);
  onDestroy(stopQuagga);

</script>


<div class="wrapper-scanner">

  <div class="heading">
    <button on:click="{toggleTorch}" class="button heading__button button--torch" type="button">
      <img class="button__icon" src="./icons/buttons/torch-on.svg" alt="add" width="25px" height="25px" />
    </button>
    <button on:click="{() => (componentName = '')}" class="button heading__button button--close" type="button">
      <img class="button__icon" src="./icons/buttons/close.svg" alt="add" width="35px" height="35px" />
    </button>
  </div>

  <section id="interactive" class="viewport">
    <div class="wrapper-loader">
      {#if !isModal}
        <Loader />
      {/if}
    </div>
    <div class="viewport-guide"></div>
  </section>

  <div class="result">
    <p class="result__barcode">{isISBN ? $ISBN : 'Awaiting Scan'}</p>
  
    {#if $ISBN}
      <button on:click="{correctISBN}" class="button result__button button--yes" type="button">
        <img class="button__icon" src="./icons/buttons/yes.svg" alt="yes" width="35px" height="35px" />
      </button>
    
      <button on:click="{wrongISBN}" class="button result__button button--no" type="button">
        <img class="button__icon" src="./icons/buttons/no.svg" alt="no" width="35px" height="35px" />
      </button>
    {/if}

    {#if isModal}
      {#await bookDetails}
        <div class="wrapper-loader wrapper-loader--results">
          <Loader />
        </div>
      {:then { book, errorMessage }}
        <SearchResultsFull bind:isModal {book} {errorMessage} />
      {:catch { message: errorMessage }}
        <SearchResultsFull bind:isModal {errorMessage} />
      {/await}
    {/if}
    

  </div>

</div>


<style>
  .wrapper-scanner {
    align-items: center;
    background: var(--background-section);
    border: 1px solid var(--border);
    box-shadow: var(--box-shadow-section);
    display: grid;
    grid-template-rows: 65px minmax(200px, 480px) 65px;
    height: 100%;
    justify-items: center;
    margin-bottom: 110px;
    max-height: calc(100% - 110px);
    width: 100%;
  }

  .viewport {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    max-width: 500px;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .wrapper-loader {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .wrapper-loader--results {
    height: calc(100% - 110px);
    border: 2px solid red;
  }

  .viewport-guide {
    align-items: center;
    display: flex;
    height: 480px;
    justify-content: center;
    left: calc(0 - (640px - 100%));
    position: absolute;
    top: calc(0 - (100% - 240px));
    width: 640px;
    z-index: 0;
  }

  .heading {
    align-items: center;
    border: 1px solid var(--border);
    display: flex;
    gap: 10px;
    height: 65px;
    justify-content: flex-end;
    max-width: 500px;
    width: 100%
  }

  .heading::after {
    content: '';
  }

  .heading__button {
    height: 44px;
    position: relative;
    width: 44px;
  }

  .result {
    align-items: center;
    border: 1px solid var(--border);
    display: flex;
    gap: 10px;
    height: 65px;
    justify-content: center;
    max-width: 500px;
    width: 100%
  }

  .result__barcode {
    font-size: 1.1rem;
    margin: 0;
  }

  .button--no {
    border-radius: 50%;
  }

  @keyframes scan {
    0% {}
    100% {}
  }
</style>