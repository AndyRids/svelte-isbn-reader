/* eslint-disable */
const fetch = require('node-fetch')

exports.handler = (event, context) => {
  // ISBN DB API key
  const API_KEY = process.env.ISBN_DB_KEY;

  // create new headers object
  const headers = { 'Content-Type': 'application/json', Authorization: `${API_KEY}` };

  // fetch options object, with headers included
  const fetchOptions = { method: 'GET', headers, redirect: 'follow' };

  // reusable fetch handler, with error handling
  const goFetch = (url, options) => (
    fetch(url, options)
      // check response, if ok return response.json(), else reject with statusText
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
      // return stringified data and statusCode 200 if initial response was ok
      .then((data) => ({ statusCode: 200, body: JSON.stringify(data) }))
      // on error, return statusCode 500 and errorMessage
      .catch(({ message }) => ({ statusCode: 500, body: JSON.stringify({ errorMessage: message }) }))
  );

  // use API endpoint for ISBN search
  const fetchByISBN = (isbn) => {
    // ISBN DB API endpoint for search by ISBN
    const API_ENDPOINT = 'https://api2.isbndb.com/book/';
    // query string
    const QUERY = isbn;
    // fetch book information from API
    return goFetch(`${API_ENDPOINT}${QUERY}`, fetchOptions);
  };

  // use API endpoint for author search
  const fetchByAuthor = (author) => {
    // ISBN DB API endpoint for search by author
    const API_ENDPOINT = 'https://api2.isbndb.com/author/';
    // query parameters
    const PARAMETERS = '?page=1&pageSize=20';
    // query string
    const QUERY = author;
    // fetch information from API
    return goFetch(`${API_ENDPOINT}${QUERY}${PARAMETERS}`, fetchOptions);
  };

  /**
   * format is 'fetchByISBN' || 'fetchByAuthor'
   * query is an ISBN or author name as a string
   */
  const { queryStringParameters: { format, query } } = event;

  // actions object with methods to fetch by ISBN or author
  const actions = { fetchByISBN, fetchByAuthor };

  // carry out action based on queryStringParameters from the front-end
  return actions[format](query);
}
