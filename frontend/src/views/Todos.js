import useTodo from '../stores/useTodo.js';
import TodoItem from './TodoItem.js';

/**
 * Todo 목록 컴포넌트  
 * Todo 아이템을 전부 표시하고 관리한다.
 * @return {object} Todo 목록 컴포넌트 오브젝트
 *   - el : Todo 목록 컴포넌트의 엘리먼트
 */
const Todos = () => {
    const el = document.createElement('section');
    el.className = 'todos';

    /**
     * Todo Store Data
     */
    const [todoState, , subscribe] = useTodo();

    /**
     * Todo store에 구독을 추가한다.  
     * store state가 변경되면 목록을 다시 구성한다.
     */
    subscribe(() => addItems());

    /**
     * Todo 목록을 구성한다.
     */
    const addItems = () => {
        el.innerHTML = '';

        if (todoState.todos.length === 0) {
            el.innerHTML = `
                <span class="todos__nothing">
                    Nothing To do.
                </span>
            `;

            return;
        }

        todoState.todos.map(item => {
            const todo = TodoItem({ todo: item });
            el.appendChild(todo.el);
        });
    };

    addItems();

    return {
        el,
    };
};

export default Todos;
