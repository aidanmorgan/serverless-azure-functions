'use strict';

module.exports = {
  cleanUpFunctions () {
    return this.provider.isExistingFunctionApp()
      .then(() => {
        this.provider.getDeployedFunctionsNames();
      })
      .then(() => {
        // only delete the functions that are specified in this serverless.yaml file, there may be other
        // ones deployed into the same function app that come from a different source, so don't touch them
        this.provider.deleteFunctions(this.serverless.service.getAllFunctions());
      });
  }
};
