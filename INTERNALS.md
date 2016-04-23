# Package Enhancements 

- [Bole for JSON logging](https://www.npmjs.com/package/bole)
- [Catbox for caching](https://github.com/hapijs/catbox)
- [Scooter for user agent information](https://github.com/hapijs/scooter)
- [Blankie for CSP protection](https://www.npmjs.com/package/blankie)
- [Crumb for post request](https://github.com/hapijs/crumb)

# Feature Enhancements

- Session storage in redis. [example](https://github.com/hapijs/hapi-auth-cookie/blob/master/example/index.js)
- Implement Honeypot on form submission.
- Implement lockout after maximum attempts in login page
- More abstracted asset pipelining
 - Remove hardcoded script and css inclues and move them to assets config
 - Load assets in view depanding on node env (with [preResponse handler])
- Abstract flash messges in a plugin which combines power of ```yar``` flash messages with ```boom``` error objects and display in a view helper.
 [Refer2])(http://swreflections.blogspot.in/2014/08/feature-toggles-are-one-of-worst-kinds.html)
- Prepare and maintain a living styleguide [Refer](http://rizzo.lonelyplanet.com/styleguide/design-elements/colours)
- Referrals program [Refer](http://nerds.airbnb.com/making-referrals-work-for-airbnb/) [Refer 2](http://www.referralsaasquatch.com/6-ways-create-referral-program-that-works/)
- Feature toogle [refer](https://blog.risingstack.com/continuous-deployment-of-node-js-applications/)
- Feature toggle with github workflows [Refer](http://orizens.com/wp/topics/github-workflow-feature-toggles/)
- Proxy setup and load balancing [refer](https://blog.risingstack.com/operating-node-in-production/)
- More friendly error messgaes for forms 


## Prospect TODOs
- Better loading of modules 
	-  ```config/manifest``` : Routes plugins path
	-  ```lib/moongoose``` - Load models path 
	- ```routes/*``` - Loading of controllers
- Error transformation with ```preResponse``` [refer](http://hapijs.com/api#error-transformation) 
- implement fallback with preResponse [refer](https://github.com/hapijs/hapi/blob/master/API.md#error-transformation) 
