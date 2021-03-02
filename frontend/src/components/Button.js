/**
 * 버튼 컴포넌트  
 * 전달받은 값으로 버튼 컴포넌트 오브젝트를 만들어 리턴한다.
 * @param {string} text - 버튼에 설정할 텍스트
 * @param {string} image - 버튼에 설정할 이미지 파일. images 폴더에서 찾는다.
 *   text를 설정했다면 이미지를 무시된다.
 * @param {boolean} round - 양 끝을 라운드 처리
 * @param {boolean} circle - 원형 버튼
 * @param {function} onClick - click listener
 * @return {object} 버튼 컴포넌트 오브젝트
 *  - el : 버튼 컴포넌트의 엘리먼트
 */
const Button = ({ text, image, round, circle, onClick } = {}) => {
    const el = document.createElement('button');
    el.className = 'button';

    if (round) {
        el.classList.add('button--round');
    } else if (circle) {
        el.classList.add('button--circle');
    }

    if (text) {
        el.textContent = text;
    } else if (image) {
        el.innerHTML = `<img src="src/assets/images/${image}" />`;
    }

    if (onClick) {
        el.addEventListener('click', onClick);
    }

    return {
        el,
    };
};

export default Button;
