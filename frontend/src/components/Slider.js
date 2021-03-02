/**
 * 슬라이더 컴포넌트  
 * 배경을 어둡게 만들고 오른쪽에 컨테이너를 표시한다.
 * @return {object} 슬라이더 컴포넌트
 *   - el : 슬라이더 컴포넌트의 엘리먼트
 *   - containerEl : 슬라이더 컨테이너 엘리먼트
 *   - open : 슬라이더를 화면에 표시한다.
 */
const Slider = () => {
    const el = document.createElement('div');
    el.className = 'slider';

    /**
     * 배경을 클릭하면 컴포넌트를 숨긴다.
     */
    el.addEventListener('click', () => el.classList.remove('slider--visible'));

    /**
     * 슬라이더를 표시한다.
     */
    const open = () => {
        const classes = el.classList;
        const state = 'slider--visible'
        if (classes.contains(state)) {
            return;
        }

        classes.add(state);
    };

    /**
     * 슬라이더의 컨테이너 엘리먼트
     */
    const containerEl = document.createElement('div');
    containerEl.className = 'slider__container';
    // 배경에 클릭이벤트가 전파되지 않게 막는다.
    containerEl.addEventListener('click', e => e.stopPropagation());
    el.appendChild(containerEl);

    return {
        el,
        containerEl,
        open,
    };
};

export default Slider;
