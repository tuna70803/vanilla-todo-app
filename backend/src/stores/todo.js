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
}

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
