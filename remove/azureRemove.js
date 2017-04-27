'use strict';

const BbPromise = require('bluebird');
const removeFunctions = require('./lib/removeFunctions');
const loginToAzure = require('../shared/loginToAzure');

class AzureRemove {
  constructor (serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('azure');

    Object.assign(
      this,
      loginToAzure,
      removeFunctions
    );

    this.hooks = {
      'remove:remove': () => BbPromise.bind(this)
        .then(this.provider.initialize(this.serverless,this.options))
        .then(this.loginToAzure)
        .then(this.removeFunctions)
        .then(() => this.serverless.cli.log('Service(s) successfully removed'))
    };
  }
}

module.exports = AzureRemove;
