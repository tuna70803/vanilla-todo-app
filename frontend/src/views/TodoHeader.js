import useFolder from '../stores/useFolder.js';
import FolderEditor from './FolderEditor.js';
import TodoSweeper from './TodoSweeper.js';

/**
 * Todo 헤더 컴포넌트  
 * 현재 폴더 이름을 표시하고 아이템 컨트롤을 할 수 있다.
 * @param {string} folderId - 현재 폴더 id
 * @returns {object} Todo 헤더 컴포넌트 오브젝트
 *   - el : Todo 헤더 컴포넌트 엘리먼트
 */
const TodoHeader = ({ folderId } = {}) => {
    const el = document.createElement('header');
    el.className = 'todo-header';

    /**
     * Folder Store State
     */
    const [folderStore] = useFolder();

    /**
     * 폴더 이름  
     * 중요함 폴더라면 별도 이름을 사용한다.
     */
    const folderName = (() => {
        if (folderId === 'important') {
            return '⭐ IMPORTANT';
        }

        const folder = folderStore.folders.find(item => item.id === folderId);
        return folder?.name || '';
    })();

    /**
     * 폴더 이름 엘리먼트
     */
    const nameEl = document.createElement('span');
    nameEl.className = 'todo-header__folder-name';
    nameEl.textContent = folderName;
    el.appendChild(nameEl);

    if (folderId !== 'important') {
        /**
         * 폴더 편집기 컴포넌트
         */
        const folderEditor = FolderEditor({ folderId, folderName });
        el.appendChild(folderEditor.el);

        /**
         * Todo 청소기 컴포넌트
         */
        const todoSweeper = TodoSweeper({
            classname: 'todo-header__sweeper',
            folderId: folderId,
        });
        el.appendChild(todoSweeper.el);
    }

    return {
        el,
    };
};

export default TodoHeader;
