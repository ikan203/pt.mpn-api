import express from "express";
import BUController, { updatePotoBU } from '../controllers/bidang-usaha-controller.js';
import { authMiddleware } from "../middleware/auth-middleware.js";
import { validationBU } from "../validations/bidang-usaha-validation.js";
import { PotoBUMiddleware } from "../middleware/poto-bu-middleware.js";

const BURouter = express.Router();

// Bebas tanpa login
BURouter.get('/', BUController.getAllBidangUsaha);
BURouter.get('/:id', BUController.getBidangUsahaById);
BURouter.get('/foto/:id', upload("poto") /* Memanggil middleware upload poto*/,  BUController.getPotoBUById );

// BURouter.use(authMiddleware); // Wajib login
BURouter.post(
    '/add', 
    validationBU,
    PotoBUMiddleware("poto"),
    BUController.createBidangUsaha
);

BURouter.put(
    '/:id',
    validationBU, 
    BUController.updateBidangUsaha
);

BURouter.put(
    '/foto/:id',
    PotoBUMiddleware("poto"),        // Memanggil middleware upload poto
    BUController.updatePotoBU
);

BURouter.delete(
    '/:id',
    BUController.deleteBidangUsaha
);

BURouter.delete(
    '/foto/:id',
    BUController.deletePotoBU
);

export { BURouter };
