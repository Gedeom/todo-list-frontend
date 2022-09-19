import axios from 'axios';
import authHeader from '@/services/auth-header';
const API_URL = 'http://localhost:8888/api/v1/boards/';

const state = {
  boards: [],
  selectedBoard: 0,
  selectedBoardLists: [],
  selectedBoardActivities: []

};

const mutations = {
  setBoards: (state, boards) => { state.boards = boards },
  setselectedBoard: (state, board) => { state.selectedBoard = board },
  setSelectedBoardLists: (state, lists) => { state.selectedBoardLists = lists },
  setSelectedBoardActivities: (state, activities) => { state.selectedBoardActivities = activities },
  setActivity: (state, data) => {
    state.selectedBoardActivities.unshift(data);
  },
  setReorderCardsList: (state, list_id) => {
    state.selectedBoardLists.find(fil => {
      return fil.id == list_id;
    }).cards.map((e, i) => {
      return e.sequence = i + 1;
    });
  },
  setInsertOrUpdateList(state, { data, id = false }) {
    if (id) {
      Object.assign(state.selectedBoardLists.find(e => {
        return e.id == data.id
      }), data);
      return;
    }
    state.selectedBoardLists.push(data);
  },
  setInsertOrUpdateCard(state, { data, id = false }) {

    if (id) {
      Object.assign(state.selectedBoardLists
        .find(e => e.id == data.list.id)
        .cards.find(e => e.id == data.id), data);

      return;
    }

    state.selectedBoardLists.find(e => e.id == data.list.id).cards.push(data);
  },
  setArchivedList(state, id) {
    state.selectedBoardLists.find(e => e.id == id).archived = 1;
  },

  setInsertOrUpdateBoard(state, { data, id = false }) {
    if (id) {
      Object.assign(state.boards.find(e => e.id == id), data);
      return;
    }

    state.boards.push(data);
  },
};

const getters = {
  getBoards: state => state.boards,
  getCurrentBoard: (state) => state.selectedBoard,
  getSelectedBoardLists: (state) => state.selectedBoardLists,
  getSelectedBoardActivities: (state) => state.selectedBoardActivities,
  getActiveSelectedBoardLists: (state) => {
    return state.selectedBoardLists.slice().filter(e => !e.archived);
  }
}

const actions = {
  getList: ({ getters }, { list_id }) => {
    return getters.getSelectedBoardLists.find(e => {
      return e.id == list_id;
    });
  },
  getCard: ({ getters }, { list_id, card_id }) => {
    return getters.getSelectedBoardLists.find(e => {
      return e.id == list_id;
    })?.cards?.find(ec => {
      return ec.id == card_id;
    });
  },
  async getBoards({ commit }) {
    const res = await axios.get(API_URL, { headers: authHeader() });

    commit("setBoards", res.data.data);
  },
  async createBoard({ commit }, data) {
    return await axios.post(API_URL, data, { headers: authHeader() });
  },
  async updateBoard({ commit }, { data, id }) {
    return await axios.put(API_URL + id, data, { headers: authHeader() });
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
