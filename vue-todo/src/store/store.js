import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i=0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
        headerText: "TODO it!",
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state, todoItem) { // event emit 시 적은 인자까지 여기서 받는
            const obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj); // 이를 통홰 화면과 localstorage 동기화.
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1); // 화면에 뿌려주는 todoItems에서 제거했으니 당연히. 이걸 동기화라고 부르자.
        },
        toggleOneItem(state, payload) {
            // todoItem.completed = !todoItem.completed;
            // App.vue에 todoItems가 있음을 활용하여 anti code를 없애보자
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = []; // 이렇게 해야 localstorage와 화면이 동기화되는 것이라는 사실! 동기화!
        },
    },

});