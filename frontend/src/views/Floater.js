import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Workspace from './Workspace.js';
import { registerModalContainer } from '../utils/useModal.js';

/**
 * 메인 플로터 컴포넌트  
 * Todo App의 실제 컨텐츠를 메인 배경위에 표시한다.
 * @return {object} 메인 플로터 컴포넌트 오브젝트
 *   - el : 메인 플로터 컴포넌트의 엘리먼트
 */
const Floater = () => {
    const el = document.createElement('main');
    el.className = 'floater';

    /**
     * 메인 헤더 컴포넌트
     */
    const header = Header();
    el.appendChild(header.el);

    /**
     * 메인 내용 엘리먼트
     */
    const contentEl = document.createElement('div');
    contentEl.className = 'floater__content';
    el.appendChild(contentEl);

    /**
     * 사이드바 컴포넌트
     */
    const sidebar = Sidebar();
    contentEl.appendChild(sidebar.el);

    /**
     * 작업 영역 컴포넌트
     */
    const workspace = Workspace();
    contentEl.appendChild(workspace.el);

    registerModalContainer(el);

    return {
        el,
    };
};

export default Floater;
