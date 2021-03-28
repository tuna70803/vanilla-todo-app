import { BASE_URL } from './index.js';
import { getAppType } from '../utils/settings.js';
import {
    getLocalFolders,
    addLocalFolder,
    updateLocalFolder,
} from '../local/folderStorage.js';

/**
 * 폴더 API 주소
 */
const FOLDERS_URL = `${BASE_URL}/folders`;

/**
 * 서버 또는 로컬에서 폴더 목록을 조회한다.
 * @returns {array<object>} 폴더 목록
 */
export const fetchFolders = async () => {
    if (getAppType() === 'demo') {
        const folders = getLocalFolders();
        return folders;
    }

    try {
        const folders = await fetchServerFolders();
        return folders;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 서버에서 폴더 목록을 조회한다.
 * @returns {array<object>} 폴더 목록
 */
const fetchServerFolders = async () => {
    try {
        const res = await fetch(FOLDERS_URL);
        if (!res.ok) {
            throw Error(res);
        }

        const folders = await res.json();
        return folders;
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * 새 폴더를 추가한다.
 * @param {string} name - 새 폴더 이름
 * @returns {object} 새로 만든 폴더 데이터
 */
export const addFolder = async (name) => {
    if (getAppType() === 'demo') {
        const folderData = addLocalFolder(name);
        return folderData;
    }

    try {
        const folderData = await addServerFolder(name);
        return folderData;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 서버에 새 폴더를 추가한다.
 * @param {string} name - 새 폴더 이름
 * @returns {object} 새로 만든 폴더 데이터
 */
const addServerFolder = async (name) => {
    try {
        const res = await fetch(FOLDERS_URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
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
 * 폴더 내용을 업데이트 한다.
 * @param {string} id - 업데이트할 폴더 id
 * @param {string} name - 새 이름
 * @returns {object} 업데이트한 폴더 내용. 에러시 null.
 */
export const updateFolder = async ({ id, name } = {}) => {
    if (!id || !name) {
        return null;
    }

    if (getAppType() === 'demo') {
        const folderData = updateLocalFolder(id, { name });
        return folderData;
    }

    try {
        const folderData = await updateServerFolder(id, name);
        return folderData;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 서버의 폴더 내용을 업데이트 한다.
 * @param {string} id - 업데이트할 폴더 id
 * @param {string} name - 새 이름
 * @returns {object} 업데이트한 폴더 내용. 에러시 null.
 */
const updateServerFolder = async (id, name) => {
    try {
        const res = await fetch(`${FOLDERS_URL}/${id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
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
