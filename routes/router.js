const { Router } = require("express");
const getController = require("../controllers/getController");
const router = Router();
router.get("/", getController.getHome);
router.get("/brand/:brand_id", getController.getByBrand);
router.get("/category/:category_id", getController.getByCategory);
router.get("/products", getController.getAllProducts);
module.exports = router;
