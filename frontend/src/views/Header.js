import useFolder from '../stores/useFolder.js';
import Spacing from '../components/Spacing.js';

/**
 * 앱 메인 헤더 컴포넌트  
 * 로고와 설정 버튼을 표시한다.
 * @return {object} 메인 헤더 컴포넌트 오브젝트
 *   - el : 메인 헤더 컴포넌트의 엘리먼트
 */
const Header = () => {
    const el = document.createElement('header');
    el.className = 'header';

    /**
     * 로고 엘리먼트
     */
    const logoEl = document.createElement('img');
    logoEl.className = 'header__logo';
    logoEl.src = 'src/assets/images/ic-logo.svg';
    el.appendChild(logoEl);

    // 로고를 클릭하면 폴더 선택을 해제해 초기 상태로 표시한다.
    const [, dispatch] = useFolder();
    logoEl.addEventListener('click', () => dispatch('deselect'));

    /**
     * 앱 타이틀 엘리먼트
     */
    const titleEl = document.createElement('span');
    titleEl.className = 'header__title';
    titleEl.textContent = 'TODO';
    el.appendChild(titleEl);

    /**
     * 간격 컴포넌트
     */
    const spacing = Spacing();
    el.appendChild(spacing.el);

    /**
     * 설정 버튼 엘리먼트
     */
    const settingsEl = document.createElement('img');
    settingsEl.className = 'header__settings';
    settingsEl.src = 'src/assets/images/ic-settings.svg';
    el.appendChild(settingsEl);

    return {
        el,
    };
};

export default Header;
