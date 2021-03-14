import useFolders from '../stores/useFolders.js';
import { showModal } from '../utils/useModal.js';
import Input from '../components/Input.js';

/**
 * 폴더 추가 컴포넌트
 * @returns {object} 폴더 추가 컴포넌트 오브젝트
 *   - el : 폴더 추가 컴포넌트 엘리먼트
 */
const NewFolder = ({} = {}) => {
    const el = document.createElement('div');
    el.className = 'new-folder';

    /**
     * 폴더 추가 아이콘 엘리먼트
     */
    const iconEl = document.createElement('img');
    iconEl.className = 'new-folder__icon';
    iconEl.src="src/assets/images/ic-new.svg";
    el.appendChild(iconEl);

    /**
     * 폴더 이름 입력폼 엘리먼트
     */
    const inputFormEl = document.createElement('section');
    inputFormEl.className = 'new-folder__input-form';
    const formTitleEl = document.createElement('span');
    formTitleEl.className = 'new-folder__input-form-title';
    formTitleEl.textContent = '새 폴더 만들기';
    inputFormEl.appendChild(formTitleEl);

    /**
     * 폴더 이름 입력 컴포넌트
     */
    const input = Input({
        placeholder: '폴더 이름을 입력하세요',
        underline: true,
    });
    inputFormEl.appendChild(input.el);

    /**
     * Todo Store Dispatcher
     */
    const [_, dispatch] = useFolders();

    /**
     * 새 폴더를 만든다.  
     * 모달이 그냥 닫혔거나, 폴더 이름을 입력하지 않았다면 만들지 않는다.
     * @param {string} modalStatus - 모달 상태
     */
    const onNewFolder = (modalStatus) => {
        if (modalStatus !== 'done') {
            return;
        }

        const name = input.getValue();
        input.setValue('');

        if (name === '') {
            return;
        }

        dispatch('add', name);
    };

    el.addEventListener('click', () => {
        showModal({
            contentEl: inputFormEl,
            done: '만들기',
            onDismiss: onNewFolder,
        });
    });

    return {
        el,
    };
};

export default NewFolder;
