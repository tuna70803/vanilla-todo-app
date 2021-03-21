import store from 'store';
import { v4 as uuidv4 } from 'uuid';
import { getFolder, patchFolder } from './folder.js';

/**
 * 모든 Todo 아이템 저장소 키
 */
const TODOS_KEY = 'todos';

/**
 * 모든 Todo 아이템을 읽어와 리턴한다.
 * @return {array<object>} 모든 Todo 아이템 목록
 */
export const getAllTodos = () => {
    const todos = store.get(TODOS_KEY) || [];
    return todos;
};

/**
 * 지정한 폴더의 Todo 아이템을 읽어와 리턴한다.
 * @param {string} folderId - 폴더 id
 * @returns {array<object>} Todo 목록. 에러시 empty array.
 */
export const getTodos = (folderId) => {
    if (!folderId) {
        return [];
    }

    const todos = getAllTodos().filter(item => item.folder === folderId);
    return todos;
};

/**
 * 폴더에 Todo를 추가한다.
 * @param {string} folderId - 폴더 id
 * @param {string} content - 추가할 Todo 내용
 * @returns {object} 새로 만든 Todo. 에러시 null.
 */
export const addTodo = (folderId, content) => {
    const folder = getFolder(folderId);
    if (!folder) {
        return null;
    }

    const newTodo = {
        id: uuidv4(),
        folder: folderId,
        content: content,
        completed: false,
        important: false,
    };

    folder.todos.push(newTodo.id);
    patchFolder(folder);

    const todos = getAllTodos();
    todos.push(newTodo);
    store.set(TODOS_KEY, todos);

    return newTodo;
};

/**
 * Todo 내용을 수정한다.
 * @param {string} id - 변경할 Todo id
 * @param {string} content - 변경할 Todo 내용
 * @param {boolean} completed - 변경할 완료 상태
 * @param {boolean} important - 변경할 중요함 상태
 * @returns {object} 변경한 Todo 내용. 에러시 null.
 */
export const updateTodo = (id, { content, completed, important } = {}) => {
    const todos = getAllTodos();
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

    patchTodo(todo);

    return todo;
};

/**
 * 저장소에 Todo 내용을 새로 저장한다.
 * @param {object} todo - 새로 저장할 Todo 내용
 */
export const patchTodo = (todo) => {
    const todos = getAllTodos();
    const index = todos.findIndex(item => item.id === todo.id);
    if (index === -1) {
        return;
    }

    todos.splice(index, 1, todo);

    store.set(TODOS_KEY, todos);
};
