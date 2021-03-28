import { makeId } from './idGenerator.js';

/**
 * 세션 스토리지 폴더 키
 */
const FOLDERS_KEY = 'folders';

/**
 * 세션 스토리지에 폴더 목록을 저장한다.
 * @param {array<object>} folders - 폴더 목록
 */
const setLocalFolders = (folders) => {
    if (Array.isArray(folders) === false) {
        return;
    }

    sessionStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
};

/**
 * 세션 스토리지에서 폴더 목록을 가져와 리턴한다.
 * @returns {array<object>} 폴더 목록
 */
export const getLocalFolders = () => {
    const folders = sessionStorage.getItem(FOLDERS_KEY);
    if (!folders) {
        return [];
    }

    return JSON.parse(folders);
};

/**
 * 세션 스토리지에서 폴더 데이터를 가져와 리턴한다.
 * @param {string} id - 폴더 id
 * @returns {object} 폴더 데이터. 데이터가 없으면 null.
 */
export const getLocalFolder = (id) => {
    const folders = getLocalFolders();
    const folder = folders.find(item => item.id === id);

    return folder || null;
};

/**
 * 세션 스토리지에 폴더를 새로 추가한다.
 * @param {string} name - 폴더 이름
 * @returns {object} 새로 만든 폴더 데이터
 */
export const addLocalFolder = (name) => {
    const folders = getLocalFolders();
    const newFolder = {
        id: makeId(),
        name: name,
        todos: [],
    };
    folders.push(newFolder);

    setLocalFolders(folders);

    return newFolder;
};

/**
 * 세션 스토리지의 폴더 내용을 업데이트 한다.
 * @param {string} id - 업데이트할 폴더 id
 * @param {string} name - 새 이름
 * @param {array<string>} todos - 새 Todo 목록
 */
export const updateLocalFolder = (id, { name, todos } = {}) => {
    if (!id) {
        return null;
    }

    const folders = getLocalFolders();
    const folder = folders.find(item => item.id === id);
    if (!folder) {
        return null;
    }

    if (name) {
        folder.name = name;
    }

    if (Array.isArray(todos)) {
        folder.todos = todos;
    }

    setLocalFolders(folders);

    return folder;
};
