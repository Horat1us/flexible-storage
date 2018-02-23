// tslint:disable
const
    path = require('path'),
    webpack = require('webpack');

const
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    nodeExternals = require("webpack-node-externals");

const debug = process.env.NODE_ENV !== 'production';
const packageJson = require(path.resolve('package.json'));
const env = debug ? 'local' : 'production';

console.warn(`Building ${packageJson.name} in ${env} environment.`);

const config = {
    entry: ["./src/index.ts"],
    target: "node",
    externals: [nodeExternals()],

    output: {
        filename: 'index.js',
        path: path.resolve('./build'),
        publicPath: "/",
        library: packageJson.name,
        libraryTarget: "umd",
    },

    devtool: debug ? "source-map" : false,

    resolve: {
        extensions: [".ts", ".js", ".json", ".jsx", ".tsx",],
        modules: [
            path.resolve('node_modules'),
            path.resolve('src'),
        ],
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: [
                                ['env', {
                                    "targets": {
                                        "browsers": ["last 2 versions", "safari >= 10", "ie >= 11"]
                                    }
                                }]
                            ]
                        }
                    },
                    "awesome-typescript-loader"
                ]
            },
            {
                test: /\.jsx?$/,
                exclude:
                    [/node_modules/],
                loader:
                    "babel-loader",
                query: {
                    presets: [
                        ['env', {
                            "targets": {
                                "browsers": ["last 2 versions", "safari >= 10", "ie >= 11"]
                            }
                        }]
                    ]
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin(path.resolve('./build')),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NodeEnvironmentPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        })
    ]
};

module.exports = config;
