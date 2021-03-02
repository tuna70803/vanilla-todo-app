/**
 * 간격 컴포넌트  
 * 남은 공간을 차지하는 간격 컴포넌트 오브젝트를 만들어 리턴한다.  
 * flex container 에서 동작한다.
 * @return {object} 간격 컴포넌트 오브젝트
 *   - el : 간격 컴포넌트의 엘리먼트
 */
const Spacing = () => {
    const el = document.createElement('span');
    el.className = 'spacing';

    return {
        el,
    };
};

export default Spacing;
