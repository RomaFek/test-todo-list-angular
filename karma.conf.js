module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            clearContext: false
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, './coverage/todoLIST'),
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/todoLIST'),
            subdir: '.',
            reporters: [{type: 'html'}, {type: 'text-summary'}],
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true,
    })
}
