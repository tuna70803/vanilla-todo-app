import { createStore } from './useStore.js';

/**
 * Todo 저장소 상태를 변경한다.
 * @param {array<string>} state - 이전 Todo 저장소 상태
 * @param {string} action - 변경 액션 이름
 * @returns {array<string>} 변경한 Todo 저장소 상태
 */
const reducer = (state, action, ...args) => {
    switch (action) {
        case 'add':
            return add(state, ...args);
    }
};

/**
 * Todo 데이터를 추가한다.
 * @param {array<string>} state - 이전 Todo 저장소 상태
 * @param {string} content - 추가할 내용
 * @returns {array<string>} 변경한 Todo 저장소 상태
 */
const add = (state, content) => {
    state.push(content)
    return state;
}

/**
 * Todo 저장소 요소
 */
const [state, dispatch, subscribe] = createStore([], reducer);

/**
 * Todo 저장소 요소들을 리턴한다.
 * @returns {array} Todo 저장소 요소
 *   - state : Todo store state
 *   - dispatch(action, ...args) : 상태 변경 함수
 *   - subscribe(callback) : 구독 신청 함수
 */
const useTodos = () => [state, dispatch, subscribe];

export default useTodos;
