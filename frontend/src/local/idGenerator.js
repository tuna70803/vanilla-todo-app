/**
 * 현재 시간 정보로 id를 생성한다.
 * @returns {string} 생성한 id
 */
export const makeId = () => {
    return new Date().getTime().toString();
};
