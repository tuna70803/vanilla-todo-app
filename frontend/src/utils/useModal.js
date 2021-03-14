import Modal from '../components/Modal.js';

/**
 * 모달 컨테이너 엘리먼트
 */
let modalContainer = null;

/**
 * 모달 컨테이너를 등록한다.  
 * 모달을 사용하면 등록한 컨테이너에 추가하고 제거한다.
 * @param {HTMLElement} container - 모달을 추가할 컨테이너 엘리먼트
 */
export const registerModalContainer = (container) => {
    if (container instanceof Node === false) {
        console.warn('모달 컨테이너는 Node 엘리먼트에 등록할 수 있습니다.');
        return;
    }

    modalContainer = container;
};

/**
 * 모달을 표시한다.
 * @param {HTMLElement} contentEl - 컨텐츠 엘리먼트
 * @param {string} cancel - 취소 버튼 텍스트
 * @param {string} done - 완료 버튼 텍스트
 * @param {function} onDismiss - 모달이 사라질 때 리스너
 * @param {object} options - 모달 옵션
 */
export const showModal = ({ contentEl, cancel, done, onDismiss, options } = {}) => {
    if (modalContainer === null) {
        console.warn('등록한 모달 컨테이너가 없습니다.');
        return;
    }

    const closeModal = (status) => {
        if (typeof onDismiss === 'function') {
            onDismiss(status);
        }

        modalContainer.removeChild(modal.el);
    };
    const modal = Modal({
        contentEl,
        cancel,
        done,
        onDismiss: closeModal,
        options,
    });
    modalContainer.appendChild(modal.el);
};
