import useFolder from '../stores/useFolder.js';
import { getImagePath } from '../utils/imageProvider.js';

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
     * 아이콘 엘리먼트
     */
    const iconEl = document.createElement('img');
    iconEl.className = 'important-folder__icon';
    iconEl.src = getImagePath('ic-star.svg');
    el.appendChild(iconEl);

    /**
     * 라벨 엘리먼트
     */
    const labelEl = document.createElement('span');
    labelEl.className = 'important-folder__label';
    labelEl.textContent = 'Important';
    el.appendChild(labelEl);

    /**
     * Folder Store dispatcher
     */
    const [, dispatch] = useFolder();

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
