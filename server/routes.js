const { Home } = require( '../src/components/home' );
const { Item } = require( '../src/components/item' );
const { Contact } = require( '../src/components/contact' );
const { Actii } = require( '../src/components/actii' );
const { Profile } = require( '../src/components/profile' );
const { NotFound } = require( '../src/components/app' );
const { Cart } = require( '../src/components/cart' );


module.exports = [
    {
        path: '/:cityName/',
        exact: true,
        component: Home,
        code: 200
    },
    {
        path: '/:cityName/home',
        exact: true,
        component: Home,
        code: 200
    },
    {
        path: '/:cityName/menu',
        exact: true,
        component: Home,
        code: 200
    },
    {
        path: '/:cityName/contact',
        exact: true,
        component: Contact,
        code: 200
    },
    {
        path: '/:cityName/actii',
        exact: true,
        component: Actii,
        code: 200
    },
    {
        path: '/:cityName/menu/:itemLink',
        component: Item,
        code: 200
    },
    {
        path: '/',
        exact: true,
        component: Contact,
        code: 200
    },
    {
        path: '/:cityName/profile',
        exact: true,
        component: Profile,
        code: 200
    },
    {
        path: '/:cityName/cart',
        exact: true,
        component: Cart,
        code: 200
    },
    {
        path: '*',
        component: NotFound,
        code: 404
    },
];