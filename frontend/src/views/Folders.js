import useFolder from '../stores/useFolder.js';
import FolderItem from './FolderItem.js';

/**
 * 폴더 목록 컴포넌트  
 * Todo 폴더 목록을 표시한다.
 * @returns {object} 폴더 목록 컴포넌트 오브젝트
 *   - el : 폴더 목록 컴포넌트 엘리먼트
 */
const Folders = () => {
    const el = document.createElement('section');
    el.className = 'folders';

    /**
     * Folder Store Data
     */
    const [folderState, dispatch, subscribe] = useFolder();

    /**
     * Folder store 구독을 추가한다.
     * store data가 변경되면 목록을 다시 구성한다.
     */
    subscribe(() => addItems());

    /**
     * 폴더 선택을 처리한다.
     * @param {number} id - 선택한 폴더 id
     */
    const onSelect = (id) => {
        dispatch('select', id);
    };

    /**
     * 폴더 목록을 구성한다.
     */
    const addItems = () => {
        el.innerHTML = '';

        folderState.folders.map((item, index) => {
            const folder = FolderItem({
                index: index,
                id: item.id,
                name: item.name,
                count: item.todos.length,
                onSelect: onSelect,
            });

            el.appendChild(folder.el);
        });
    };

    dispatch('fetchAll');

    return {
        el,
    };
};

export default Folders;
