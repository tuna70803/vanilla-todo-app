import { fetchFolders, addFolder } from '../apis/folder.js';
import { createStore } from './useStore.js';
import useTodo from './useTodo.js';

/**
 * Folder 저장소를 변경한다.
 * @param {object} state - Folder 저장소
 * @param {string} action - 변경 액션 이름
 */
const reducer = async (state, action, ...args) => {
    switch (action) {
        case 'fetchAll':
            await fetchAll(state);
            break;
        case 'select':
            select(state, ...args);
            break;
        case 'selectImportant':
            selectImportant(state);
            break;
        case 'add':
            await add(state, ...args);
            break;
    }
};

/**
 * 모든 폴더를 조회하고 저장한다.
 * @param {object} state - 저장소
 */
const fetchAll = async (state) => {
    try {
        const list = await fetchFolders();
        state.folders = list;
    } catch {}
};

/**
 * 현재 선택 폴더를 설정한다.  
 * 폴더의 Todo 목록을 조회한다.
 * @param {object} state - 저장소
 * @param {string} id - 폴더 id
 */
const select = (state, id) => {
    state.current = id;

    const [, dispatch] = useTodo();
    dispatch('fetchAll', id);
};

/**
 * 중요함 폴더를 현재 폴더로 선택한다.  
 * 중요함을 설정한 모든 Todo 목록을 조회하고 표시한다.
 * @param {object} state - 저장소
 */
const selectImportant = (state) => {
    state.current = 'important';

    const [, dispatch] = useTodo();
    dispatch('fetchImportant');
}

/**
 * Folder를 새로 만든다.  
 * 만든 뒤, 폴더 목록을 갱신한다.
 * @param {object} state - 저장소
 * @param {string} name - 폴더 이름
 */
const add = async (state, name) => {
    try {
        await addFolder(name);
        await fetchAll(state);
    } catch {}
}

/**
 * Folder 저장소 요소
 */
const [state, dispatch, subscribe] = createStore(
    { folders: [], current: null },
    reducer,
);

/**
 * Folder 저장소 요소들을 리턴한다.
 * @returns {array} Folder 저장소 요소
 *   - state : Folder store state
 *   - dispatch(action, ...args) : 상태 변경 함수
 *   - subscribe(callback) : 구독 신청 함수
 */
const useFolders = () => [state, dispatch, subscribe];

export default useFolders;
