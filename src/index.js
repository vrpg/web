requirejs.config({
    baseUrl: 'src/js',
    paths: {
        babylon: '../lib/babylon.2.5'
    }
});

requirejs(['./index'], function (index) {
    requirejs(['main']);
});
