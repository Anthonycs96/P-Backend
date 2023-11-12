import { Router } from "express";
import { authJwt} from "../middlewares/index.js";
import * as mesasCtrl from "../controllers/mesa.controller.js";
import { refreshTokenMiddleware } from "../middlewares/token.Jwt.js";

const router = Router();

router.post("/", [refreshTokenMiddleware, authJwt.veryfyToken, ],mesasCtrl.createMesa)
router.get("/", [refreshTokenMiddleware, authJwt.veryfyToken,],mesasCtrl.getMesa)
router.get("/estado/:ESTADO", [refreshTokenMiddleware, authJwt.veryfyToken,],mesasCtrl.getMesaByEstado)
router.get("/especial/:ESTADO", [refreshTokenMiddleware, authJwt.veryfyToken,],mesasCtrl.getEspecialMesa)
router.get("/:ID_MESA", [refreshTokenMiddleware, authJwt.veryfyToken,],mesasCtrl.getMesaByEstado)
router.put("/:ID_MESA", [refreshTokenMiddleware, authJwt.veryfyToken,],mesasCtrl.updateMesaByid)
router.put("/estado/:ID_MESA", [refreshTokenMiddleware, authJwt.veryfyToken,],mesasCtrl.updateMesaEstadoByid)


export default router;