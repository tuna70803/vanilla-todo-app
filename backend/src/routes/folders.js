import { Router } from 'express';
import { getFolders, addFolder } from '../stores/folder.js';

const router = Router();

/**
 * GET /folders
 * 모든 폴더 목록을 반환한다.
 */
router.get('/', (_, res, next) => {
    try {
        const folders = getFolders();
        res.json(folders);
    } catch (error) {
        console.error(error);
        next();
    }
});

/**
 * POST /folders
 * body: { name }
 * 새 폴더를 추가 한다.
 */
router.post('/', (req, res, next) => {
    try {
        const newName = req.body.name;
        if (!newName) {
            return res.status(400).send('잘못된 폴더 이름');
        }

        const newFolder = addFolder(newName);

        res.json(newFolder);
    } catch (error) {
        console.error(error);
        next();
    }
});

export default router;
