const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { StaticRouter, matchPath } = require( 'react-router-dom' );
const {Helmet} = require("react-helmet");

import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//const compression = require('compression');
// create express application
const app = express();
//app.use(compression());

// import App component
const { App } = require( '../src/components/app' );

// import routes
const routes = require( './routes' );

// serve static assets
app.get( /\.(js|css|map|ico|png|svg|htaccess|xml|txt)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

app.get( /\.(eot|ttf|woff|woff2)$/, express.static( path.resolve( __dirname, '../dist/assets/fonts' ) ) );

/*app.get('*.js', (req, res, next) => {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});*/

//app.use(express.static('public'));

//app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=86400')
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

    if( req.originalUrl.indexOf('.js') ){
        express.static( path.resolve( __dirname, '../dist' ) );
    }

    /*if( req.originalUrl.indexOf('b3ce5e32a5e236fccfae.ttf') ){
        express.static( path.resolve( __dirname, '../dist/b3ce5e32a5e236fccfae.ttf' ) );
    }

    if( req.originalUrl.indexOf('FuturaFuturisC-Bold.ttf') ){
        express.static( path.resolve( __dirname, '../dist/FuturaFuturisC-Bold.ttf' ) );
    }*/
    
    //console.log( 'url', req )
    
    let ckeck_no_index = false;
    
    if( req.originalUrl.split('?')[1] ){
        ckeck_no_index = true;
    }
    
    req.originalUrl = req.originalUrl.split('?')[0];
    req.originalUrl = req.originalUrl.split('#')[0];
    
    if( req.originalUrl == '/' || req.originalUrl == '' ){
        res.status( 302 );
        return res.redirect("/togliatti")
    }
    
    let lastChar = req.originalUrl.substr(req.originalUrl.length - 1);
    
    if( lastChar == '/' ){
        res.status( 301 );
        return res.redirect( req.originalUrl.substring(0, req.originalUrl.length - 1) )
    }
    
    let city = req.originalUrl.split('/');
    city = city.filter( (item) => item != '' ); 
    city = city[0];
    
    const matchRoute = routes.find( route => matchPath( req.originalUrl, route ) );

    if( matchRoute ){
        let componentData = null;
        if( typeof matchRoute.component.fetchData === 'function' ) {
            componentData = await matchRoute.component.fetchData(req.originalUrl);
        }

        if( !componentData || componentData.st === false ){
            if( !componentData ){
                res.status( 404 );
                return res.redirect("/togliatti")
            }
            
            res.status( 404 );
            return res.redirect("/"+city)
        }
        
        let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/index.html' ), {
            encoding: 'utf8',
        } );

        let linkItem = '';
        let Item = null;
        
        let findItem = null;
        
        if( matchRoute.type == 'item' ){  
            let linkItem1 = req.originalUrl.split("/");
            
            findItem = linkItem1.find( (item) => item == 'item' );
            
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
        
        const GLOBAL_DEVICE = parser(req.headers['user-agent']).device.type || 'desktop';
        /*const ssrMatchMedia = (query) => ({
            matches: mediaQuery.match(query, {
            // The estimated CSS width of the browser.
            width: deviceType === 'mobile' ? '0px' : '600px',
            }),
        });*/

        const GLOBAL_STATE = {
            deviceType: deviceType,
            parser11: req.headers,
            data: componentData,
            city: city,
            this_link: req.originalUrl,
            linkItem: linkItem,
            Item: Item,
            //ssrMatchMedia: ssrMatchMedia(deviceType),
            
        }
        
        //console.log( 'ssrMatchMedia', ssrMatchMedia )
        console.log( 'deviceType', deviceType )
        console.log( 'parser', req.headers )

        let appHTML = ReactDOMServer.renderToString(
            <StaticRouter location={ req.originalUrl }>
                <App globalState={GLOBAL_STATE} globalDevice={GLOBAL_DEVICE} />
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
        
        if( ckeck_no_index ){
            meta += `<meta name="robots" content="noindex" />`;
        }
        
        if( matchRoute.type == 'home' ){
            componentData.all.other.cats.baners.map( (item) => {
                meta += `
                    <link rel="preload" as="image" href="https://storage.yandexcloud.net/site-home-img/${ item.img_new+"3700х1000.webp?"+item.img_new_update }" />
                    <link rel="preload" as="image" href="https://storage.yandexcloud.net/site-home-img/${ item.img_new+"3700х1000.jpg?"+item.img_new_update }" />
                `;
            } )
        }
        
        if( matchRoute.type == 'item' ){  
            let tmp_desc = '';

            componentData.allItems.forEach(element => {
                element.items.forEach(item => {
                    if( item.link == linkItem ){

                        tmp_desc = item.marc_desc_full.length > 0 ? item.marc_desc_full : item.tmp_desc;

                        meta = `
                            <meta property="og:image" content="https://storage.yandexcloud.net/site-img/${item.img_new}300х200.jpg">
                            <meta property="og:image:width" content="300" />
                            
                            <meta property="og:title" content="${item.name}">
                            <meta property="og:description" content="${tmp_desc}">
                            <meta property="og:site_name" content="Жако роллы и пицца">
                            <meta property="og:type" content="website">
                            <meta property="og:url" content="https://jacofood.ru${req.originalUrl}">
                            
                        
                            <meta name="twitter:card" content="summary_large_image" /> 
                            <meta name="twitter:title" content="${item.name}" /> 
                            <meta name="twitter:desсription" content="${tmp_desc}" /> 
                            <meta name="twitter:image" content="https://storage.yandexcloud.net/site-img/${item.img_new}300х200.jpg" /> 
                        `;
                        
                        if( !findItem ){
                            meta += `<meta name="robots" content="noindex" />`;
                        }
                    }
                })
            });
        }
            
        indexHTML = indexHTML.replace('<!-- meta -->', `${meta}`);
        
        indexHTML = indexHTML.replace( 
            '<div id="app"></div>', 
            `<div id="app">
                ${ appHTML }
            </div>` );
            
        indexHTML = indexHTML.replace(
            'var initial_state = null;',
            `GLOBAL_STATE = ${JSON.stringify(GLOBAL_STATE)};`
        );

        indexHTML = indexHTML.replace(
            'var GLOBAL_DEVICE = null;',
            `GLOBAL_DEVICE = ${JSON.stringify(GLOBAL_DEVICE.toString())};`
        );

        if( city == 'togliatti' ){
            indexHTML = indexHTML.replace(
                '<!-- city_script -->',
                `<script type="text/javascript">!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("VK-RTRG-1473124-g35FP"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script><noscript><img src="https://vk.com/rtrg?p=VK-RTRG-1473124-g35FP" style="position:fixed; left:-999px;" alt=""/></noscript>`
            );
        }

        if( city == 'samara' ){
            indexHTML = indexHTML.replace(
                '<!-- city_script -->',
                `<script type="text/javascript">!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("VK-RTRG-1473143-e3HQT"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script><noscript><img src="https://vk.com/rtrg?p=VK-RTRG-1473143-e3HQT" style="position:fixed; left:-999px;" alt=""/></noscript>`
            );
        }

        res.set('Cache-Control', 'public, max-age=86400')
        res.set('Set-Cookie', 'SameSite=None')
        res.set('Accept-Encoding', 'gzip, compress, br')

        res.contentType( 'text/html' );
        res.status( matchRoute.code );

        return res.send( indexHTML );
    }
} );

// run express server on port 9000
app.listen( '8080', () => {
    console.log( 'Express server started at http://localhost:7990' );
} );