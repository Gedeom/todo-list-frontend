import axios from 'axios';
import authHeader from '@/services/auth-header';
const API_URL = 'http://localhost:8888/api/v1/lists/';

const state = {
  lists: []
};

const mutations = {
  setLists: (state, lists) => { state.lists = lists }
};

const getters = {
  lists: state => state.lists

}

const actions = {

  async getLists({ commit }, board_id) {
    const res = await axios.post(API_URL + 'search',
      {
        "data": { "search": [{ "operator": "is", "field": "board_id", "value": board_id }] }
      }, { headers: authHeader() });

    commit("boards/setSelectedBoardLists", res.data.data, {root: true});
  },
  async createList({ commit }, data) {
    return await axios.post(API_URL, data, { headers: authHeader() });
  },

  async updateList({ commmit }, { data, id }) {
    return await axios.put(API_URL + id, data, { headers: authHeader() });
  },

  async deleteList({ commmit }, id) {
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

