import { BASE_URL } from './index.js';

/**
 * Todo API 주소
 */
const TODOS_URL = `${BASE_URL}/todos`;

/**
 * 서버에서 폴더의 Todo 목록을 조회한다.
 * @param {string} folderId - 조회할 폴더 id
 * @returns {array<object>} 폴더의 Todo 목록
 */
export const fetchTodos = async (folderId) => {
    try {
        const res = await fetch(`${TODOS_URL}/${folderId}`);
        if (!res.ok) {
            throw Error(res);
        }

        const todos = await res.json();
        return todos;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 서버에서 중요함을 설정한 모든 Todo 목록을 조회한다.
 * @returns {array<object>} 중요함을 설정한 Todo 목록
 */
export const fetchImportantTodos = async () => {
    try {
        const res = await fetch(`${TODOS_URL}/important`);
        if (!res.ok) {
            throw Error(res);
        }

        const todos = await res.json();
        return todos;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 폴더에 새 Todo를 추가한다.
 * @param {string} folderId - 폴더 id
 * @param {string} content - 새로 추가할 Todo 내용
 * @returns {object} 새로 만든 Todo 데이터
 */
export const addTodo = async (folderId, content) => {
    try {
        const res = await fetch(TODOS_URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folderId, content }),
        });

        if (!res.ok) {
            throw Error(res);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * Todo 내용을 수정한다.
 * @param {string} id - 수정할 Todo id
 * @param {boolean} completed - 수정할 완료 상태
 * @param {boolean} important - 수정할 중요함 상태
 */
export const updateTodo = async (id, { completed, important } = {}) => {
    try {
        await fetch(`${TODOS_URL}/${id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed,
                important,
            }),
        })
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
