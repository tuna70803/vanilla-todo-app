import { BASE_URL } from './index.js';

/**
 * 폴더 API 주소
 */
const FOLDERS_URL = `${BASE_URL}/folders`;

/**
 * 서버에서 폴더 목록을 조회한다.
 * @returns {array<object>} 폴더 목록
 */
export const fetchFolders = async () => {
    try {
        const res = await fetch(FOLDERS_URL);
        if (!res.ok) {
            throw Error(res);
        }

        const folders = await res.json();
        return folders;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

/**
 * 새 폴더를 추가한다.
 * @param {string} name - 새 폴더 이름
 * @returns {object} 새로 만든 폴더 데이터
 */
export const addFolder = async (name) => {
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
        console.error(error);
        return Promise.reject(error);
    }
};
