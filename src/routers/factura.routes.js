import { Router } from "express";
import { authJwt} from "../middlewares/index.js";
import * as facturacioneOrderCtrl from "../controllers/facturacion.controller.js";
import { refreshTokenMiddleware } from "../middlewares/token.Jwt.js";
const router = Router();

router.post("/", [refreshTokenMiddleware, authJwt.veryfyToken, ],facturacioneOrderCtrl.createFacturacion)
router.get("/", [refreshTokenMiddleware, authJwt.veryfyToken,],facturacioneOrderCtrl.getFacturacion)
router.get("/ID/:ID_FACTURA", [refreshTokenMiddleware, authJwt.veryfyToken,],facturacioneOrderCtrl.getFacturacionid)
router.get("/:ID_FACTURA", [refreshTokenMiddleware, authJwt.veryfyToken,],facturacioneOrderCtrl.getFacturacionByid)
router.put("/:ID_FACTURA", [refreshTokenMiddleware, authJwt.veryfyToken,],facturacioneOrderCtrl.updateFacturacionByid)


export default router;