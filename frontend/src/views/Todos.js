import TodoItem from './TodoItem.js';

/**
 * Todo 목록 컴포넌트  
 * Todo 아이템을 전부 표시하고 관리한다.
 * @param {array} todos - Todo 데이터 목록
 * @return {object} Todo 목록 컴포넌트 오브젝트
 *   - el : Todo 목록 컴포넌트의 엘리먼트
 *   - setState : 상태 설정 메서드
 */
const Todos = ({ todos } = {}) => {
    const el = document.createElement('section');
    el.className = 'todos';

    /**
     * 내부 Todo 데이터 목록
     */
    let items = todos || [];

    /**
     * Todo 목록을 구성한다.
     */
    const addItems = () => items.map(item => {
        const todo = TodoItem({ content: item });
        el.appendChild(todo.el);
    });

    addItems();

    /**
     * 새 상태를 설정한다.
     * Todo 목록을 새 데이터로 교체하고 아이템 컴포넌트를 재구성 한다.
     * @param {array} todos - 새로 설정할 Todo 데이터 목록
     */
    const setState = (todos = []) => {
        items = todos;
        el.innerHTML = '';
        addItems();
    };

    return {
        el,
        setState,
    };
};

export default Todos;
