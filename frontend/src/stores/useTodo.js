import {
    fetchTodos,
    fetchImportantTodos,
    addTodo,
    updateTodo,
    sweepTodos,
} from '../apis/todo.js';
import { createStore } from './useStore.js';
import useFolder from './useFolder.js';

/**
 * Todo 저장소를 변경한다.
 * @param {object} state - 이전 Todo 저장소
 * @param {string} action - 변경 액션 이름
 */
const reducer = async (state, action, ...args) => {
    switch (action) {
        case 'fetchAll':
            await fetchAll(state, ...args);
            break;
        case 'fetchImportant':
            await fetchImportant(state);
            break;
        case 'add':
            await add(state, ...args);
            break;
        case 'toggleCompleted':
            await toggleCompleted(state, ...args);
            break;
        case 'toggleImportant':
            await toggleImportant(state, ...args);
            break;
        case 'sweep':
            await sweep(state, ...args);
            break;
    }
};

/**
 * 폴더의 Todo 아이템을 조회하고 저장한다.
 * @param {object} state - 저장소
 * @param {string} folderId - 폴더 id
 */
const fetchAll = async (state, folderId) => {
    try {
        const list = await fetchTodos(folderId);
        state.todos = list;
    } catch {}
};

/**
 * 중요함을 설정한 모든 Todo 아이템을 조회하고 저장한다.
 * @param {object} state - 저장소
 */
const fetchImportant = async (state) => {
    try {
        const list = await fetchImportantTodos();
        state.todos = list;
    } catch {}
};

/**
 * Todo를 추가한다.  
 * 추가한 뒤, Todo 목록을 갱신한다.
 * @param {object} state - 저장소
 * @param {string} content - 추가할 내용
 */
const add = async (state, content) => {
    try {
        const [folderState] = useFolder();
        await addTodo(folderState.current, content);
        await fetchAll(state, folderState.current);
    } catch {}
};

/**
 * Todo 아이템 완료 상태를 토글한다.
 * @param {array<object>} state - Todo 저장소 상태
 * @param {number} id - Todo id
 */
const toggleCompleted = async (state, id) => {
    const todo = state.todos.find(itme => itme.id === id);
    if (!todo) {
        return;
    }

    const newCompleted = !todo.completed;
    try {
        const [folderState] = useFolder();
        await updateTodo(id, { completed: newCompleted });
        await fetchAll(state, folderState.current);
    } catch {}
};

/**
 * Todo 아이템 중요함 설정을 토글한다.
 * @param {array<object>} state - Todo 저장소 상태
 * @param {number} id - Todo id
 */
const toggleImportant = async (state, id) => {
    const todo = state.todos.find(item => item.id === id);
    if (!todo) {
        return;
    }

    const newImportant = !todo.important;
    try {
        const [folderState] = useFolder();
        await updateTodo(id, { important: newImportant });
        await fetchAll(state, folderState.current);
    } catch {}
};

/**
 * 폴더에서 완료한 Todo 아이템들을 제거한다.  
 * 제거 후, 폴더와 Todo 목록을 새로 갱신한다.
 * @param {object} state - 저장소 상태
 * @param {string} folderId - 폴더 id
 */
const sweep = async (state, folderId) => {
    try {
        if (!folderId) {
            return;
        }

        await sweepTodos(folderId);

        const [, dispatch] = useFolder();
        await dispatch('fetchAll');

        await fetchAll(state, folderId);
    } catch {}
};

/**
 * Todo 저장소 요소
 */
const [state, dispatch, subscribe] = createStore(
    { todos: [] },
    reducer,
);

/**
 * Todo 저장소 요소들을 리턴한다.
 * @returns {array} Todo 저장소 요소
 *   - state : Todo store state
 *   - dispatch(action, ...args) : 상태 변경 함수
 *   - subscribe(callback) : 구독 신청 함수
 */
const useTodo = () => [state, dispatch, subscribe];

export default useTodo;
