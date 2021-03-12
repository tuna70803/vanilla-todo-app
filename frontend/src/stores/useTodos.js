import { createStore } from './useStore.js';

/**
 * Todo 저장소 상태를 변경한다.
 * @param {array<object>} state - 이전 Todo 저장소 상태
 * @param {string} action - 변경 액션 이름
 */
const reducer = (state, action, ...args) => {
    switch (action) {
        case 'add':
            add(state, ...args);
            break;
        case 'toggleCompleted':
            toggleCompleted(state, ...args);
            break;
        case 'toggleImportant':
            toggleImportant(state, ...args);
            break;
    }
};

/**
 * Todo 데이터를 추가한다.
 * @param {array<string>} state - Todo 저장소 상태
 * @param {string} content - 추가할 내용
 */
const add = (state, content) => {
    state.push({
        id: generateId.next().value,
        folder: '',
        content: content,
        completed: false,
        important: false,
    });
};

/**
 * id 생성기
 * @returns {number} 생성한 id
 */
const generateId = idGenerator();

/**
 * id 생성 제너레이터
 * @returns {number} 생성한 id
 */
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

/**
 * Todo 아이템 완료 상태를 토글한다.
 * @param {array<object>} state - Todo 저장소 상태
 * @param {number} id - Todo id
 */
const toggleCompleted = (state, id) => {
    const todo = state.find(itme => itme.id === id);
    if (!todo) {
        return;
    }

    todo.completed = !todo.completed;
};

/**
 * Todo 아이템 중요함 설정을 토글한다.
 * @param {array<object>} state - Todo 저장소 상태
 * @param {number} id - Todo id
 */
const toggleImportant = (state, id) => {
    const todo = state.find(item => item.id === id);
    if (!todo) {
        return;
    }

    todo.important = !todo.important;
};

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
