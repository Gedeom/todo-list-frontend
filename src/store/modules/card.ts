import axios from 'axios';
import authHeader from '@/services/auth-header';
const API_URL = 'http://localhost:8888/api/v1/cards/';

const state = {
  cards: []
};

const mutations = {
  setCards: (state, cards) => { state.cards = cards }
};

const getters = {
  getCards: state => { return state.cards }
}


const actions = {
  async getCards({ commit }, board_id) {
    const res = await axios.post(API_URL + 'search',
      {
        "data": { "search": [{ "operator": "is", "field": "board_id", "value": board_id }] }
      },
      { headers: authHeader() });
    commit("setCards", res.data.data);
  },
  async createCard({ commit }, data) {
    return await axios.post(API_URL, data, { headers: authHeader() });
  },

  async updateCard({ commmit }, { data, id }) {
    return await axios.patch(API_URL + id, data, { headers: authHeader() });
  },

  async deleteCard({ commmit }, id) {
    return await axios.delete(API_URL + id, { headers: authHeader() });
  },
  async saveMoveCard({ commit }, { data, id }) {
    return await axios.put(API_URL + id + '/move', data, { headers: authHeader() });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};

