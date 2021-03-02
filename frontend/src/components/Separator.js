/**
 * 구분선 컴포넌트  
 * 구분선을 표시하는 컴포넌트 오브젝트를 만들어 리턴한다.
 * @return {object} 구분선 컴포넌트 오브젝트
 *   - el : 구분선 컴포넌트의 엘리먼트
 */
const Separator = () => {
    const el = document.createElement('div');
    el.className = 'separator';

    return {
        el,
    };
};

export default Separator;
