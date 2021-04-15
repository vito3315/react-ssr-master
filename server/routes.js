const { Counter } = require( '../src/components/counter' );
const { Post } = require( '../src/components/post' );
const { Home } = require( '../src/components/home' );
const { Item } = require( '../src/components/item' );
const { Contact } = require( '../src/components/contact' );
const { Actii } = require( '../src/components/actii' );

module.exports = [
    {
        path: '/',
        exact: true,
        component: Counter,
    },
    {
        path: '/post',
        exact: true,
        component: Post,
    },
    {
        path: '/home',
        exact: true,
        component: Home,
    },
    {
        path: '/contact',
        exact: true,
        component: Contact,
    },
    {
        path: '/actii',
        exact: true,
        component: Actii,
    },
    {
        path: '/item/:id',
        component: Item,
    },
];