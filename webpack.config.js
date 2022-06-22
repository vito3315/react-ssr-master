const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");



const webpack = require('webpack');

/*-------------------------------------------------*/

module.exports = {

    // webpack optimization mode
    mode: ( 'development' === process.env.NODE_ENV ? 'development' : 'production' ),

    // entry files
    entry: 'development' === process.env.NODE_ENV ? [
        './src/index.dev.js', // in development
    ] : [
        './src/index.prod.js', // in production
    ],

    // output files and chunks
    output: {
        path: path.resolve( __dirname, 'dist' ),
        publicPath: '/',
        filename: '[name].[contenthash].js',
        clean: true,
    },

    // module/loaders configuration
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' ]
            },
            {
                test: /\.(jpg|png|svg|otf|ttf|webp|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 25000
                    }
                }
            }
        ]
    },

    // webpack plugins
    plugins: [
        new CompressionPlugin(),
        
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        }),

        

        // extract css to external stylesheet file
        new MiniCssExtractPlugin( {
            //filename: 'build/styles.css',
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
            experimentalUseImportModule: true
        } ),

        // prepare HTML file with assets
        new HTMLWebpackPlugin( {
            filename: 'index.html',
            template: path.resolve( __dirname, 'src/index.html' ),
            minify: false,
            title: 'Caching'
        } ),

        // copy static files from `src` to `dist`
        new CopyWebpackPlugin( {
            patterns: [
                {
                    from: path.resolve( __dirname, 'src/assets' ),
                    to: path.resolve( __dirname, 'dist/assets' )
                },
                {
                    from: path.resolve( __dirname, 'src/.htaccess' ),
                    to: path.resolve( __dirname, 'dist/.htaccess' )
                },
                {
                    from: path.resolve( __dirname, 'src/sitemap.xml' ),
                    to: path.resolve( __dirname, 'dist/sitemap.xml' )
                },
                {
                    from: path.resolve( __dirname, 'src/robots.txt' ),
                    to: path.resolve( __dirname, 'dist/robots.txt' )
                },
                {
                    from: path.resolve( __dirname, 'src/firebase-messaging-sw.js' ),
                    to: path.resolve( __dirname, 'dist/firebase-messaging-sw.js' )
                },
            ]
        } ),
    ],

    // resolve files configuration
    resolve: {
        extensions: [ '.js', '.jsx', '.scss', '.css' ],
    },

    // webpack optimizations
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {

            chunks: 'async',
            cacheGroups: {

                default: {
                    minChunks: 2,
                    reuseExistingChunk: true,
                },

                

                vendor_react: {
                    test: /.*\/node_modules\/react\/index\.js/,
                    name: 'vendor-react',
                    chunks: 'initial',
                    enforce: true,
                },
            },

            
       },
    },
    
    // development server configuration
    devServer: {
        port: 4054,
        historyApiFallback: true,
    },

    // generate source map
    //devtool: ( process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map' ),
    devtool: 'source-map'

};