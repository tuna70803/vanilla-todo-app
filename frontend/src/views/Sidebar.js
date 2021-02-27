/**
 * 사이드바 컴포넌트  
 * Todo App의 메인 메뉴를 표시하고 관리한다.
 * @return {HTMLElement} 사이드바 컴포넌트
 */
const Sidebar = () => {
    const el = document.createElement('aside');
    el.className = 'sidebar';

    return el;
};

export default Sidebar;
