import Floater from './views/Floater.js';

/**
 * 메인 Todo App 컴포넌트  
 * 배경과 메인 플로터를 표시한다.
 * @return {object} Todo App 컴포넌트 오브젝트
 *   - el : Todo App 컴포넌트의 엘리먼트
 */
const App = () => {
    const el = document.createElement('div');
    el.className = 'app';

    const floater = Floater();
    el.appendChild(floater.el);

    return {
        el,
    };
};

export default App;
