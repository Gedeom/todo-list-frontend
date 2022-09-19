import axios from 'axios';
import authHeader from '@/services/auth-header';
const API_URL = 'http://localhost:8888/api/v1/categories/';

const state = {
  categories: []
};

const mutations = {
  setCategories: (state, categories) => { state.categories = categories }
};

const getters = {
  getCategories: state => { return state.categories }
}


const actions = {
  async getCategories({ commit }) {
    const res = await axios.get(API_URL,{ headers: authHeader() });
    commit("setCategories", res.data.data);
    return res;
  },
  async createCategory({ commit }, data) {
    return await axios.post(API_URL, data, { headers: authHeader() });
  },

  async updateCategory({ commmit }, { data, id }) {
    return await axios.put(API_URL + id, data, { headers: authHeader() });
  },

  async deleteCategory({ commmit }, id) {
    return await axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};

