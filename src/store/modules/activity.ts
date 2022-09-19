import axios from 'axios';
import authHeader from '@/services/auth-header';
const API_URL = 'http://localhost:8888/api/v1/activities/';

const state = {
  activities: [],
};

const mutations = {
  setActivities: (state, activities) => { state.activities = activities },
};

const getters = {
  activities: state => state.activities
}

const actions = {
  async getActivities({ commit }, board_id) {
    const res = await axios.post(API_URL + 'search',
      {
        "data": { "search": [{ "operator": "is", "field": "board_id", "value": board_id }] }
      },
      { headers: authHeader() });

    commit("boards/setSelectedBoardActivities", res.data.data.slice().reverse(), { root: true });
  },
  async saveActivity({ commit }, { board_id, description }) {
    const res = await axios.post(API_URL, { board_id, description }, { headers: authHeader() });
    return res;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};

