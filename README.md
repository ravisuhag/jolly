## Jolly
Production ready boilerplate for hapiJS 


## Technology

- **Hapi** - Server side framework
- **Handlebar** - HTML templating engine
- **Mongoose** - Mongo database ORM
- **SASS** - CSS preprocessor 
- **Gulp** - Javascript tasks automation
- **WebPack** - Asset pipeline

Note: For a detailed list of the toolsets used in jolly, please refer to [package.json](package.json). 

## Application Structure

Let's take a tour of the app.
```
|
| -- app
|   |-- controllers        // Controllers are organised by module names
|   |   |-- <module_name>  // Each controller defines config and handler for that route.
|   |
|   |-- helpers            // Helper functions used across application
|   |-- models             // All mongoose models are defined here
|   |-- routes             // All app routes are defined here
|   |   |-- <route_plugin> // Route module is a hapi plugin and can be toggled from config/manifest.js
|   |
|   `-- templates          // All server-rendered handlebar templates, partials and helpers
|       |-- <module_name>  // Templates are organised by module names.
|   
|-- assets                 // Contains all static resources 
|   |-- fonts              // Fonts used in application
|   |-- images             // Images used in application
|   |-- misc               // Misc resources used in application
|   |-- scripts            // Client javscripts files which are then packed by webpack
|   |-- styles             // All SASS stylesheets
|   |   |-- <module_name>  // Styles are organised by module names. 
|   
|-- config                 // Contains all app configurations
|   |-- assets.js          // Assets configuration file
|   |-- config.js          // Application configuration file which stores all passwords etc. (gitignore).
|   |-- manifest.js        // App manifest file listing all plugins and load order. 
|   |-- meta.js            // App metadata file. 
|   
|-- lib                    // Core application lib/plugins 
|-- tasks                  // Contains all gulp tasks 
|-- tests                  // Code tests
|
|-- gulpfile.js            // Gulp entry file 
|-- index.js               // Application starting point
|-- package.js             // Package configuration file
|-- server.js              // Main server file
```

## Code

We're using semi-colons and comma-last. No rhyme or reason; and some of the hapi [code convention guidelines](http://hapijs.com/styleguide). All client-side js code is also in commonJS pattern packs using webpack. Check out `.editorconfig`, `.jsbeautifyrc`, `.eslintrc` for additional code conventions used.

## Running the server locally

 - Install  `node`, `npm`
 - Rename `config/config.example.js` to `config/config.js` folder.
 - Run these commands

```sh
# Install deps
$ npm install

# Run the node server
$ npm start

# > jolly@1.0.0 start /Users/ravisuhag/Batcave/Workspace/ronin/Dev/jolly
# > gulp
# 
# [16:48:55] Using gulpfile ~/Batcave/Workspace/ronin/Dev/jolly/gulpfile.js
# [16:48:55] Starting 'fonts'...
# [16:48:56] Starting 'images'...
# [16:48:56] Starting 'misc'...
# [16:48:56] Starting 'styles'...
# [16:48:56] Finished 'styles' after 5.49 ms
# [16:48:56] Starting 'webpack'...
# [16:48:56] Finished 'webpack' after 73 ms
# [16:48:56] Starting 'lint'...
# [16:48:56] Starting 'nodemon'...
# [16:48:56] Finished 'nodemon' after 1.99 ms
# [16:48:56] [nodemon] v1.4.1
# [16:48:56] [nodemon] to restart at any time, enter `rs`
# [16:48:56] [nodemon] watching: *.*
# [16:48:56] [nodemon] starting `node server.js`
# [16:48:57] Finished 'images' after 1.98 s
# [16:48:57] Finished 'misc' after 1.98 s
# Server is listening on 8000

```
The server should be running at [localhost:8000](https://localhost:8000).

## Running tests
Lab is part of the hapi.js toolset and what we use to write all of our tests.

```
$ npm test
# > jolly@1.0.0 test /Users/ravisuhag/Batcave/Workspace/ronin/Dev/jolly
# > node node_modules/lab/bin/lab -a code -t 100

# ..............

# 6 tests complete
# Test duration: 1370 ms
# No global variable leaks detected
# Coverage: 100.00%
```

## Contributers

[See the awesome people!](https://github.com/ravisuhag/jolly/graphs/contributors)

