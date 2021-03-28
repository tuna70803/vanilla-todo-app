import { makeId } from './idGenerator.js';
import { getLocalFolder, updateLocalFolder } from './folderStorage.js';

/**
 * 세션 스토리지 Todo 목록 키
 */
const TODOS_KEY = 'todos';

/**
 * 세션 스토리지의 모든 Todo 목록을 리턴한다.
 * @returns {array<object>} Todo 목록
 */
const getLocalAllTodos = () => {
    const todos = sessionStorage.getItem(TODOS_KEY);
    if (!todos) {
        return [];
    }

    return JSON.parse(todos);
};

/**
 * 세션 스토리지에 모든 Todo 목록을 저장한다.
 * @param {array<object>} todos - Todo 목록
 */
const setLocalAllTodos = (todos) => {
    if (Array.isArray(todos) === false) {
        return;
    }

    sessionStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

/**
 * 세션 스토리지에서 폴더의 Todo 목록을 찾아 리턴한다.
 * @param {string} folderId - 폴더 id
 * @returns {array<object>} 폴더의 Todo 목록
 */
export const getLocalTodos = (folderId) => {
    if (!folderId) {
        return [];
    }

    const todos = getLocalAllTodos().filter(item => item.folder === folderId);
    return todos;
};

/**
 * 세션 스토리지에서 중요함을 설정한 모든 Todo를 찾아 리턴한다.
 * 폴더를 구분하지 않는다.
 * @returns {array<object>} 중요함을 설정한 Todo 목록
 */
export const getLocalImportantTodos = () => {
    const todos = getLocalAllTodos().filter(item => item.important);
    return todos;
};

/**
 * 폴더에 새 Todo를 추가한다.
 * @param {string} folderId - 폴더 id
 * @param {string} content - Todo 내용
 * @returns {object} 새로 만든 Todo 내용
 */
export const addLocalTodo = (folderId, content) => {
    if (!folderId || !content) {
        return null;
    }

    const folder = getLocalFolder(folderId);
    if (!folder) {
        return null;
    }

    const newTodo = {
        id: makeId(),
        folder: folderId,
        content: content,
        completed: false,
        important: false,
    };

    folder.todos.push(newTodo.id);
    updateLocalFolder(folder.id, { todos: folder.todos });

    const todos = getLocalAllTodos();
    todos.push(newTodo);
    setLocalAllTodos(todos);

    return newTodo;
};

/**
 * Todo 내용을 업데이트 한다.
 * @param {string} id - Todo id
 * @param {string} content - 수정할 내용
 * @param {boolean} completed - 완료 설정
 * @param {boolean} important - 중요함 설정
 * @returns {object} 업데이트한 Todo 내용
 */
export const updateLocalTodo = (id, { content, completed, important } = {}) => {
    if (!id) {
        return null;
    }

    const todos = getLocalAllTodos();
    const todo = todos.find(item => item.id === id);
    if (!todo) {
        return null;
    }

    if (content) {
        todo.content = content;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    if (important !== undefined) {
        todo.important = important;
    }

    setLocalAllTodos(todos);

    return todo;
};

/**
 * 폴더에서 완료한 Todo를 제거한다.
 * @param {string} folderId - 폴더 id
 */
export const sweepLocalTodos = (folderId) => {
    const folder = getLocalFolder(folderId);
    if (!folder) {
        return;
    }

    const allTodos = getLocalAllTodos();
    const todoIds = folder.todos;
    const remainIds = [];
    for (const id of todoIds) {
        const index = allTodos.findIndex(item => item.id === id);
        const todo = allTodos[index];
        if (todo.completed === false) {
            remainIds.push(todo.id);
            continue;
        }

        allTodos.splice(index, 1);
    }

    updateLocalFolder(folderId, { todos: remainIds });

    setLocalAllTodos(allTodos);
};
