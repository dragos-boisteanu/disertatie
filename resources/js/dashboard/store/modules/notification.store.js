const initialState = () => ({
    notification: {
        type: '',
        message: '',
        activeTime: 4000,
        show: false,
    }
});

const state = initialState();

const getters = {
    getNotification(state) {
        return state.notification;
    },
}

const actions = {
    openNotification({ commit }, payload) {
        commit('OPEN_NOTIFICATION', payload);
    },

    closeNotification({ commit }, payload) {
        commit('CLOSE_NOTIFICATION', payload);
    }
}

const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    },
    
    OPEN_NOTIFICATION(state, payload) {      
        state.notification.show = payload.show;
        state.notification.type = payload.type;
        state.notification.message = payload.message;
    },

    CLOSE_NOTIFICATION(state) {
        state.notification.show = false,
        state.notification.type = '',
        state.notification.message = ''
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}