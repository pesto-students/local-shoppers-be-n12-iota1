import express from "express";
import multer from "multer";
import { body } from "express-validator";
import {
  getBusiness,
  updateBusiness,
  createBusiness,
} from "../controllers/businessControllers.js";

import {
  allowSellerOnly,
  authenticateSeller,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();
const upload = multer();

router.post(
  "/new",
  [
    authenticateSeller,
    allowSellerOnly,
    upload.single("image"),
    body("name").notEmpty().isString(),
    body("description").notEmpty().isString(),
    body("business_category_id").exists().notEmpty().isString(),
  ],
  createBusiness
);

router.put(
  "/:business_id",
  [authenticateSeller, allowSellerOnly, upload.single("image")],
  updateBusiness
);

router.get("/:business_id", getBusiness);

export default router;
