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
  // netlify function redirect URL
  const API_URL = '/api/search';
  // type of search; 'fetchByISBN', 'fetchByAuthor'
  const FORMAT = `format=${queryType}`;
  // ISBN or author name as string
  const QUERY = `query=${queryString}`;

  // send request to netlify function
  return (
    fetch(`${API_URL}?${FORMAT}&${QUERY}`)
      .then((response) => response.json())
      .catch((error) => error)
  );
}
