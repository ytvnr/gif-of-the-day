import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Component from '@/views/Schedule';

describe('Component', () => {
    let wrapper;
    let actions;
    let state;
    let getters;
    let store;

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(Vuex);

        state = {
            clicks: 2,
        };

        getters  = {};

        actions = {
            moduleActionClick: jest.fn(),
        };

        store = new Vuex.Store({
            state,
            actions,
            getters,
        });

        wrapper = shallowMount(Component, {
            store,
            localVue,
        });
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
