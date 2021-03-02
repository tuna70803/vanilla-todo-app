/**
 * 입력 컴포넌트  
 * 입력 컴포넌트 오브젝트를 만들어 리턴한다.
 * @return {object} 입력 컴포넌트 오브젝트
 *   - el : 입력 컴포넌트의 엘리먼트
 *   - getValue : 현재 입력 값을 리턴한다
 *   - setValue : 입력 값을 설정한다
 */
const Input = () => {
    const el = document.createElement('input');
    el.className = 'input';

    const getValue = () => el.value;
    const setValue = (text) => el.value = text;

    return {
        el,
        getValue,
        setValue,
    };
};

export default Input;
