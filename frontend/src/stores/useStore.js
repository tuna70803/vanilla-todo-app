/**
 * 저장소를 새로 만든다.
 * @param {any} initState - 저장소 초기 상태
 * @param {function} reducer - 저장소 처리 리듀서
 * @returns {array} 저장소 요소 배열
 *   - state : 저장소 상태
 *   - dispatch(action, ...args) : 상태 변경 함수
 *   - subscribe(callback) : 구독 신청 함수
 */
export const createStore = (initState, reducer) => {
    /**
     * store state
     */
    let state = initState;

    /**
     * 저장소 상태를 변경한다.  
     * 구독된 요소들에게 상태 변경 알림을 보낸다.
     * @param {string} action - 실행할 액션 이름
     */
    const dispatch = (action, ...args) => {
        const newState = reducer(state, action, ...args);
        state = newState;

        publish();
    };

    /**
     * 상태 변경을 알린다.
     */
    const publish = () => {
        subscribers.forEach(callback => callback());
    };

    /**
     * 구독한 요소 목록
     */
    const subscribers = [];

    /**
     * 구독을 추가한다.
     * @param {function} callback - 상태 변경시 실행할 함수
     */
    const subscribe = (callback) => {
        if (typeof callback !== 'function') {
            return;
        }

        subscribers.push(callback);
    };

    return [
        state,
        dispatch,
        subscribe,
    ];
};
