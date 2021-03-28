import useTodo from '../stores/useTodo.js';
import { getImagePath } from '../utils/imageProvider.js';

/**
 * Todo 아이템 컴포넌트  
 * 개별 Todo 아이템을 표시하고 수정한다.
 * @param {string} todo - Todo 내용
 * @return {object} Todo 아이템 컴포넌트 오브젝트
 *   - el : Todo 아이템 컴포넌트의 엘리먼트
 */
const TodoItem = ({ todo } = {}) => {
    const el = document.createElement('div');
    el.className = 'todo-item';

    /**
     * Todo Dispatcher
     */
    const [, dispatch] = useTodo();

    /**
     * Todo completed state class
     */
    todo.completed && el.classList.add('todo-item--completed');

    /**
     * 완료 체크 박스
     */
    const check = document.createElement('input');
    check.className = 'todo-item__check';
    check.type = 'image';
    check.alt = '';
    check.src = todo.completed ? getImagePath('ic-done.svg') : '';
    check.addEventListener('click', () => dispatch('toggleCompleted', todo.id));
    el.appendChild(check);

    /**
     * Todo 내용 라벨
     */
    const label = document.createElement('span');
    label.className = 'todo-item__label';
    label.textContent = todo?.content || 'unknown';
    el.appendChild(label);

    /**
     * 관심 설정 체크 박스
     */
    const important = document.createElement('input');
    important.className = 'todo-item__important';
    important.type = 'image';
    important.src = todo.important
        ? getImagePath('ic-star.svg')
        : getImagePath('ic-star-border.svg');
    important.addEventListener('click', () => dispatch('toggleImportant', todo.id));
    el.appendChild(important);

    return {
        el,
    };
};

export default TodoItem;
