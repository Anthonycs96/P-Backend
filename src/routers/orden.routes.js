import { Router } from "express";
import { authJwt} from "../middlewares/index.js";
import * as ordenCtrl from "../controllers/orden.controller.js";
import { refreshTokenMiddleware } from "../middlewares/token.Jwt.js";

const router = Router();

router.post("/", [refreshTokenMiddleware, authJwt.veryfyToken, ],ordenCtrl.createOrden)
router.get("/", [refreshTokenMiddleware, authJwt.veryfyToken,],ordenCtrl.getOrden)
router.get("/:ordenId", [refreshTokenMiddleware, authJwt.veryfyToken,],ordenCtrl.getOrdenByid)
router.put("/:ID_ORDEN", [refreshTokenMiddleware, authJwt.veryfyToken,],ordenCtrl.updateOrdenByid)

export default router;