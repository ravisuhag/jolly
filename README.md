## jolly
HapiJS application charger

### Hapi Plugins 
- [Glue](https://github.com/hapijs/glue) - Server composer for hapi.js
- [Confidence](https://github.com/hapijs/confidence) - Configuration API
- [Hoek](https://github.com/hapijs/hoek) - Node utilities shared amongst the extended hapi universe
- [Catbox](https://github.com/hapijs/catbox) - Multi-strategy object caching service

- [Boom](https://github.com/hapijs/boom) - HTTP-friendly error objects
- [Joi](https://github.com/hapijs/joi) - Object schema validation
- [Good](https://github.com/hapijs/good) - Hapi process monitoring
- [Lab](https://github.com/hapijs/lab) - Test Utility
- [Bell](https://github.com/hapijs/bell) - Third-party login plugin for hapi
- [Scooter](https://github.com/hapijs/scooter) - User-agent information plugin for hapi
- [Visionary](https://github.com/hapijs/visionary)  

- [Crumb](https://github.com/hapijs/crumb) - CSRF crumb generation and validation for hapi

### Structure

```
jolly
|
|-- config
|
|-- stores/db 
|	|
|	|- Schema
|	'- Models 
|
|-- lib
| 	|- Authentication
| 	|- Methods 
| 	|- Facets 
| 	|- Emails
| 	|- Policies
| 	|- Adapters
| 	|- Agents
| 	'- Services
|
|-- app 
|	|- handlers 
|   |	| - users
|   |	| - accounts
|   |	| - admin
|   |	'- endpoints
|	|
| 	|- routes
|   |	|- users
|   |	|- accounts
|   |	|- admin
|   |	|- endpoints
|	|
|	|- views 
|	|   |- layouts
|	|   |- partials
|	|   |- helpers
|	|   |- users
|	|   |- accounts
|	|   '- admin
|	|
|	'- public 
|	   |- components
|	   |- css
|	   '- img 
|
|-- Tests
|
|-- Tasks 
|
|-- Scripts


```



