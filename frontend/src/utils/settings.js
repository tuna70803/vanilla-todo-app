let appType = 'frontend';

/**
 * 앱 타입을 설정한다.
 * @param {string} type - 앱 타입
 */
export const setAppType = (type) => {
    if (!type) {
        console.warn('잘못된 타입 설정입니다.');
        return;
    }

    appType = type;
};

/**
 * 현재 앱 타입을 리턴한다.
 * @returns {string} 앱 타입
 */
export const getAppType = () => {
    return appType;
};
