import useFolder from '../stores/useFolder.js';
import { showModal } from '../utils/useModal.js';
import { getImagePath } from '../utils/imageProvider.js';
import Input from '../components/Input.js';

/**
 * 폴더 편집기 컴포넌트  
 * 폴더 편집 아이콘 버튼을 제공하고,  
 * 클릭시 편집 모달창으로 내용을 수정할 수 있다.
 * @param {string} folderId - 폴더 id
 * @param {string} folderName - 폴더 이름
 * @returns {object} 폴더 편집기 컴포넌트 오브젝트
 *   - el : 폴더 편집기 엘리먼트
 */
const FolderEditor = ({ folderId, folderName } = {}) => {
    // 컴포넌트 자체가 아이콘 버튼이다.
    const el = document.createElement('input');
    el.className = 'folder-editor';
    el.type = 'image';
    el.src = getImagePath('ic-edit.svg');
    el.title = '폴더 편집';

    /**
     * 폴더 편집폼 컨테이너 엘리먼트
     */
    const editFormEl = document.createElement('section');
    editFormEl.className = 'folder-editor__form';

    /**
     * 폴더 편집폼 타이틀 엘리먼트
     */
    const titleEl = document.createElement('span');
    titleEl.className = 'folder-editor__title';
    titleEl.textContent = 'Folder Edit';
    editFormEl.appendChild(titleEl);

    /**
     * 폴더 이름 수정 입력 컴포넌트
     */
    const input = Input({
        classname: 'folder-editor__input',
        value: folderName,
        underline: true,
    });
    editFormEl.appendChild(input.el);

    /**
     * Folder Store Dispatcher
     */
    const [, dispatch] = useFolder();

    /**
     * 폴더 이름을 수정한다.
     * @param {string} modalStatus - 모달 닫기 상태
     */
    const onUpdate = (modalStatus) => {
        if (modalStatus !== 'done') {
            return;
        }

        const newName = input.getValue();
        if (!newName || newName === folderName) {
            return;
        }

        dispatch('update', folderId, newName);
    };

    /**
     * 메인 컴포넌트인 폴더 편집 버튼을 클릭하면 수정폼을 표시한다.
     */
    el.addEventListener('click', () => {
        input.setValue(folderName);

        showModal({
            contentEl: editFormEl,
            done: 'Save Changes',
            onDismiss: onUpdate,
        });
    });

    return {
        el,
    };
};

export default FolderEditor;
