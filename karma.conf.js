// module.exports = function (config) {
//     config.set({
//         basePath: '',
//         frameworks: ['jasmine', '@angular-devkit/build-angular'],
//         plugins: [
//             require('karma-jasmine'),
//             require('karma-chrome-launcher'),
//             require('karma-mocha-reporter'),
//             require('karma-coverage-istanbul-reporter'),
//             require('@angular-devkit/build-angular/plugins/karma'),
//         ],
//         client: {
//             clearContext: false
//         },
//         coverageIstanbulReporter: {
//             dir: require('path').join(__dirname, './coverage/todoLIST'),
//             reports: ['html', 'lcovonly', 'text-summary'],
//             fixWebpackSourcePaths: true
//         },
//         reporters: ['mocha'],
//         port: 9876,
//         colors: true,
//         logLevel: config.LOG_INFO,
//         autoWatch: true,
//         browsers: ['ChromeHeadless'],
//         singleRun: true,
//         restartOnFileChange: true,
//     })
// }
