import Slider from '../components/Slider.js';
import Separator from '../components/Separator.js';
import Input from '../components/Input.js';
import Spacing from '../components/Spacing.js';
import Button from '../components/Button.js';
import LabeledContainer from '../components/LabeledContainer.js';

/**
 * Todo 아이템 추가 컴포넌트  
 * 슬라이더를 이용해 Todo 아이템을 만들 수 있다.
 * @param {function} onAddItem - 아이템 추가 리스너 함수
 * @return {object} Todo 아이템 추가 컴포넌트 오브젝트
 *   - el : 아이템 추가 컴포넌트의 엘리먼트
 *   - open : 아이템 추가 컴포넌트를 화면에 표시한다
 */
const Appender = ({ onAddItem } = {}) => {
    /**
     * 아이템 추가 메인 슬라이더
     */
    const slider = Slider();
    slider.el.classList.add('appender');

    /**
     * 아이템 추가 에디터 컨테이너
     */
    const container = slider.containerEl;
    container.classList.add('appender__container');

    const title = document.createElement('h2');
    title.className = 'appender__title';
    title.textContent = '할 일 추가';
    container.appendChild(title);

    const separator = Separator();
    container.appendChild(separator.el);

    /**
     * Todo 추가 입력폼
     */
    const labeledInput = LabeledContainer({ text: '할 일' });
    labeledInput.el.classList.add('appender__input');
    const input = Input();
    labeledInput.append(input.el);
    container.appendChild(labeledInput.el);

    const spacing = Spacing();
    container.appendChild(spacing.el);

    /**
     * 입력폼 내용으로 Todo 아이템을 추가한다.  
     * 입력한 내용이 없다면 추가하지 않는다.
     * 내용을 처리한 뒤, 입력폼을 초기화하고 슬라이더를 닫는다.
     */
    const onAdd = () => {
        const content = input.getValue();
        if (!content) {
            return;
        }

        onAddItem(content);

        input.setValue('');
        slider.close();
    };

    /**
     * Todo 아이템 추가 버튼
     */
    const addButton = Button({ text: '추가', round: true, onClick: onAdd });
    container.appendChild(addButton.el);

    return {
        el: slider.el,
        open: slider.open,
    };
};

export default Appender;
