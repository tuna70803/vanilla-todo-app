import useFolder from '../stores/useFolder.js';

/**
 * 중요 아이템 폴더 컴포넌트  
 * 중요함을 설정한 Todo 목록을 선택할 수 있다.
 * @returns {object} 중요 아이템 폴더 컴포넌트 오브젝트
 *   - el : 중요 아이템 폴더 컴포넌트 엘리먼트
 */
const ImportantFolder = () => {
    const el = document.createElement('div');
    el.className = 'important-folder';

    /**
     * Folder Store dispatcher
     */
    const [, dispatch] = useFolder();

    el.innerHTML = `
        <img
            class="important-folder__icon"
            src="src/assets/images/ic-star.svg"
        />
        <span class="important-folder__label">
            Important
        </span>
    `;

    /**
     * 컴포넌트를 클릭하면 중요함을 설정한 Todo 아이템을 표시한다.
     */
    el.addEventListener('click', () => {
        dispatch('selectImportant');
    });

    return {
        el,
    };
};

export default ImportantFolder;
