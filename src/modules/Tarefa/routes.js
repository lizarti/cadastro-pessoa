const New = () => import(/* webpackChunkName: "Tarefa" */ './pages/New');

const routes = [
  {
    name: 'tarefa.new',
    path: '/tarefas/nova',
    component: New,
    meta: {
      requiresAuth: true,
      module: 'Tarefa',
    },
  },
];

export default routes;
