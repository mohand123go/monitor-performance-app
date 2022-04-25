import {
  performance,
} from '../../core/Performance/Performance.services';

export default {
  UPDATE_CHART_DATA: ({ commit }) => performance().then(response => {
    commit('UPDATE_CHART_DATA', response);
    commit('UPDATE_ORIGIN_CHART_DATA', response);
  }),

};
