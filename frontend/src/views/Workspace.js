import Header from './Header.js';
import Todos from './Todos.js';

/**
 * 메인 워크스페이스 컴포넌트  
 * Todo App의 세부 내용을 표시하고 관리한다.
 * @param {array} todos - Todo 데이터 목록
 * @param {function} openAppender - Todo 아이템 추가폼 열기 함수
 * @return {object} 메인 워크스페이스 컴포넌트 오브젝트
 *   - el : 워크스페이스 컴포넌트의 엘리먼트
 *   - setState : 상태 설정 메서드
 */
const Workspace = ({ todos, openAppender } = {}) => {
    const el = document.createElement('section');
    el.className = 'workspace';

    const header = Header({ openAppender });
    el.appendChild(header.el);

    const todoList = Todos({ todos });
    el.appendChild(todoList.el);

    /**
     * 새 상태를 설정한다.
     * Todo 데이터 목록을 새로 전달받아 내부 목록 컴포넌트에 전달한다.
     * @param {array} todos - Todo 데이터 목록
     */
    const setState = (todos) => todoList.setState(todos);

    return {
        el,
        setState,
    };
};

export default Workspace;
