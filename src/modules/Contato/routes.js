const List = () => import(/* webpackChunkName: "Contato" */ './pages/List');
const New = () => import(/* webpackChunkName: "Contato" */ './pages/New');
const Edit = () => import(/* webpackChunkName: "Contato" */ './pages/Edit');

const routes = [
  {
    name: 'contato.list',
    path: '/contatos',
    component: List,
    meta: {
      requiresAuth: true,
      module: 'Contato',
    },
  },
  {
    name: 'contato.new',
    path: '/contatos/novo',
    component: New,
    meta: {
      requiresAuth: true,
      module: 'Contato',
    },
  },
  {
    name: 'contato.edit',
    path: '/contatos/:id',
    component: Edit,
    meta: {
      requiresAuth: true,
      module: 'Contato',
    },
  },
];

export default routes;
