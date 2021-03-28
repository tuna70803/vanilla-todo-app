import { getAppType } from './settings.js';

/**
 * 이미지 경로를 리턴한다.  
 * 앱 타입에 맞는 경로를 선택한다.
 * @param {string} filename - 이미지 파일 이름
 * @returns {string} 이미지 경로
 */
export const getImagePath = (filename) => {
    const appType = getAppType();
    if (appType === 'demo') {
        return `frontend/src/assets/images/${filename}`;
    }

    return `src/assets/images/${filename}`;
};
