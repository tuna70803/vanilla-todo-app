import Sidebar from './Sidebar.js';
import Workspace from './Workspace.js';
import Appender from './Appender.js';

/**
 * 메인 플로터 컴포넌트  
 * Todo App의 실제 컨텐츠를 메인 배경위에 표시한다.
 * @return {object} 메인 플로터 컴포넌트 오브젝트
 *   - el : 메인 플로터 컴포넌트의 엘리먼트
 */
const Floater = () => {
    const el = document.createElement('main');
    el.className = 'floater';

    const appender = Appender();
    el.appendChild(appender.el);

    const sidebar = Sidebar();
    el.appendChild(sidebar.el);

    const workspace = Workspace({ openAppender: appender.open });
    el.appendChild(workspace.el);

    return {
        el,
    };
};

export default Floater;
