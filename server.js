import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";

import db from "./src/config/db.js";

import coreRoutes from "./src/routes/coreRoutes.js";
import userRoutes from "./src/routes/userRouters.js";
import sellerRoutes from "./src/routes/sellerRouter.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import categoryRoutes from "./src/routes/categoriesRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import businessRoutes from "./src/routes/businessRoutes.js";
import businessCategoryRoutes from "./src/routes/businessCategoryRoutes.js";
import wishListRoutes from "./src/routes/wishListRoutes.js";
import addressRoutes from "./src/routes/addressRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

import { errorHandler } from "./src/middlewares/errorMiddlewares.js";
import notFoundMiddleware from "./src/middlewares/notFoundMiddleware.js";

// initialization
const app = express();
dotenv.config();

// database connection
try {
  await db();
} catch (err) {
  console.err(err.red.bold);
  process.exit(1);
}

// middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// constants
const HOST = process.env.HOST;
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;

// routes
app.use("/api", coreRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/business-categories", businessCategoryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlists", wishListRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);

// not found middleware
app.use(notFoundMiddleware);

// error handler middleware
app.use(errorHandler);

// listen
app.listen(PORT, () => {
  console.log(
    `Server is running in ${NODE_ENV} mode on ${HOST}:${PORT}`.blue.bold
  );
});
