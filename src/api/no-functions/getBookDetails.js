/**
 * used to fetch book data from the ISBN DB API, based on user input.
 * The specific API endpoint to query, is determined by using the queryType
 * argument as a key for an actions object and the queryString agument is
 * passed to the relevant method in the actions object:
 *
 * actions[queryType](queryString) | actions['fetchByISBN']('9781934759486')
 *
 * @param {String} queryType - 'fetchByQuery' || 'fetchByAuthor' || 'fetchByISBN'
 * @param {String} queryString - ISBN, author name or title etc.
 * @returns {Promise}
 */
export default function getBookDetails(queryType, queryString) {
  // options for HTTP headers
  const init = { 'Content-Type': 'application/json', Authorization: `${import.meta.env.SNOWPACK_PUBLIC_ISBN_DB_KEY}` };
  // create new headers object
  const headers = new Headers(init);

  const fetchOptions = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };

  /**
   * generic fetch handler to be used by each API endpoint
   * specific function, to avoid repatition. Returns the
   * data parsed as JSON, or an error object.
   *
   * @param {String} url - API endpoint to fetch data from
   * @param {Object} options - fetch method & HTTP headers, including Authorization (API key)
   * @returns {Promise}
   */
  const goFetch = (url, options) => (
    fetch(url, options)
      .then((response) => response.json())
      .catch((error) => error)
  );

  /**
   * used to retrieve book details, based on ISBN,
   * from the relevant ISBN DB API endpoint
   *
   * @param {String} isbn - ISBN to search for
   * @returns {Promise}
   */
  const fetchByISBN = (isbn) => {
    // ISBN DB API endpoint for search by ISBN
    const API_ENDPOINT = 'https://api2.isbndb.com/book/';
    // query string
    const QUERY = isbn;

    // fetch book information from API
    return goFetch(`${API_ENDPOINT}${QUERY}`, fetchOptions);
  };

  /**
   * used to retrieve book details, based on author,
   * from the relevant ISBN DB API endpoint
   *
   * @param {String} author - author to search for
   * @returns {Promise}
   */
  const fetchByAuthor = (author) => {
    // ISBN DB API endpoint for search by author
    const API_ENDPOINT = 'https://api2.isbndb.com/author/';
    // query parameters
    const PARAMETERS = '?page=1&pageSize=20';
    // query string
    const QUERY = author;

    return goFetch(`${API_ENDPOINT}${QUERY}${PARAMETERS}`, fetchOptions);
  };

  /**
   * used to retrieve details of all books based on a query,
   * from the relevant ISBN DB API endpoint, sorted by author
   *
   * @param {String} query - text to search for
   * @returns {Promise}
   */
  const fetchByQuery = (query) => {
    // ISBN DB API endpoint for search by ISBN
    const API_ENDPOINT = 'https://api2.isbndb.com/books/';
    // query parameters
    const PARAMETERS = '?page=1&pageSize=20&column=author';
    // query string
    const QUERY = query;

    return goFetch(`${API_ENDPOINT}${QUERY}${PARAMETERS}`, fetchOptions);
  };

  // actions based on queryType parameter: 'fetchByQuery', 'fetchByAuthor' & 'fetchByISBN'
  const actions = { fetchByISBN, fetchByAuthor, fetchByQuery };

  // if queryType === 'fetchByQuery', actions['fetchByQuery'](querySting)
  return actions[queryType](queryString);
}
