import { createStore } from './useStore.js';
import idGenerator from '../utils/idGenerator.js';

/**
 * Folder 저장소를 변경한다.
 * @param {array<object>} state - Folder 저장소
 * @param {string} action - 변경 액션 이름
 */
const reducer = (state, action, ...args) => {
    switch (action) {
        case 'add':
            add(state, ...args);
            break;
    }
};

/**
 * Folder를 새로 만든다.
 * @param {array<object>} state - Folder 저장소
 * @param {string} name - 폴더 이름
 */
const add = (state, name) => {
    state.push({
        id: generateId.next().value,
        name: name,
        count: 0,
    });
}

/**
 * id 생성기
 * @returns {number} 생성한 id
 */
const generateId = idGenerator();

/**
 * Folder 저장소 요소
 */
const [state, dispatch, subscribe] = createStore([], reducer);

/**
 * Folder 저장소 요소들을 리턴한다.
 * @returns {array} Folder 저장소 요소
 *   - state : Folder store state
 *   - dispatch(action, ...args) : 상태 변경 함수
 *   - subscribe(callback) : 구독 신청 함수
 */
const useFolders = () => [state, dispatch, subscribe];

export default useFolders;
