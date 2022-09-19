import axios from 'axios';
import authHeader from '@/services/auth-header';
const API_URL = 'http://localhost:8888/api/v1/projects/';

const state = {
  projects: []
};

const mutations = {
  setProjects: (state, projects) => { state.projects = projects }
};

const getters = {
  getProjects: state => { return state.projects }
}


const actions = {
  async getProjects({ commit }) {
    const res = await axios.get(API_URL,{ headers: authHeader() });
    commit("setProjects", res.data.data);
  },
  async createProject({ commit }, data) {
    return await axios.post(API_URL, data, { headers: authHeader() });
  },

  async updateProject({ commmit }, { data, id }) {
    return await axios.put(API_URL + id, data, { headers: authHeader() });
  },

  async deleteProject({ commmit }, id) {
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

