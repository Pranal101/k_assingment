import React, { Fragment, useEffect } from "react";
import ImageSlider from "../components/ImageSlider";
import Products from "./Products";
import MetaData from "../components/MetaData";
import { getProduct } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const images = [
    "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  return (
    <Fragment>
      {loading ? (
        "loading"
      ) : (
        <Fragment>
          <MetaData title="Home" />
          <div>
            <p>Welcome to Ecommerce</p>
          </div>
          <div>
            <h1>My Image Slider</h1>
            <ImageSlider images={images} />
          </div>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Products key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
