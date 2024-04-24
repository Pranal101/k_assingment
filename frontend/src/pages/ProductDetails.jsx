import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams hook
import { getProductDetails } from "../actions/productAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract id from URL

  // Assuming your redux store structure has product details stored under state.productDetails
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id)); // Dispatch action with id parameter
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i}Slide`}
                />
              ))}
          </Carousel>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
