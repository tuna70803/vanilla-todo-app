import useFolder from '../stores/useFolder.js';
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

    /**
     * Todo 목록 컴포넌트
     */
    const todoList = Todos();

    /**
     * Todo 추가 컴포넌트
     */
    const newTodo = NewTodo();

    /**
     * 워크스페이스 내용을 설정한다.  
     * 선택한 폴더가 없으면 홈 이미지를 표시하고,  
     * 폴더를 선택했다면 Todo 목록 및 기타 컨트롤을 표시한다.
     */
    const setContent = () => {
        if (folderState.current === null) {
            el.innerHTML = `
                <img
                    class="workspace__home-image"
                    src="src/assets/images/playful-cat.svg"
                />
            `;

            return;
        }

        el.innerHTML = '';
        el.appendChild(todoHeader.el);
        el.appendChild(todoList.el);
        el.appendChild(newTodo.el);
    };

    /**
     * Folder Store State
     */
    const [folderState,, subscribe] = useFolder();
    subscribe(setContent);

    return {
        el,
    };
};

export default Workspace;
