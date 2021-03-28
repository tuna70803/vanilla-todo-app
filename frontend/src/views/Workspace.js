import useFolder from '../stores/useFolder.js';
import { getImagePath } from '../utils/imageProvider.js';
import TodoHeader from './TodoHeader.js';
import Todos from './Todos.js';
import NewTodo from './NewTodo.js';

/**
 * 메인 워크스페이스 컴포넌트  
 * Todo App의 세부 내용을 표시하고 관리한다.
 * @return {object} 메인 워크스페이스 컴포넌트 오브젝트
 *   - el : 워크스페이스 컴포넌트의 엘리먼트
 */
const Workspace = () => {
    const el = document.createElement('section');
    el.className = 'workspace';

    /**
     * 워크스페이스 내용을 설정한다.  
     * 선택한 폴더가 없으면 홈 이미지를 표시하고,  
     * 폴더를 선택했다면 Todo 목록 및 기타 컨트롤을 표시한다.
     */
    const setContent = () => {
        el.innerHTML = '';

        const folderId = folderState.current;
        if (folderId === null) {
            /**
             * 홈 이미지 엘리먼트
             */
            const homeImageEl = document.createElement('img');
            homeImageEl.className = 'workspace__home-image';
            homeImageEl.src = getImagePath('playful-cat.svg');
            el.appendChild(homeImageEl);

            return;
        }

        /**
         * Todo 헤더 컴포넌트
         */
        const todoHeader = TodoHeader({ folderId });
        el.appendChild(todoHeader.el);

        /**
         * Todo 목록 컴포넌트
         */
        const todos = Todos();
        el.appendChild(todos.el);

        /**
         * Todo 추가 컴포넌트  
         * 중요함 폴더라면 표시하지 않는다.
         */
        if (folderState.current !== 'important') {
            const newTodo = NewTodo();
            el.appendChild(newTodo.el);
        }
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
