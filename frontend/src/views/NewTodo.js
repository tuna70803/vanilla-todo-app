import { showModal } from '../utils/useModal.js';
import Input from '../components/Input.js';
import useTodo from '../stores/useTodo.js';

/**
 * Todo 추가 컴포넌트
 * @returns {object} Todo 추가 컴포넌트 오브젝트
 *   - el : Todo 추가 컴포넌트 엘리먼트
 */
const NewTodo = () => {
    const el = document.createElement('div');
    el.className = 'new-todo';

    /**
     * 추가 아이콘 엘리먼트
     */
    const iconEl = document.createElement('img');
    iconEl.className = 'new-todo__icon';
    iconEl.src="src/assets/images/ic-add.svg";
    el.appendChild(iconEl);

    /**
     * 추가 라벨 엘리먼트
     */
    const labelEl = document.createElement('span');
    labelEl.className = 'new-todo__label';
    labelEl.textContent = 'Add Todo';
    el.appendChild(labelEl);

    /**
     * 추가 입력폼 컨테이너 엘리먼트
     */
    const inputFormEl = document.createElement('section');
    inputFormEl.className = 'new-todo__input-form';

    /**
     * 추가 입력폼 헤더 엘리먼트
     */
    const formTitleEl = document.createElement('span');
    formTitleEl.className = 'new-todo__input-form-title';
    formTitleEl.textContent = 'Add Todo';
    inputFormEl.appendChild(formTitleEl);

    /**
     * 추가 입력폼의 입력 컴포넌트
     */
    const input = Input({ classname: 'new-todo__input' });
    inputFormEl.appendChild(input.el);

    /**
     * Todo Store Dispatcher
     */
    const [, dispatch] = useTodo();

    /**
     * 폴더에 Todo를 추가한다.  
     * 모달이 취소됐거나, 내용을 입력하지 않았다면 추가하지 않는다.
     * @param {string} modalStatus - 모달 상태
     */
    const onNewTodo = (modalStatus) => {
        if (modalStatus !== 'done') {
            return;
        }

        const content = input.getValue();
        input.setValue('');

        if (content === '') {
            return;
        }

        dispatch('add', content);
    };

    el.addEventListener('click', () => {
        showModal({
            contentEl: inputFormEl,
            done: 'Add',
            onDismiss: onNewTodo,
        });
    });

    return {
        el,
    };
};

export default NewTodo;
