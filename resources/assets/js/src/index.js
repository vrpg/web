requirejs.config({
    baseUrl: 'resources/assets/js/src',
    paths: {
        babylon: '../lib/babylonjs/dist/babylon.2.5'
    }
});

requirejs(['./index'], function (index) {
    requirejs(['main']);
});
