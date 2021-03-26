import TodoHeader from './TodoHeader.js';
import Todos from './Todos.js';
import NewTodo from './NewTodo.js';

/**
 * 메인 워크스페이스 컴포넌트  
 * Todo App의 세부 내용을 표시하고 관리한다.
 * @param {function} openAppender - Todo 아이템 추가폼 열기 함수
 * @return {object} 메인 워크스페이스 컴포넌트 오브젝트
 *   - el : 워크스페이스 컴포넌트의 엘리먼트
 */
const Workspace = () => {
    const el = document.createElement('section');
    el.className = 'workspace';

    /**
     * Todo 헤더 컴포넌트
     */
    const todoHeader = TodoHeader();
    el.appendChild(todoHeader.el);

    /**
     * Todo 목록 컴포넌트
     */
    const todoList = Todos();
    el.appendChild(todoList.el);

    /**
     * Todo 추가 컴포넌트
     */
    const newTodo = NewTodo();
    el.appendChild(newTodo.el);

    return {
        el,
    };
};

export default Workspace;
