const queries = require("../db/queries");

exports.getHome = async (req, res) => {
  const categories = await queries.getCategories();
  const brands = await queries.getBrands();
  //   console.log(categories, brands);

  return res.render("index", {
    title: "Home",
    categories: categories,
    brands: brands,
  });
};
exports.getEditProduct = async (req, res) => {
  const item = await queries.getProductById(req.params.product_id);
  console.log(req.params.product_id);
  console.log(item);

  return res.render("edititem", {
    item: item,
  });
};
exports.getAllProducts = async (req, res) => {
  const products = await queries.getAllProducts();
  //   console.log(products);
  res.send(products.map((p) => p.product_name));
};

exports.getByBrand = async (req, res) => {
  const products = await queries.getProductsByBrand(req.params.brand_id);
  res.render("display", {
    title: "Products by Brand",
    brandProducts: products,
  });
};
exports.getByCategory = async (req, res) => {
  const products = await queries.getProductsByCategory(req.params.category_id);
  res.render("display", {
    title: "Products by Category",
    categoryProducts: products,
  });
};

exports.editProduct = async (req, res) => {
  const item = {
    product_id: req.params.product_id,
    product_name: req.body.newName,
    description: req.body.newDescription,
    price: req.body.newPrice,
    quantity: req.body.newQuantity,
  };
  await queries.editProductById(item);
  res.redirect("/");
};
