import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from "./modules/auth.module";
import boards from './modules/board';
import lists from './modules/list';
import cards from './modules/card';
import categories from './modules/category';
import activities from './modules/activity';
import projects from './modules/project'
import users from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    boards,
    lists,
    cards,
    activities,
    categories,
    projects,
    users
  },
});
export default store;