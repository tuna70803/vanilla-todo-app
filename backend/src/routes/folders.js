import { Router } from 'express';
import {
    getFolders,
    addFolder,
    getFolder,
    patchFolder,
} from '../stores/folder.js';

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

/**
 * PUT /folders/:folder_id
 * body: { name }
 * 폴더 정보를 수정한다.
 */
router.put('/:folder_id', (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send('잘못된 폴더 이름');
        }

        const folder = getFolder(req.params.folder_id);
        if (!folder) {
            return res.status(400).send('폴더가 없습니다');
        }

        folder.name = name;
        patchFolder(folder);

        res.json(folder);
    } catch (error) {
        console.error(error);
        next();
    }
});

export default router;
