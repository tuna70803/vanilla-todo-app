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
        setFolderName(currentId);
        setEditable(currentId);
    });

    /**
     * 폴더 이름 엘리먼트
     */
    const nameEl = document.createElement('span');
    nameEl.className = 'todo-header__folder-name';
    el.appendChild(nameEl);

    /**
     * 폴더 이름을 설정한다.
     * @param {string} folderId - 폴더 id
     */
    const setFolderName = (folderId) => {
        if (folderId === 'important') {
            nameEl.textContent = '⭐ 중요한 일';
            return;
        }

        const folder = folderStore.folders.find(item => item.id === folderId);
        nameEl.textContent = folder?.name || '';
    };

    /**
     * 편집 아이콘 엘리먼트
     */
    const editEl = document.createElement('input');
    editEl.className = 'todo-header__folder-edit';
    editEl.type = 'image';
    editEl.src = 'src/assets/images/ic-edit.svg';
    editEl.title = '폴더 편집';
    el.appendChild(editEl);

    /**
     * 폴더에 맞는 편집 가능 상태를 설정한다.  
     * 폴더가 important라면 편집 아이콘을 숨겨서 편집할 수 없게 만든다.
     * @param {string} folderId - 현재 폴더 id
     */
    const setEditable = (folderId) => {
        if (folderId === 'important') {
            editEl.style.display = 'none';
            return;
        }

        editEl.style.display = 'block';
    };

    /**
     * 완료한 Todo 지우기 아이콘 엘리먼트
     */
    const sweepEl = document.createElement('input');
    sweepEl.className = 'todo-header__sweep';
    sweepEl.type = 'image';
    sweepEl.src = 'src/assets/images/ic-delete-sweep.svg';
    sweepEl.title = '완료한 항목 지우기';
    el.appendChild(sweepEl);

    return {
        el,
    };
};

export default TodoHeader;
