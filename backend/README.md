📡 **Backend**
=======

Todo App Server Project  

백엔드는 Todo 데이터를 관리하고 fetch API 실습을 지원합니다.  
Express.js를 사용한 Node 서버입니다.  
<br /><br />

# 실행 방법
> npm이 설치되어 있어야 합니다

먼저 express 및 기타 라이브러리를 설치해야 합니다.  
```
npm install
```
<br />

설치후 express를 실행시킵니다.  
기본으로 **localhost:9002** 에서 실행됩니다.  
```
$ npm start
```
<br /><br />

# 데이터 저장
backend 프로젝트는 Todo App의 실습을 위한 서포트 서버인데  
데이터베이스까지 사용하면 필요 이상의 준비가 필요합니다.  
npm 만으로 간단히 프로젝트를 구성하기 위해서 store.js를 사용합니다.  

store.js로 node 서버에서도 localStroage를 사용할 수 있습니다.  
단, 서버를 종료하면 저장한 데이터도 같이 사라집니다.  
<br /><br />

# API 목록

## Folder
- /folders (GET) : 모든 폴더 목록을 반환합니다.  
- /folders (POST) : 새 폴더를 추가합니다.  
- /folders/{folder_id} (PUT) : 폴더 정보를 수정합니다.  
<br />

## Todo
- /todos/important (GET) : 중요함을 설정한 모든 Todo 목록을 반환합니다.  
- /todos/{folder_id} (GET) : 폴더의 Todo 목록을 반환합니다.  
- /todos (POST) : 폴더에 새 Todo를 추가합니다.  
- /todos/{todo_id} (PUT) : Todo 내용을 수정합니다.  
- /todos/sweep/{folder_id} (DELETE) : 폴더의 완료한 Todo를 모두 제거합니다.  
