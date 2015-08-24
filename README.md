## jolly
HapiJS application charger

### Hapi Plugins 
Important Hapi plugins used in this projects are

- [Glue](https://github.com/hapijs/glue) - Server composer for hapi.js
- [Confidence](https://github.com/hapijs/confidence) - Configuration API
- [Hoek](https://github.com/hapijs/hoek) - Node utilities shared amongst the extended hapi universe
- [Catbox](https://github.com/hapijs/catbox) - Multi-strategy object caching service
- [Lab](https://github.com/hapijs/lab) - Test Utility
- [Visionary](https://github.com/hapijs/visionary)  - View engine handler
- [Boom](https://github.com/hapijs/boom) - HTTP-friendly error objects
- [Joi](https://github.com/hapijs/joi) - Object schema validation
- [Crumb](https://github.com/hapijs/crumb) - CSRF crumb generation and validation for hapi
- [Bluebird](https://github.com/petkaantonov/bluebird) - Full featured Promises/A+ implementation with exceptionally good performance

- [Good](https://github.com/hapijs/good) - Hapi process monitoring
- [Bell](https://github.com/hapijs/bell) - Third-party login plugin for hapi
- [Scooter](https://github.com/hapijs/scooter) - User-agent information plugin for hapi

## TODOs
- Better loading of modules 
	-  ```config/manifest``` : Routes plugins path
	-  ```lib/moongoose``` - Load models path 
	- ```routes/*``` - Loading of controllers
- Session storage in redis. [example](https://github.com/hapijs/hapi-auth-cookie/blob/master/example/index.js)
- Implement Honeypot on form submission.
- Error transformation with ```preResponse``` [refer](http://hapijs.com/api#error-transformation)



