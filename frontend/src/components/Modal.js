import Button from '../components/Button.js';

/**
 * 모달 컴포넌트  
 * 전달한 컨텐츠와 취소, 완료 버튼을 표시한다.  
 * @param {HTMLElement} contentEl - 컨텐츠 엘리먼트
 * @param {string} cancel - 취소 버튼 텍스트
 * @param {string} done - 완료 버튼 텍스트
 * @param {function} onDismiss - 모달이 사라질 때 리스너
 * @param {object} options - 모달 옵션
 *   - preventBgClose : 배경을 클릭해도 모달을 닫지 않는다
 * @returns {object} 모달 컴포넌트 오브젝트
 *   - el : 모달 컴포넌트 엘리먼트
 */
const Modal = ({ contentEl, cancel, done, onDismiss, options = {} } = {}) => {
    /**
     * 메인 모달 엘리먼트  
     * 모달 엘리먼트는 전체 컴포넌트이자 배경을 담당한다.
     */
    const el = document.createElement('div');
    el.className = 'modal';

    /**
     * 모달 창을 닫는다.  
     * 창을 닫을 때 리스너에게 어떤 상태로 창을 닫는지 알려준다.
     * @param {string} status - 모달창 상태 (done, cancel)
     */
    const dismiss = (status) => {
        if (typeof onDismiss === 'function') {
            onDismiss(status);
        }
    };

    /**
     * 배경을 클릭하면 모달을 캔슬한다.
     * 기본은 배경 클릭으로 모달을 닫을 수 있지만,  
     * 방지 옵션을 설정하면 닫지 않는다.
     */
    if (!options.preventBgClose) {
        el.addEventListener('click', () => dismiss('cancel'));
    }

    /**
     * 컨테이너 엘리먼트
     */
    const containerEl = document.createElement('section');
    containerEl.className = 'modal__container';
    containerEl.addEventListener('click', event => event.stopPropagation());
    el.appendChild(containerEl);

    /**
     * 내용을 컨테이너에 추가한다.
     */
    contentEl && containerEl.appendChild(contentEl);

    /**
     * 버튼 컨테이너 엘리먼트
     */
    const buttonsEl = document.createElement('footer');
    buttonsEl.className = 'modal__buttons';
    containerEl.appendChild(buttonsEl);

    /**
     * 취소 버튼
     */
    const cancelButton = Button({
        classname: 'modal__cancel',
        text: cancel ?? 'Cancel',
        flat: true,
        onClick: () => dismiss('cancel'),
    });
    buttonsEl.appendChild(cancelButton.el);

    /**
     * 완료 버튼
     */
    const doneButton = Button({
        classname: 'modal__done',
        text: done ?? 'Done',
        onClick: () => dismiss('done'),
    });
    buttonsEl.appendChild(doneButton.el);

    return {
        el,
    };
};

export default Modal;
