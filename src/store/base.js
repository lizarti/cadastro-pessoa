const SET_MENU_ITEMS = 'SET_MENU_ITEMS';
const SET_PAGE_TITLE = 'SET_PAGE_TITLE';

/* TYPES */
const initialState = {
  pageTitle: '',
  menu: {
    items: [
      // {
      //   label: 'Dashboard',
      //   icon: 'dashboard',
      //   action: 'dashboard',
      // },
      {
        label: 'Contatos',
        icon: 'users',
        action: 'contato.list',
      },
    ],
  },
};

const mutations = {
  [SET_MENU_ITEMS](state, menuItems) {
    state.menu.items = menuItems;
  },
  [SET_PAGE_TITLE](state, pageTitle) {
    state.pageTitle = pageTitle;
  },
};

const actions = {
  setMenuItems({ commit }, menuItems) {
    commit(SET_MENU_ITEMS, menuItems);
  },
  setPageTitle({ commit }, pageTitle) {
    commit(SET_PAGE_TITLE, pageTitle);
  },
};

const getters = {
  menuItems(state) {
    return state.menu.items;
  },
  pageTitle(state) {
    return state.pageTitle;
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters,
};
