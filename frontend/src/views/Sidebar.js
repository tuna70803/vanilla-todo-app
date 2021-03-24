import ImportantFolder from './ImportantFolder.js';
import NewFolder from './NewFolder.js';
import Folders from './Folders.js';

/**
 * 사이드바 컴포넌트  
 * Todo App의 메인 메뉴를 표시하고 관리한다.
 * @return {object} 사이드바 컴포넌트 오브젝트
 *   - el : 사이드바 컴포넌트의 엘리먼트
 */
const Sidebar = () => {
    const el = document.createElement('aside');
    el.className = 'sidebar';

    /**
     * 중요함 폴더 컴포넌트
     */
    const importantFolder = ImportantFolder();
    el.appendChild(importantFolder.el);

    /**
     * 폴더 목록 컴포넌트
     */
    const folders = Folders();
    el.appendChild(folders.el);

    /**
     * 새 폴더 만들기 컴포넌트
     */
    const newFolder = NewFolder();
    el.appendChild(newFolder.el);

    return {
        el,
    };
};

export default Sidebar;
