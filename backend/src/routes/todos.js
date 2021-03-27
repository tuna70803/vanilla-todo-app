import { Router } from 'express';
import {
    getTodos,
    addTodo,
    updateTodo,
    getImportantTodos,
    sweepTodos,
} from '../stores/todo.js';

const router = Router();

/**
 * GET /todos/important
 * important를 설정한 모든 Todo 목록을 반환한다.
 */
router.get('/important', (_, res, next) => {
    try {
        const todos = getImportantTodos();

        res.json(todos);
    } catch (error) {
        console.error(error);
        next();
    }
});

/**
 * GET /todos/:folder_id
 * 지정한 폴더의 Todo 목록을 반환한다.
 */
router.get('/:folder_id', (req, res, next) => {
    try {
        const { folder_id } = req.params;
        if (!folder_id) {
            return res.status(400).send('잘못된 폴더 ID');
        }

        const todos = getTodos(folder_id);

        res.json(todos);
    } catch (error) {
        console.error(error);
        next();
    }
});

/**
 * POST /todos
 * body: { folderId, content }
 * 폴더에 Todo를 추가한다.
 */
router.post('/', (req, res, next) => {
    try {
        const { folderId, content } = req.body;
        if (!folderId || !content) {
            return res.status(400).send('잘못된 정보');
        }

        const newTodo = addTodo(folderId, content);
        if (newTodo === null) {
            return res.status(409).send('Todo를 추가할 수 없습니다');
        }

        res.json(newTodo);
    } catch (error) {
        console.error(error);
        next();
    }
});

/**
 * PUT /todos/:todo_id
 * body: { content, completed, important }
 * Todo 내용을 수정한다.  
 * PATCH Method가 더 알맞으나 클라이언트에서 보낼 수 없는 문제가 있으므로 PUT을 사용한다.
 */
router.put('/:todo_id', (req, res, next) => {
    try {
        const { todo_id } = req.params;
        const { content, completed, important } = req.body;

        const todo = updateTodo(todo_id, { content, completed, important });
        if (!todo) {
            return res.status(409).send('Todo를 수정할 수 없습니다');
        }

        res.json(todo);
    } catch (error) {
        console.error(error);
        next();
    }
});

/**
 * DELETE /todos/:folder_id/completed
 * 완료한 Todo 아이템들을 제거한다.
 */
router.delete('/sweep/:folder_id', (req, res, next) => {
    try {
        const folderId = req.params.folder_id;
        if (!folderId) {
            return res.status(400).send('잘못된 폴더 ID');
        }

        const result = sweepTodos(folderId);
        if (result === false) {
            return res.status(409).send('완료 아이템을 제거할 수 없습니다');
        }

        res.sendStatus(204)
    } catch (error) {
        console.error(error);
        next();
    }
});

export default router;
