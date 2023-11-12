import { Router } from "express";
import { authJwt} from "../middlewares/index.js";
import * as detalleOrderCtrl from "../controllers/detalleOrden.controller.js";
import { refreshTokenMiddleware } from "../middlewares/token.Jwt.js";

const router = Router();

router.post("/", [refreshTokenMiddleware, authJwt.veryfyToken, ],detalleOrderCtrl.createDetalleOrder)
router.get("/", [refreshTokenMiddleware, authJwt.veryfyToken,],detalleOrderCtrl.getDetalleOrder)
router.get("/DetalleOrderOrden/:ID_ORDEN", [refreshTokenMiddleware, authJwt.veryfyToken,],detalleOrderCtrl.getDetalleOrderOrden)
router.get("/:detalleOrderId", [refreshTokenMiddleware, authJwt.veryfyToken,],detalleOrderCtrl.getDetalleOrderByid)
router.put("/:detalleOrderId", [refreshTokenMiddleware, authJwt.veryfyToken,],detalleOrderCtrl.updateDetalleOrderByid)


export default router;