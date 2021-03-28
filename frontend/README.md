🖥 **Frontend**
=======

Todo App Client Project  
<br />

# 실행방법  
> npm이 설치되어 있어야 합니다  

frontend 에서는 파일 제공을 위해 http-server를 사용합니다.  
먼저 http-server를 설치해야 합니다.  
```
npm install
```
<br />

http-server를 실행하면 브라우저로 클라이언트에 접속할 수 있습니다.  
기본 주소로 **localhost:9001**을 사용합니다.  
```
npm start
```
<br />

### **localhost:9001**에 접속이 안돼요  
시스템에서 localhost에 접속할 수 없다면 http-server 실행시 표시된 ip로 접속할 수 있습니다.  
<br /><br />


# 컴포넌트 작성 스타일
Todo App은 작은 단위의 컴포넌트를 만들고 조합하는 방식을 지향합니다.  
<br />

컴포넌트 생성은 `function`을 사용합니다.  
- DOM 엘리먼트와 기타 기능을 합친 component object를 반환하는 function을 작성
```javascript
const Component = () => {
    const el = document.createElement('div');

    return {
        el,
    };
};

export default Component;
```

- 호출한 곳에서는 컴포넌트를 생성해서 child로 등록
```javascript
import Component from './Component.js';

const View = () => {
    const el = document.createElement('main');

    const component = Component();
    el.appendChild(component.el);

    return {
        el,
    };
};

export default View;
```
<br />

## 이런 방식을 사용한 이유?
여러 vanilla.js 예제들이 자식에게 자신의 DOM Element를 넘겨주고  
자식은 넘겨받은 부모 DOM에 등록하는 방식을 사용하고 있습니다.  

이런 방식은 흐름을 알기가 어렵고,  
많이 사용하는 React JSX, Vue Html Template 같은 방식과 괴리가 있습니다.  

그러므로 컴포넌트는 자신의 DOM과 기능을 리턴하는 함수로 구현하고  
부모 레벨에서 자식을 생성해 사용하는 방식으로 만들었습니다.  
<br /><br />

# 데이터 저장
데이터는 모두 서버에 저장합니다.  
클라이언트는 특별한 정보를 저장하지 않으며 대부분의 데이터를 서버에서 불러와 표시합니다.  
이런 구조는 일반적인 클라이언트 처럼 만들 수 있고,  
fetch API도 실습해 볼 수 있습니다.  
<br /><br />

# 저장소
작은 단위의 컴포넌트로 분할된 상태에서는 데이터의 전달이 길어질 수 있습니다.  
또 서로의 상태가 복잡하게 꼬이게 될 가능성이 높습니다.  
데이터의 연결이 복잡해 지지 않도록 redux나 vuex와 유사한 간이 저장소를 만들어서 사용합니다.  
<br />

```javascript
const [store, dispatch, subscribe] = useStore();
```
- store를 통해 저장소의 값에 접근 가능
- subscribe를 사용해 저장소 변경 구독을 등록할 수 있음  
- dispatch를 사용해 저장소를 변경할 수 있음  
- dispatch가 실행되면 내부 reducer를 실행하고 구독 목록에 있는 콜백을 실행함  
