/**
 * 입력 컴포넌트  
 * 입력 컴포넌트 오브젝트를 만들어 리턴한다.
 * @param {string} classname - classname
 * @param {string} value - init value
 * @param {string} placeholder - placeholder
 * @param {number} maxLength - 최대 글자 수
 * @param {boolean} underline - 입력폼에 밑줄 표시
 * @return {object} 입력 컴포넌트 오브젝트
 *   - el : 입력 컴포넌트의 엘리먼트
 *   - getValue : 현재 입력 값을 리턴한다
 *   - setValue : 입력 값을 설정한다
 */
const Input = ({ classname, value, placeholder, maxLength, underline } = {}) => {
    const el = document.createElement('input');
    el.className = 'input';

    classname && el.classList.add(classname);

    if (value) {
        el.value = value;
    }

    if (placeholder) {
        el.placeholder = placeholder;
    }

    if (maxLength > 0) {
        el.maxLength = String(maxLength);
    }

    underline && el.classList.add('input--underline');

    const getValue = () => el.value;
    const setValue = (text) => el.value = text;

    return {
        el,
        getValue,
        setValue,
    };
};

export default Input;
