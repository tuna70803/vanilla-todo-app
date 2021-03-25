/**
 * 폴더 아이콘 컴포넌트  
 * 인덱스에 따라 색깔이 다르다.
 * @param {number} index - 폴더 인덱스
 * @returns {object} 폴더 아이콘 컴포넌트 오브젝트
 *   - el : 폴더 아이콘 컴포넌트 엘리먼트
 */
const FolderIcon = ({ index = 0 } = {}) => {
    const el = document.createElement('span');
    el.className = 'folder-icon';

    // index에 맞는 아이콘 색상을 적용한다.
    el.classList.add(`folder-icon--${index % 7}`);

    return {
        el,
    };
};

export default FolderIcon;
