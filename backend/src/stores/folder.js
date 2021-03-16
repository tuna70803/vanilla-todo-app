import store from 'store';
import { v4 as uuidv4 } from 'uuid';

/**
 * 모든 폴더 저장소 키
 */
const FOLDERS_KEY = 'folders';

/**
 * 저장소에서 모든 폴더를 읽어와 리턴한다.
 * @returns {array<object>} 모든 폴더 목록. 내용이 없으면 empty array.
 */
export const getFolders = () => {
    const folders = store.get(FOLDERS_KEY) || [];
    return folders;
};

/**
 * 저장소에서 지정한 폴더를 읽어와 리턴한다.
 * @param {string} id - 폴더 id
 * @returns {object} 폴더. 지정한 id인 폴더가 없으면 undefined.
 */
export const getFolder = (id) => {
    const folders = getFolders();
    const folder = folders.find(item => item.id === id);

    return folder;
};

/**
 * 폴더 내용을 교체한다.
 * @param {object} folder - 교체할 폴더 내용.
 *   폴더의 모든 내용이 있어야 한다.
 */
export const patchFolder = (folder) => {
    const folders = getFolders();
    const index = folders.findIndex(item => item.id === folder.id);
    if (index === -1) {
        return;
    }

    folders.splice(index, 1, folder);

    store.set(FOLDERS_KEY, folders);
};

/**
 * 폴더를 새로 추가한다.
 * @param {string} name - 폴더 이름
 * @returns {object} 새로 만든 폴더
 */
export const addFolder = (name) => {
    const folders = getFolders();
    const newFolder = {
        id: uuidv4(),
        name: name,
        todos: [],
    }
    folders.push(newFolder);

    store.set(FOLDERS_KEY, folders);

    return newFolder;
};
