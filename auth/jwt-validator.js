const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

module.exports = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://event-manager.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'http://capstone.psdr3.org:3000',
  issuer: `https://event-manager.auth0.com/`,
  algorithms: ['RS256']
});