import { Router } from 'express';
import { getTodos, addTodo } from '../stores/todo.js'

const router = Router();

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

export default router;