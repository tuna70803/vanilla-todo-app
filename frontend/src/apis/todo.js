import { BASE_URL } from './index.js';
import { getAppType } from '../utils/settings.js';
import {
    getLocalTodos,
    getLocalImportantTodos,
    addLocalTodo,
    updateLocalTodo,
    sweepLocalTodos,
} from '../local/todoStorage.js';

/**
 * Todo API 주소
 */
const TODOS_URL = `${BASE_URL}/todos`;

/**
 * 서버 또는 로컬에서 폴더의 Todo 목록을 조회한다.
 * @param {string} folderId - 조회할 폴더 id
 * @returns {array<object>} 폴더의 Todo 목록
 */
export const fetchTodos = async (folderId) => {
    if (getAppType() === 'demo') {
        const todos = getLocalTodos(folderId);
        return todos;
    }

    try {
        const todos = await fetchServerTodos(folderId);
        return todos;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 서버에서 폴더의 Todo 목록을 조회한다.
 * @param {string} folderId - 조회할 폴더 id
 * @returns {array<object>} 폴더의 Todo 목록
 */
const fetchServerTodos = async (folderId) => {
    try {
        const res = await fetch(`${TODOS_URL}/${folderId}`);
        if (!res.ok) {
            throw Error(res);
        }

        const todos = await res.json();
        return todos;
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * 서버 또는 로컬에서 중요함을 설정한 모든 Todo 목록을 조회한다.
 * @returns {array<object>} 중요함을 설정한 Todo 목록
 */
export const fetchImportantTodos = async () => {
    if (getAppType() === 'demo') {
        const todos = getLocalImportantTodos();
        return todos;
    }

    try {
        const todos = await fetchServerImportantTodos();
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
const fetchServerImportantTodos = async () => {
    try {
        const res = await fetch(`${TODOS_URL}/important`);
        if (!res.ok) {
            throw Error(res);
        }

        const todos = await res.json();
        return todos;
    } catch (error) {
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
    if (getAppType() === 'demo') {
        const todoData = addLocalTodo(folderId, content);
        return todoData;
    }

    try {
        const todoData = await addServerTodo(folderId, content);
        return todoData;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 서버의 폴더에 새 Todo를 추가한다.
 * @param {string} folderId - 폴더 id
 * @param {string} content - 새로 추가할 Todo 내용
 * @returns {object} 새로 만든 Todo 데이터
 */
const addServerTodo = async (folderId, content) => {
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
    if (!id) {
        return;
    }

    if (getAppType() === 'demo') {
        updateLocalTodo(id, { completed, important });
        return;
    }

    try {
        await updateServerTodo(id, { completed, important });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 서버의 Todo 내용을 수정한다.
 * @param {string} id - 수정할 Todo id
 * @param {boolean} completed - 수정할 완료 상태
 * @param {boolean} important - 수정할 중요함 상태
 */
const updateServerTodo = async (id, { completed, important } = {}) => {
    try {
        await fetch(`${TODOS_URL}/${id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed,
                important,
            }),
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * 폴더의 완료한 Todd 아이템들을 제거한다.
 * @param {string} folderId - 폴더 id
 */
export const sweepTodos = async (folderId) => {
    if (!folderId) {
        return;
    }

    if (getAppType() === 'demo') {
        sweepLocalTodos(folderId);
        return;
    }

    try {
        await sweepServerTodos(folderId);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 서버내 폴더의 완료한 Todd 아이템들을 제거한다.
 * @param {string} folderId - 폴더 id
 */
const sweepServerTodos = async (folderId) => {
    try {
        await fetch(`${TODOS_URL}/sweep/${folderId}`, { method: 'delete' });
    } catch (error) {
        return Promise.reject(error);
    }
};
