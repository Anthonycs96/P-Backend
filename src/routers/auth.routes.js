import { Router } from "express";
const routes = Router();
import * as authCtrl from  '../controllers/auth.controller.js'

routes.post('/signup', authCtrl.signUp)

routes.post('/signin', authCtrl.signIn)

export default routes;