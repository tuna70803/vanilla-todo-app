import useFolder from '../stores/useFolder.js';

/**
 * Todo 헤더 컴포넌트  
 * 현재 폴더 이름을 표시하고 아이템 컨트롤을 할 수 있다.
 * @returns {object} Todo 헤더 컴포넌트 오브젝트
 *   - el : Todo 헤더 컴포넌트 엘리먼트
 */
const TodoHeader = () => {
    const el = document.createElement('header');
    el.className = 'todo-header';

    /**
     * Folder Store State
     */
    const [folderStore, , subscribe] = useFolder();
    subscribe(() => {
        const currentId = folderStore.current;
        if (currentId === 'important') {
            nameEl.textContent = '⭐ 중요한 일';
            return;
        }

        const folder = folderStore.folders.find(item => item.id === currentId);
        nameEl.textContent = folder?.name || '';
    });

    /**
     * 폴더 이름 엘리먼트
     */
    const nameEl = document.createElement('span');
    nameEl.className = 'todo-header__folder-name';
    el.appendChild(nameEl);

    return {
        el,
    };
};

export default TodoHeader;
