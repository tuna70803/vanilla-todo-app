/**
 * 타이틀 컴포넌트  
 * 타이틀과 보조 버튼을 표시하며,  
 * 네비게이션 타이틀로 사용할 수 있다.
 * @param {string} text - 타이틀 텍스트
 * @param {string} buttonText - 버튼 텍스트
 * @param {function} onButtonClick - 버튼 클릭 리스너
 * @returns {object} 타이틀 컴포넌트 오브젝트
 *   - el : 타이틀 컴포넌트의 엘리먼트
 */
const Title  = ({ text, buttonText, onButtonClick } = {}) => {
    const el = document.createElement('header');
    el.className = 'title';

    /**
     * 타이틀 텍스트 엘리먼트
     */
    const textEl = document.createElement('h2');
    textEl.className = 'title__text';
    textEl.textContent = text || 'Error';
    el.appendChild(textEl);

    if (buttonText) {
        /**
         * 보조 버튼 엘리먼트
         */
        const buttonEl = document.createElement('span');
        buttonEl.className = 'title__button';
        buttonEl.textContent = buttonText;
        el.appendChild(buttonEl);

        buttonEl.addEventListener('click', onButtonClick);
    }

    return {
        el,
    };
};

export default Title;
