const pxtoviewport = require('postcss-px-to-viewport');
module.exports = {
    productionSourceMap: false,
    devServer: {
        host: 'localhost',
        port: '8888',
        https: true,
        open: true
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    pxtoviewport({
                        viewportWidth: 375
                    })
                ]
            }
        }
    },
}