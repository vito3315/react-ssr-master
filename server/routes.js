const { Home } = require( '../src/components/home' );
const { Item } = require( '../src/components/item' );
const { Contact } = require( '../src/components/contact' );
const { Actii } = require( '../src/components/actii' );
const { Profile } = require( '../src/components/profile' );

module.exports = [
    {
        path: '/:cityName/',
        exact: true,
        component: Home,
    },
    {
        path: '/:cityName/home',
        exact: true,
        component: Home,
    },
    {
        path: '/:cityName/contact',
        exact: true,
        component: Contact,
    },
    {
        path: '/:cityName/actii',
        exact: true,
        component: Actii,
    },
    {
        path: '/:cityName/item/:itemId',
        component: Item,
    },
    {
        path: '/',
        exact: true,
        component: Contact,
    },
    {
        path: '/:cityName/profile',
        exact: true,
        component: Profile,
    },
];