/**
 * 폴더 아이템 컴포넌트  
 * Todo 폴더를 표시한다.
 * @param {number} id - 폴더 id
 * @param {string} name - 폴더 이름
 * @param {number} count - 폴더내 아이템 갯수
 * @param {function} onSelect - 선택 리스너
 * @returns {object} 폴더 아이템 컴포넌트 오브젝트
 *   - el : 폴더 아이템 컴포넌트 엘리먼트
 */
const FolderItem = ({ id, name, count, onSelect } = {}) => {
    const el = document.createElement('div');
    el.className = 'folder-item';

    el.innerHTML = `
        <img
            class="folder-item__icon"
            src="src/assets/images/ic-folder.svg"
        />
        <span class="folder-item__name">
            ${ name || '' }
        </span>
        <span class="folder-item__count">
            ${ count || 0 }
        </span>
    `;

    /**
     * 폴더를 선택하면 리스너에게 폴더 id와 함께 알려준다.
     */
    el.addEventListener('click', () => onSelect(id));

    return {
        el,
    };
};

export default FolderItem;
