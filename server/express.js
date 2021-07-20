const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { StaticRouter, matchPath } = require( 'react-router-dom' );
const {Helmet} = require("react-helmet");

const compression = require('compression');
// create express application
const app = express();
app.use(compression());

// import App component
const { App } = require( '../src/components/app' );

// import routes
const routes = require( './routes' );

// serve static assets
app.get( /\.(js|css|map|ico|png|svg|htaccess|xml|txt)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

app.get('*.js', (req, res, next) => {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});

app.use(express.static('public'));

//app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=604800')
    res.set('Set-Cookie', 'SameSite=None')
    res.set('Accept-Encoding', 'gzip, compress, br')
    next()
})

app.get('/sitemap.xml', function(req, res) {
    res.sendFile('../dist/sitemap.xml');
});

app.get('/robots.txt', function(req, res) {
    res.sendFile('../dist/robots.txt');
});

// for any other requests, send `index.html` as a response
app.use( '*', async ( req, res ) => {

    if( req.originalUrl == '/' || req.originalUrl == '' ){
        res.status( 308 );
        return res.redirect("/togliatti")
    }
    
    let city = req.originalUrl.split('/');
    city = city.filter( (item) => item != '' ); 
    city = city[0];
    
    // get matched route
    const matchRoute = routes.find( route => matchPath( req.originalUrl, route ) );

    if( matchRoute ){
        
        // fetch data of the matched component
        let componentData = null;
        if( typeof matchRoute.component.fetchData === 'function' ) {
            componentData = await matchRoute.component.fetchData(req.originalUrl);
        }

        if( !componentData || componentData.st === false ){
            res.status( 404 );
            return res.redirect("/"+city)
        }
        
        // read `index.html` file
        let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/index.html' ), {
            encoding: 'utf8',
        } );

        let linkItem = '';
        let Item = null;
        
        if( matchRoute.type == 'item' ){  
            let linkItem1 = req.originalUrl.split("/");
            
            linkItem1 = linkItem1.filter( (item) => item != '' ); 
            linkItem = linkItem1[ linkItem1.length-1 ];
            
            componentData.allItems.forEach(element => {
                element.items.forEach(item => {
                    if( item.link == linkItem ){
                        Item = item;
                    }
                })
            })
        }
        
        const GLOBAL_STATE = {
            data: componentData,
            city: city,
            this_link: req.originalUrl,
            linkItem: linkItem,
            Item: Item
        }
        
        // get HTML string from the `App` component
        let appHTML = ReactDOMServer.renderToString(
            <StaticRouter location={ req.originalUrl }>
                <App globalState={GLOBAL_STATE} />
            </StaticRouter>
        );

        const helmet = Helmet.renderStatic();
        
        indexHTML = indexHTML.replace('<!-- title -->', `${componentData.title}`);
        indexHTML = indexHTML.replace('<!-- description -->', `<meta name="description" content="${componentData.description}" />`);
        
        indexHTML = indexHTML.replace(
            '<!-- title -->',
            `${helmet.title.toString()}`
        );
        
        indexHTML = indexHTML.replace(
            '<!-- description -->',
            `<meta name="description" content="${helmet.meta.toString()}" />`
        );
        
        let meta = '';
        
        meta = `
            <meta property="og:title" content="${componentData.title}">
            <meta property="og:description" content="${componentData.description}">
            <meta property="og:site_name" content="Жако роллы и пицца">
            <meta property="og:type" content="website">
            <meta property="og:url" content="https://jacofood.ru${req.originalUrl}">
        `;
        
        if( matchRoute.type == 'home' ){
            
            componentData.all.other.cats.baners.map( (item) => {
                meta += `
                    <link rel="preload" as="image" href="https://storage.yandexcloud.net/site-home-img/${ item.img_new+"3700х1000.webp?"+item.img_new_update }" />
                    <link rel="preload" as="image" href="https://storage.yandexcloud.net/site-home-img/${ item.img_new+"3700х1000.jpg?"+item.img_new_update }" />
                `;
            } )
            
            
        }
        
        
        
        
        if( matchRoute.type == 'item' ){  
            
            componentData.allItems.forEach(element => {
                element.items.forEach(item => {
                    if( item.link == linkItem ){
                        meta = `
                            <meta property="og:image" content="https://storage.yandexcloud.net/site-img/${item.img_new}300х200.jpg">
                            <meta property="og:image:width" content="300" />
                            
                            <meta property="og:title" content="${item.name}">
                            <meta property="og:description" content="${item.tmp_desc}">
                            <meta property="og:site_name" content="Жако роллы и пицца">
                            <meta property="og:type" content="website">
                            <meta property="og:url" content="https://jacofood.ru${req.originalUrl}">
                            
                        
                            <meta name="twitter:card" content="summary_large_image" /> 
                            <meta name="twitter:title" content="${item.name}" /> 
                            <meta name="twitter:desсription" content="${item.tmp_desc}" /> 
                            <meta name="twitter:image" content="https://storage.yandexcloud.net/site-img/${item.img_new}300х200.jpg" /> 
                        `;
                    }
                })
            });
        }
            
        indexHTML = indexHTML.replace('<!-- meta -->', `${meta}`);
        
        
        // populate `#app` element with `appHTML`
        indexHTML = indexHTML.replace( 
            '<div id="app"></div>', 
            `<div id="app">
                ${ appHTML }
            </div>` );
            
        // set value of `initial_state` global variable
        indexHTML = indexHTML.replace(
            'var initial_state = null;',
            `GLOBAL_STATE = ${JSON.stringify(GLOBAL_STATE)};`
        );

        // set header and status
        res.contentType( 'text/html' );
        res.status( matchRoute.code );

        return res.send( indexHTML );
    }
} );

// run express server on port 9000
app.listen( '8080', () => {
    console.log( 'Express server started at http://localhost:7990' );
} );