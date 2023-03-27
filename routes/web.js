import express from 'express';
import SchoolController from '../controllers/SchoolController.js';

const router = express.Router();

router.get("/", SchoolController.homePage)
router.get("/login", SchoolController.loginPage)
router.post("/login", SchoolController.loginAuthentication)
router.post("/fees", SchoolController.createDoc)
router.post("/fees/:id", SchoolController.deleteDoc)
router.post("/edit/:id", SchoolController.editDoc)
router.post("/update/:id", SchoolController.updateDoc)


export default router;