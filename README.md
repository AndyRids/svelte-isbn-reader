[![Netlify Status](https://api.netlify.com/api/v1/badges/62971b33-70d5-4b8b-9afe-72bb1411ee8e/deploy-status)](https://app.netlify.com/sites/svelte-isbn-reader/deploys)
# Svelte ISBN barcode scanner and search App [view site](https://svelte-isbn-reader.netlify.app/)

Work in progress.

TODO: 

* Change API to OpenLibrary from ISBN DB
* Add library feature
* Add user settings feature
* Store library and user settings (IndexedDB or FaunaDB)
* Fix browser compatability issues

JAMstack ISBN barcode reader and search app, using [ISBN DB](https://isbndb.com/) API for fetching book information, from ISBN or author name. [Netlify functions (AWS Lambda)](https://docs.netlify.com/functions/overview/) are used to connect the frontend with the backend APIs. [Snowpack](https://www.snowpack.dev/) was used as the build tool.

NPM packages can be installed after clone by running:

```npm
npm install
```

Note:

To enable use without Netlify CLI, I've left the original API fetch function in src/api/no-functions, which can be used by
changing the API function like so, in ScannerISBN, SearchAuthor & SearchISBN components (src/components - scanning & searching):

* from: ```import getBookDetails from '../../api/getBookDetails';```
* to: ```import getBookDetails from '../../api/no-functions/getBookDetails';```

.env file will then need: SNOWPACK_PUBLIC_ISBN_DB_KEY=45341_...

Otherwise...

Build requires [Netlify CLI](https://docs.netlify.com/cli/get-started/). 

* ```npm install netlify-cli -g```

  Install Netlify CLI.

* ```netlify login```

  Authorise Netlify CLI with Netlify account.

* ```netlify init```

  Create and Connect a Netlify site. I connected manually intially, during development and later
  connected the site to a GitHub repo.

* ```netlify.toml```

  Development & build settings are already entered, with comments, in the netlify.toml file.

* ```.env & evironment variables```

  Environment variables were set in a .env file and in the Netlify site build & deploy settings: ISBN_DB_KEY=YOUR_KEY

  ```
  ISBN_DB_KEY=45341_...
  ```

* ```netlify dev```

  Calls npm run dev and serves the Svelte app at http://localhost:8888. Snowpack dev server (npm run start), uses
  http://localhost:8080 and Netlify CLI acts a proxy for the netlify functions. netlify.toml shows this in the
  settings under ```[dev]```.

## Available Scripts

### netlify-dev

Runs the Netlify development server (http://localhost:8888) and acts as a proxy for the netlify functions and the
Snowpack app in development mode (http://localhost:8080).

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm test

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/master/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.json` config file.