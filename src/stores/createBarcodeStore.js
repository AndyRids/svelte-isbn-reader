import { writable } from 'svelte/store';

// import getBookDetails from '../api/getBookDetails';

export default function createBarcodeStore() {
  const { subscribe, set } = writable(null);

  const setISBN = (isbn) => set(isbn);
  const resetISBN = () => set(null);

  return { subscribe, setISBN, resetISBN };
}
