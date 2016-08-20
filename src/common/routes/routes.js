module.exports = function(app) {
  app.config(configRoutes);

  configRoutes.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ]

    function configRoutes($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /dashboard
    $urlRouterProvider.otherwise(function ($injector, $location) {
        $location.path('/app');
    });

    //separate state for login & error pages
    $stateProvider
        .state('app', {
            url: '/app',
            // template: require('raw-loader!../views/app.html')
            template: require('../views/app.html')
        })
  };
}
