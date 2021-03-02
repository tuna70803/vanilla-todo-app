import Button from '../components/Button.js';
import Spacing from '../components/Spacing.js';

/**
 * 워크스페이스 메인 헤더 컴포넌트  
 * 폴더와 컨트롤을 표시한다.
 * @param {function} openAppender - Todo 아이템 추가 슬라이더 오픈 함수
 * @return {object} 메인 헤더 컴포넌트 오브젝트
 *   - el : 메인 헤더 컴포넌트의 엘리먼트
 */
const Header = ({ openAppender } = {}) => {
    const el = document.createElement('header');
    el.className = 'header';

    const spacing = Spacing();
    el.appendChild(spacing.el);

    const onButtonClick = () => openAppender();
    const addButton = Button({
        circle: true,
        image: 'ic-add.svg',
        onClick: onButtonClick,
    });
    el.appendChild(addButton.el);

    return {
        el,
    };
};

export default Header;
