/**
 * 라벨 컨테이너 컴포넌트  
 * 라벨을 붙인 컨테이너에 다른 컴포넌트를 담을 수 있는 있다.
 * @param {string} text - 라벨 텍스트
 * @return {object} 라벨 컨테이너 컴포넌트 오브젝트
 *   - el : 라벨 컨테이너 컴포넌트의 엘리먼트
 *   - append : 전달한 엘리먼트를 컨테이너에 추가한다
 */
const LabeledContainer = ({ text } = {}) => {
    const el = document.createElement('div');
    el.className = 'labeled-container';

    /**
     * 라벨 엘리먼트
     */
    const label = document.createElement('span');
    label.className = 'labeled-container__label';
    label.textContent = text;
    el.appendChild(label);

    /**
     * 엘리먼트를 라벨 컨테이너에 추가한다.
     * @param {HTMLElement} element - 추가할 엘리먼트
     */
    const append = (element) => {
        if (!element) {
            return;
        }

        el.appendChild(element);
    };

    return {
        el,
        append,
    };
};

export default LabeledContainer;
