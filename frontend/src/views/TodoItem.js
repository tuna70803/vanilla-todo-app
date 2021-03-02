/**
 * Todo 아이템 컴포넌트  
 * 개별 Todo 아이템을 표시하고 수정한다.
 * @param {string} content - Todo 내용
 * @return {object} Todo 아이템 컴포넌트 오브젝트
 *   - el : Todo 아이템 컴포넌트의 엘리먼트
 */
const TodoItem = ({ content = '' } = {}) => {
    const el = document.createElement('div');
    el.className = 'todo-item';

    /**
     * 완료 체크 박스
     */
    const check = document.createElement('input');
    check.className = 'todo-item__check';
    check.type = 'image';
    check.alt = '';
    check.addEventListener('click', () => {
        const needCheck = !Boolean(check.dataset.checked);
        check.dataset.checked = needCheck ? 'true' : '';
        check.src = needCheck ? 'src/assets/images/ic-check.svg' : '';
    });
    el.appendChild(check);

    /**
     * Todo 내용 라벨
     */
    const label = document.createElement('span');
    label.className = 'todo-item__label';
    label.textContent = content;
    el.appendChild(label);

    /**
     * 관심 설정 체크 박스
     */
    const favorite = document.createElement('input');
    favorite.className = 'todo-item__favorite';
    favorite.type = 'image';
    favorite.src = 'src/assets/images/ic-favorite-border.svg';
    favorite.addEventListener('click', () => {
        const needCheck = !Boolean(favorite.dataset.checked);
        favorite.dataset.checked = needCheck ? 'true' : '';
        favorite.src = needCheck
            ? 'src/assets/images/ic-favorite.svg'
            : 'src/assets/images/ic-favorite-border.svg';
    });
    el.appendChild(favorite);

    return {
        el,
    };
};

export default TodoItem;
