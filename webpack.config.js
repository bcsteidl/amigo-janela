const webpack = require('webpack')
const path = require('path')

const caminho = (pontoFinal = "") => path.resolve(__dirname, pontoFinal)

const eProducao = process.env.NODE_PRD === 'TRUE' || process.env.NODE_PRD === 'true'

module.exports = {
    entry: caminho("janela.js"),
    output: {
        path: caminho("dist"),
        filename: (eProducao ? "amigo-janela-min.js" : "amigo-janela.js")
    },
    devtool: (eProducao ? "" : "source-map"),
    module: {
        loaders: [{
            test: /\.css$/,
            include: [caminho("css"), caminho("node_modules")],
            loader: "style-loader!css-loader"
        }, {
            test: /\.png$/,
            include: [caminho("img"), caminho("node_modules")],
            loader: "url-loader?limit=200000"
        }, {
            test: /\.jpg$/,
            include: [caminho("img"), caminho("node_modules")],
            loader: "url-loader?limit=100000"
        }, {
            test: /\.gif$/,
            include: [caminho("img"), caminho("node_modules")],
            loader: "url-loader?limit=100000"
        }]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".css"],
        alias: {
            "jquery-ui": caminho("node_modules/jquery-ui-dist/jquery-ui.js"),
            css: caminho("css"),
            src: caminho("src")
        }
    },
    plugins: eProducao ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : []
}
