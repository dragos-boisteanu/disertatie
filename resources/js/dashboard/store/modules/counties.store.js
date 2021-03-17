import { downloadCounties, downloadCities } from '../../api/counties.api';

const initialState = () => ({
    counties: [],
});

const state = initialState();

const getters = {
    getCounties(state) {
        return state.counties;
    },
}

const actions = {

    async fetchCounties({commit}) {
        try {
            const response = await downloadCounties();
            commit('SET_COUNTRIES', response.data.data.counties);
        } catch ( error ) {
           throw error
        }
    },

    async fetchCitites({}, countyId) {
        try {
            const response = await downloadCities(countyId);
            return response.data.data.cities;
        } catch ( error ) {
            throw error;
        }
    }
}

const mutations = {
    SET_COUNTRIES(state, countries) {
        state.counties = countries;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}