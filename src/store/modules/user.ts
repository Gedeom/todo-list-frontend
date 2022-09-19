import axios from 'axios';
import authHeader from '@/services/auth-header';
const API_URL = 'http://localhost:8888/api/v1/users/';

const state = {
  users: []
};

const mutations = {
  setUsers: (state, users) => { state.users = users }
};

const getters = {
  getUsers: state => { return state.users }
}


const actions = {
  async getUsers({ commit }) {
    const res = await axios.get(API_URL,{ headers: authHeader() });
    commit("setUsers", res.data.data);
    return res;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};

