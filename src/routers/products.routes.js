import { Router } from "express";
import { authJwt} from "../middlewares/index.js";
import * as productsCtrl from "../controllers/products.controllers.js";
import { refreshTokenMiddleware } from "../middlewares/token.Jwt.js";

const router = Router();

// router.post("/", [refreshTokenMiddleware, authJwt.veryfyToken, authJwt.isAdmin],productsCtrl.createProduct)
// router.get("/", [refreshTokenMiddleware, authJwt.veryfyToken, authJwt.isAdmin],productsCtrl.getProducts)
// router.get("/:productId", [refreshTokenMiddleware, authJwt.veryfyToken, authJwt.isAdmin],productsCtrl.getProductByid)
// router.put("/:productId", [refreshTokenMiddleware, authJwt.veryfyToken,authJwt.isAdmin],productsCtrl.updateProductByid)

router.post("/", [refreshTokenMiddleware, authJwt.veryfyToken, ],productsCtrl.createProduct)
router.get("/", [refreshTokenMiddleware, authJwt.veryfyToken,],productsCtrl.getProducts)
router.get("/:productId", [refreshTokenMiddleware, authJwt.veryfyToken,],productsCtrl.getProductByid)
router.put("/:productId", [refreshTokenMiddleware, authJwt.veryfyToken,],productsCtrl.updateProductByid)


export default router;