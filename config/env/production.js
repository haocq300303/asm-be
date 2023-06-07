module.exports = {
  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/datastores.js and config/models.js )           *
   ***************************************************************************/

  datastores: {
    default: {
      adapter: 'sails-mongo',
      url: 'mongodb+srv://haodev3003:Zsotrc23@@asm.7ubljfk.mongodb.net/ASM?retryWrites=true&w=majority',
    },
  },

  models: {
    migrate: 'safe',
  },
  sockets: {
    onlyAllowOrigins: ['https://example.com', 'https://www.example.com'],
  },
  /***************************************************************************
   * Configure your Express server                                           *
   ***************************************************************************/

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    trustProxy: true, // Required when running behind a load balancer like Heroku
  },
};
