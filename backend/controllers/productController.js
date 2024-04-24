import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apifeatures.js";

//Create a Product

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
}

//Get Product Details

export async function getProductDetails(req, res, next) {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
}

//Get all products
// export async function getAllProducts(req, res, next) {
//   const resultPerPage = 8;
//   const productsCount = await Product.countDocuments();

//   const apiFeature = new ApiFeatures(Product.find(), req.query)
//     .search()
//     .filter();

//   let products = await apiFeature.query;

//   let filteredProductsCount = products.length;

//   apiFeature.pagination(resultPerPage);

//   products = await ApiFeatures.query;

//   res.status(200).json({
//     success: true,
//     products,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount,
//   });
// }

export async function getAllProducts(req, res, next) {
  try {
    const productsCount = await Product.countDocuments();
    let filterCriteria = {};
    const { category, price } = req.query;

    // Add category filter if provided
    if (category) {
      filterCriteria.category = category;
    }

    // Construct filter criteria for price
    if (price) {
      const priceRegex = /^(lt|lte|gt|gte)?(\d+(\.\d{1,2})?)$/;
      const match = price.match(priceRegex);
      if (match) {
        const operator = match[1];
        const value = parseFloat(match[2]);

        // Define mapping for operators to MongoDB query operators
        const operatorMap = {
          lt: "$lt",
          lte: "$lte",
          gt: "$gt",
          gte: "$gte",
        };

        // Set filterCriteria.price based on the extracted operator
        if (operator && operatorMap[operator]) {
          filterCriteria.price = { [operatorMap[operator]]: value };
        } else {
          filterCriteria.price = value;
        }
      } else {
        return next(new ErrorHandler("Invalid price format", 400));
      }
    }

    const products = await Product.find(filterCriteria);
    res.status(200).json({ success: true, products, productsCount });
  } catch (error) {
    next(error);
  }
}

//Update Product

export async function updateProduct(req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
}

//Delete Product

export async function deleteProduct(req, res, next) {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }

  await Product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
}
