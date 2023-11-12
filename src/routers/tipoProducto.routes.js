import { Router } from "express";
import { authJwt} from "../middlewares/index.js";
import * as tipoProductoCtrl from "../controllers/tipoProducto.controller.js";
import { refreshTokenMiddleware } from "../middlewares/token.Jwt.js";

const router = Router();

router.post("/", [refreshTokenMiddleware, authJwt.veryfyToken, ],tipoProductoCtrl.createTipoProducto)
router.get("/", [refreshTokenMiddleware, authJwt.veryfyToken,],tipoProductoCtrl.getTipoProducto)
router.get("/:IDTIPOPRODUCTO", [refreshTokenMiddleware, authJwt.veryfyToken,],tipoProductoCtrl.getTipoProductoById)
router.get("/idtipproduct/:IDTIPOPRODUCTO", [refreshTokenMiddleware, authJwt.veryfyToken,],tipoProductoCtrl.getTipoProductoProductsById)
router.put("/:IDTIPOPRODUCTO", [refreshTokenMiddleware, authJwt.veryfyToken,],tipoProductoCtrl.updateTipoProductoById)

export default router;