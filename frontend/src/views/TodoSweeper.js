import useTodo from '../stores/useTodo.js';
import { showModal } from '../utils/useModal.js';

/**
 * Todo 청소기 컴포넌트  
 * 폴더 청소 아이콘 버튼을 제공하고,  
 * 클릭시 폴더에서 완료한 Todo를 모두 제거한다.
 * @param {string} classname - 적용할 클래스 이름
 * @param {string} folderId - 폴더 id
 * @returns {object} Todo 청소기 컴포넌트 오브젝트
 *   - el : Todo 청소기 엘리먼트
 */
const TodoSweeper = ({ classname, folderId } = {}) => {
    const el = document.createElement('input');
    el.className = 'todo-sweeper';
    el.type = 'image';
    el.src = 'src/assets/images/ic-delete-sweep.svg';
    el.title = 'clear completed items';

    classname && el.classList.add(classname);

    /**
     * 제거 확인 메세지 엘리먼트
     */
    const messageEl = document.createElement('span');
    messageEl.className = 'todo-sweeper__message';
    messageEl.textContent = 'Are you sure you want to clear all completed items?';

    // 모달로 유저에게 확인한 뒤 제거를 실행한다.
    el.addEventListener('click', () => {
        showModal({
            contentEl: messageEl,
            done: 'Clear All',
            onDismiss: (modalStatus) => {
                if (modalStatus !== 'done') {
                    return;
                }

                const [, dispatch] = useTodo();
                dispatch('sweep', folderId);
            },
        });
    });

    return {
        el,
    };
};

export default TodoSweeper;
