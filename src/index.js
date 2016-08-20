window.jQuery = window.$ =  require('jquery');

var angular = require('angular');
require('angular-ui-bootstrap');
require('angular-ui-router');
require('angular-material');
require('angular-cookies');
require('angular-animate');
require('angular-aria');

var app = angular.module('nativescriptBuilder', [
  'ngAnimate',
  'ui.router',
  'ui.router.util',
  'ui.bootstrap',
  'ngCookies',
  'ngAria',
  'ngMaterial',

]);

require('./common')(app);
