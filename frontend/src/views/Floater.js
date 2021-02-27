import Sidebar from './Sidebar.js';
import Workspace from './Workspace.js';

/**
 * 메인 플로터 컴포넌트  
 * Todo App의 실제 컨텐츠를 메인 배경위에 표시한다.
 * @return {HTMLElement} 메인 플로터 컴포넌트
 */
const Floater = () => {
    const el = document.createElement('main');
    el.className = 'floater';

    const sidebar = Sidebar();
    const workspace = Workspace();
    el.appendChild(sidebar);
    el.appendChild(workspace);

    return el;
};

export default Floater;
