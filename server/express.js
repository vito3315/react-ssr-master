const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { StaticRouter, matchPath } = require( 'react-router-dom' );
const {Helmet} = require("react-helmet");

// create express application
const app = express();

// import App component
const { App } = require( '../src/components/app' );

// import routes
const routes = require( './routes' );

// serve static assets
app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

// for any other requests, send `index.html` as a response
app.use( '*', async ( req, res ) => {

    // get matched route
    const matchRoute = routes.find( route => matchPath( req.originalUrl, route ) );

    if( matchRoute ){
        // fetch data of the matched component
        let componentData = null;
        if( typeof matchRoute.component.fetchData === 'function' ) {
            componentData = matchRoute.component.fetchData();
        }

        // read `index.html` file
        let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/index.html' ), {
            encoding: 'utf8',
        } );

        console.log( '2' )
        
        // get HTML string from the `App` component
        let appHTML = ReactDOMServer.renderToString(
            <StaticRouter location={ req.originalUrl } data={ componentData } context={ componentData }>
                <App />
            </StaticRouter>
        );

        //const helmet = Helmet.renderStatic();
        
        /*indexHTML = indexHTML.replace(
            '<!-- title -->',
            `${helmet.title.toString()}`
        );*/
        
        //console.log( 'componentData', componentData )
        
        console.log( '3' )
        indexHTML = indexHTML.replace('<!-- title -->', `${componentData.title}`);
        indexHTML = indexHTML.replace('<!-- description -->', `${componentData.description}`);
        
        // populate `#app` element with `appHTML`
        indexHTML = indexHTML.replace( '<div id="app"></div>', `<div id="app">${ appHTML }</div>` );

        // set value of `initial_state` global variable
        indexHTML = indexHTML.replace(
            'var initial_state = null;',
            `var initial_state = ${ JSON.stringify( componentData ) };`
        );

        // set header and status
        res.contentType( 'text/html' );
        res.status( matchRoute.code );

        return res.send( indexHTML );
    }
} );

// run express server on port 9000
app.listen( '7990', () => {
    console.log( 'Express server started at http://localhost:7990' );
} );