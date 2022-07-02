import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper';
import belinasiApi from '../apis/belinasiApi';
import 'swiper/swiper-bundle.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import ProductCard from '../components/ProductCard';
import Shipping from '../components/Shipping';

import paymentImage from '../assets/img/other/safe-checkout.png';

SwiperCore.use([Navigation, Pagination, Thumbs]);

const ProductDetails = () => {
  const { productId } = useParams();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [currSize, setCurrSize] = useState('');
  const [currColor, setCurrColor] = useState('');
  const [product, setProduct] = useState();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [pageStatus, setPageStatus] = useState('loading');

  const sampleProduct = {
    imgs: [
      'https://images.unsplash.com/photo-1618354691229-88d47f285158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
      'https://images.unsplash.com/photo-1618354691438-25bc04584c23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80'
    ],

    id: '98df47jk43534',
    subtitle: 'Men, Shirt',
    title: 'Noice Shirt',
    price: '69$',
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    colors: ['red', 'orange', 'yellow', 'blue', 'purple'],
    creator: 'Belo',
    type: 'Shirt',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut numquam ullam is ecusandae laborum explicabo id sequi        quisquam, ab sunt deleniti quidem ea animi facilis quod        nostrum odit! Repellendus voluptas suscipit cum harum        dolor sciunt.'
  };

  const getRecommendedProducts = async () => {
    // const { data } = await belinasiApi.get('/recommendedProducts');

    // setRecommendedProducts(data.products);

    setRecommendedProducts([
      sampleProduct,
      sampleProduct,
      sampleProduct,
      sampleProduct,
      sampleProduct,
      sampleProduct,
      sampleProduct,
      sampleProduct,
      sampleProduct,
      sampleProduct
    ]);
  };

  const getProduct = async () => {
    try {
      // const { data } = await belinasiApi.get(`/products/${productId}`);

      // setProduct(data.product);

      setProduct(sampleProduct);

      setPageStatus('loaded');
    } catch (err) {
      console.log(err.message);

      setPageStatus('error');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!product) getProduct();

    if (!recommendedProducts[0]) getRecommendedProducts();
  }, []);

  const addToCart = () => {
    console.log('add to cart');
  };

  const addToWishlist = () => {
    console.log('add to wishlist');
  };

  const renderRecommendProducts = () => {
    return recommendedProducts.map(product => {
      return (
        <div className="col mb-30">
          <ProductCard product={product} />
        </div>
      );
    });

    return (
      <>
        <ProductCard product={sampleProduct} />
        <ProductCard product={sampleProduct} />
        <ProductCard product={sampleProduct} />
        <ProductCard product={sampleProduct} />
        <ProductCard product={sampleProduct} />
        <ProductCard product={sampleProduct} />
        <ProductCard product={sampleProduct} />
      </>
    );
  };

  const renderSlides = () => {
    return product.imgs.map(img => {
      return (
        <SwiperSlide className="swiper-slide">
          <div className="product__media--preview__items">
            <img
              className="product__media--preview__items--img"
              src={img}
              alt="product-media-img"
            />
          </div>
        </SwiperSlide>
      );
    });
  };

  const renderThumbs = () => {
    return product.imgs.map(img => {
      return (
        <SwiperSlide>
          <img
            className="product__media--nav__items--img"
            src={img}
            alt="product-nav-img"
          />
        </SwiperSlide>
      );
    });
  };

  const renderSizes = () => {
    return product.sizes.map(size => {
      return (
        <React.Fragment>
          <input
            checked={size === currSize ? true : false}
            onClick={() => setCurrSize(size)}
            id={size}
            name="size"
            type="radio"
          />
          <label className="variant__size--value red" htmlFor={size}>
            {size}
          </label>
        </React.Fragment>
      );
    });
  };

  const renderColors = () => {
    return product.colors.map(color => {
      return (
        <React.Fragment>
          <input
            id={`color-${color}`}
            name="color"
            type="radio"
            checked={color === currColor ? true : false}
            onClick={() => setCurrColor(color)}
          />
          <label
            className={`variant__color--value ${color}`}
            htmlFor={`color-${color}`}
            title={color}
            style={{ backgroundColor: color }}
          ></label>
        </React.Fragment>
      );
    });
  };

  if (pageStatus === 'loading') return <Preloader />;

  return (
    <React.Fragment>
      <Header />

      <main className="main__content_wrapper">
        {/* <!-- Start product details section --> */}
        <section className="product__details--section section--padding">
          <div className="container">
            <div className="row row-cols-lg-2 row-cols-md-2">
              <div className="col">
                <div className="product__details--media">
                  <div className="product__media--preview swiper">
                    <Swiper
                      className="swiper-wrapper"
                      thumbs={{ swiper: thumbsSwiper }}
                      navigation
                      pagination
                    >
                      {renderSlides()}
                    </Swiper>
                  </div>

                  <Swiper
                    className="product__media--nav swiper"
                    id="thumbs"
                    onSwiper={setThumbsSwiper}
                    slidesPerView={4}
                    spaceBetween={10}
                  >
                    {renderThumbs()}
                  </Swiper>
                </div>
              </div>
              <div className="col">
                <div className="product__details--info">
                  <form action="#">
                    <h2 className="product__details--info__title mb-15">
                      {product.title}
                    </h2>
                    <div className="product__details--info__price mb-10">
                      <span className="current__price">{product.price}</span>
                    </div>

                    <p className="product__details--info__desc mb-15">
                      {product.description}
                    </p>
                    <div className="product__variant">
                      <div className="product__variant--list mb-10">
                        <fieldset className="variant__input--fieldset">
                          <legend className="product__variant--title mb-8">
                            Color :
                          </legend>
                          {renderColors()}
                        </fieldset>
                      </div>
                      <div className="product__variant--list mb-15">
                        <fieldset className="variant__input--fieldset size">
                          <legend className="product__variant--title mb-8">
                            Size :
                          </legend>
                          {renderSizes()}
                        </fieldset>
                      </div>
                      <div className="product__variant--list quantity d-flex align-items-center mb-20">
                        <div className="quantity__box">
                          <button
                            type="button"
                            className="quantity__value quickview__value--quantity decrease"
                            aria-label="quantity value"
                            value="Decrease Value"
                            onClick={() =>
                              setQuantity(quantity > 1 ? quantity - 1 : 1)
                            }
                          >
                            -
                          </button>
                          <label>
                            <input
                              type="number"
                              className="quantity__number quickview__value--number"
                              value={quantity}
                            />
                          </label>
                          <button
                            type="button"
                            className="quantity__value quickview__value--quantity increase"
                            aria-label="quantity value"
                            value="Increase Value"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="quickview__cart--btn primary__btn"
                          onClick={addToCart}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="product__variant--list mb-15">
                        <a
                          className="variant__wishlist--icon mb-15"
                          title="Add to wishlist"
                          onClick={addToWishlist}
                        >
                          <svg
                            className="quickview__variant--wishlist__svg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="32"
                            />
                          </svg>
                          Add to Wishlist
                        </a>
                        <button
                          className="variant__buy--now__btn primary__btn"
                          type="submit"
                        >
                          Buy it now
                        </button>
                      </div>
                      <div className="product__details--info__meta">
                        <p className="product__details--info__meta--list">
                          <strong>Creator:</strong>{' '}
                          <span>{product.creator}</span>
                        </p>
                        <p className="product__details--info__meta--list">
                          <strong>Type:</strong> <span>{product.type}</span>
                        </p>
                      </div>
                    </div>
                    <div className="quickview__social d-flex align-items-center mb-15">
                      <label className="quickview__social--title">
                        Social Share:
                      </label>
                      <ul className="quickview__social--wrapper mt-0 d-flex">
                        <li className="quickview__social--list">
                          <a
                            className="quickview__social--icon"
                            target="_blank"
                            href="https://www.facebook.com/"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="7.667"
                              height="16.524"
                              viewBox="0 0 7.667 16.524"
                            >
                              <path
                                data-name="Path 237"
                                d="M967.495,353.678h-2.3v8.253h-3.437v-8.253H960.13V350.77h1.624v-1.888a4.087,4.087,0,0,1,.264-1.492,2.9,2.9,0,0,1,1.039-1.379,3.626,3.626,0,0,1,2.153-.6l2.549.019v2.833h-1.851a.732.732,0,0,0-.472.151.8.8,0,0,0-.246.642v1.719H967.8Z"
                                transform="translate(-960.13 -345.407)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Facebook</span>
                          </a>
                        </li>
                        <li className="quickview__social--list">
                          <a
                            className="quickview__social--icon"
                            target="_blank"
                            href="https://twitter.com/"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16.489"
                              height="13.384"
                              viewBox="0 0 16.489 13.384"
                            >
                              <path
                                data-name="Path 303"
                                d="M966.025,1144.2v.433a9.783,9.783,0,0,1-.621,3.388,10.1,10.1,0,0,1-1.845,3.087,9.153,9.153,0,0,1-3.012,2.259,9.825,9.825,0,0,1-4.122.866,9.632,9.632,0,0,1-2.748-.4,9.346,9.346,0,0,1-2.447-1.11q.4.038.809.038a6.723,6.723,0,0,0,2.24-.376,7.022,7.022,0,0,0,1.958-1.054,3.379,3.379,0,0,1-1.958-.687,3.259,3.259,0,0,1-1.186-1.666,3.364,3.364,0,0,0,.621.056,3.488,3.488,0,0,0,.885-.113,3.267,3.267,0,0,1-1.374-.631,3.356,3.356,0,0,1-.969-1.186,3.524,3.524,0,0,1-.367-1.5v-.057a3.172,3.172,0,0,0,1.544.433,3.407,3.407,0,0,1-1.1-1.214,3.308,3.308,0,0,1-.4-1.609,3.362,3.362,0,0,1,.452-1.694,9.652,9.652,0,0,0,6.964,3.538,3.911,3.911,0,0,1-.075-.772,3.293,3.293,0,0,1,.452-1.694,3.409,3.409,0,0,1,1.233-1.233,3.257,3.257,0,0,1,1.685-.461,3.351,3.351,0,0,1,2.466,1.073,6.572,6.572,0,0,0,2.146-.828,3.272,3.272,0,0,1-.574,1.083,3.477,3.477,0,0,1-.913.8,6.869,6.869,0,0,0,1.958-.546A7.074,7.074,0,0,1,966.025,1144.2Z"
                                transform="translate(-951.23 -1140.849)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Twitter</span>
                          </a>
                        </li>
                        <li className="quickview__social--list">
                          <a
                            className="quickview__social--icon"
                            target="_blank"
                            href="https://www.instagram.com/"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16.497"
                              height="16.492"
                              viewBox="0 0 19.497 19.492"
                            >
                              <path
                                data-name="Icon awesome-instagram"
                                d="M9.747,6.24a5,5,0,1,0,5,5A4.99,4.99,0,0,0,9.747,6.24Zm0,8.247A3.249,3.249,0,1,1,13,11.238a3.255,3.255,0,0,1-3.249,3.249Zm6.368-8.451A1.166,1.166,0,1,1,14.949,4.87,1.163,1.163,0,0,1,16.115,6.036Zm3.31,1.183A5.769,5.769,0,0,0,17.85,3.135,5.807,5.807,0,0,0,13.766,1.56c-1.609-.091-6.433-.091-8.042,0A5.8,5.8,0,0,0,1.64,3.13,5.788,5.788,0,0,0,.065,7.215c-.091,1.609-.091,6.433,0,8.042A5.769,5.769,0,0,0,1.64,19.341a5.814,5.814,0,0,0,4.084,1.575c1.609.091,6.433.091,8.042,0a5.769,5.769,0,0,0,4.084-1.575,5.807,5.807,0,0,0,1.575-4.084c.091-1.609.091-6.429,0-8.038Zm-2.079,9.765a3.289,3.289,0,0,1-1.853,1.853c-1.283.509-4.328.391-5.746.391S5.28,19.341,4,18.837a3.289,3.289,0,0,1-1.853-1.853c-.509-1.283-.391-4.328-.391-5.746s-.113-4.467.391-5.746A3.289,3.289,0,0,1,4,3.639c1.283-.509,4.328-.391,5.746-.391s4.467-.113,5.746.391a3.289,3.289,0,0,1,1.853,1.853c.509,1.283.391,4.328.391,5.746S17.855,15.705,17.346,16.984Z"
                                transform="translate(0.004 -1.492)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Instagram</span>
                          </a>
                        </li>
                        <li className="quickview__social--list">
                          <a
                            className="quickview__social--icon"
                            target="_blank"
                            href="https://www.youtube.com/"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16.49"
                              height="11.582"
                              viewBox="0 0 16.49 11.582"
                            >
                              <path
                                data-name="Path 321"
                                d="M967.759,1365.592q0,1.377-.019,1.717-.076,1.114-.151,1.622a3.981,3.981,0,0,1-.245.925,1.847,1.847,0,0,1-.453.717,2.171,2.171,0,0,1-1.151.6q-3.585.265-7.641.189-2.377-.038-3.387-.085a11.337,11.337,0,0,1-1.5-.142,2.206,2.206,0,0,1-1.113-.585,2.562,2.562,0,0,1-.528-1.037,3.523,3.523,0,0,1-.141-.585c-.032-.2-.06-.5-.085-.906a38.894,38.894,0,0,1,0-4.867l.113-.925a4.382,4.382,0,0,1,.208-.906,2.069,2.069,0,0,1,.491-.755,2.409,2.409,0,0,1,1.113-.566,19.2,19.2,0,0,1,2.292-.151q1.82-.056,3.953-.056t3.952.066q1.821.067,2.311.142a2.3,2.3,0,0,1,.726.283,1.865,1.865,0,0,1,.557.49,3.425,3.425,0,0,1,.434,1.019,5.72,5.72,0,0,1,.189,1.075q0,.095.057,1C967.752,1364.1,967.759,1364.677,967.759,1365.592Zm-7.6.925q1.49-.754,2.113-1.094l-4.434-2.339v4.66Q958.609,1367.311,960.156,1366.517Z"
                                transform="translate(-951.269 -1359.8)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Youtube</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="guarantee__safe--checkout">
                      <h5 className="guarantee__safe--checkout__title">
                        Guaranteed Safe Checkout
                      </h5>
                      <img
                        className="guarantee__safe--checkout__img"
                        src={paymentImage}
                        alt="Payment Image"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End product details section --> */}

        {/* <!-- Start product details tab section --> */}
        {/* <section className="product__details--tab__section section--padding">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <ul className="product__details--tab d-flex mb-30">
                  <li
                    className="product__details--tab__list active"
                    data-toggle="tab"
                    data-target="#description"
                  >
                    Description
                  </li>
                  <li
                    className="product__details--tab__list"
                    data-toggle="tab"
                    data-target="#reviews"
                  >
                    Product Reviews
                  </li>
                  <li
                    className="product__details--tab__list"
                    data-toggle="tab"
                    data-target="#information"
                  >
                    Additional Info
                  </li>
                  <li
                    className="product__details--tab__list"
                    data-toggle="tab"
                    data-target="#custom"
                  >
                    Custom Content
                  </li>
                </ul>
                <div className="product__details--tab__inner border-radius-10">
                  <div className="tab_content">
                    <div id="description" className="tab_pane active show">
                      <div className="product__tab--content">
                        <div className="product__tab--content__step mb-30">
                          <h2 className="product__tab--content__title h4 mb-10">
                            Nam provident sequi
                          </h2>
                          <p className="product__tab--content__desc">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam provident sequi, nemo sapiente culpa
                            nostrum rem eum perferendis quibusdam, magnam a
                            vitae corporis! Magnam enim modi, illo harum
                            suscipit tempore aut dolore doloribus deserunt
                            voluptatum illum, est porro? Ducimus dolore
                            accusamus impedit ipsum maiores, ea iusto temporibus
                            numquam eaque mollitia fugiat laborum dolor tempora
                            eligendi voluptatem quis necessitatibus nam ab?
                          </p>
                        </div>
                        <div className="product__tab--content__step">
                          <h4 className="product__tab--content__title mb-10">
                            More Details
                          </h4>
                          <ul>
                            <li className="product__tab--content__list">
                              <svg
                                className="product__tab--content__list--icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22.51"
                                height="20.443"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="48"
                                  d="M268 112l144 144-144 144M392 256H100"
                                ></path>
                              </svg>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Laboriosam, dolorum?
                            </li>
                            <li className="product__tab--content__list">
                              <svg
                                className="product__tab--content__list--icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22.51"
                                height="20.443"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="48"
                                  d="M268 112l144 144-144 144M392 256H100"
                                ></path>
                              </svg>
                              Magnam enim modi, illo harum suscipit tempore aut
                              dolore?
                            </li>
                            <li className="product__tab--content__list">
                              <svg
                                className="product__tab--content__list--icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22.51"
                                height="20.443"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="48"
                                  d="M268 112l144 144-144 144M392 256H100"
                                ></path>
                              </svg>
                              Numquam eaque mollitia fugiat laborum dolor
                              tempora;
                            </li>
                            <li className="product__tab--content__list">
                              <svg
                                className="product__tab--content__list--icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22.51"
                                height="20.443"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="48"
                                  d="M268 112l144 144-144 144M392 256H100"
                                ></path>
                              </svg>
                              Sit amet consectetur adipisicing elit. Quo
                              delectus repellat facere maiores.
                            </li>
                            <li className="product__tab--content__list">
                              <svg
                                className="product__tab--content__list--icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22.51"
                                height="20.443"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="48"
                                  d="M268 112l144 144-144 144M392 256H100"
                                ></path>
                              </svg>
                              Repellendus itaque sit quia consequuntur, unde
                              veritatis. dolorum?
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div id="reviews" className="tab_pane">
                      <div className="product__reviews">
                        <div className="product__reviews--header">
                          <h2 className="product__reviews--header__title h3 mb-20">
                            Customer Reviews
                          </h2>
                          <div className="reviews__ratting d-flex align-items-center">
                            <ul className="rating d-flex">
                              <li className="rating__list">
                                <span className="rating__list--icon">
                                  <svg
                                    className="rating__list--icon__svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14.105"
                                    height="14.732"
                                    viewBox="0 0 10.105 9.732"
                                  >
                                    <path
                                      data-name="star - Copy"
                                      d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                      transform="translate(0 -0.018)"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                              </li>
                              <li className="rating__list">
                                <span className="rating__list--icon">
                                  <svg
                                    className="rating__list--icon__svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14.105"
                                    height="14.732"
                                    viewBox="0 0 10.105 9.732"
                                  >
                                    <path
                                      data-name="star - Copy"
                                      d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                      transform="translate(0 -0.018)"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                              </li>
                              <li className="rating__list">
                                <span className="rating__list--icon">
                                  <svg
                                    className="rating__list--icon__svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14.105"
                                    height="14.732"
                                    viewBox="0 0 10.105 9.732"
                                  >
                                    <path
                                      data-name="star - Copy"
                                      d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                      transform="translate(0 -0.018)"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                              </li>
                              <li className="rating__list">
                                <span className="rating__list--icon">
                                  <svg
                                    className="rating__list--icon__svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14.105"
                                    height="14.732"
                                    viewBox="0 0 10.105 9.732"
                                  >
                                    <path
                                      data-name="star - Copy"
                                      d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                      transform="translate(0 -0.018)"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                              </li>
                              <li className="rating__list">
                                <span className="rating__list--icon">
                                  <svg
                                    className="rating__list--icon__svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14.105"
                                    height="14.732"
                                    viewBox="0 0 10.105 9.732"
                                  >
                                    <path
                                      data-name="star - Copy"
                                      d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                      transform="translate(0 -0.018)"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                              </li>
                            </ul>
                            <span className="reviews__summary--caption">
                              Based on 2 reviews
                            </span>
                          </div>
                          <a
                            className="actions__newreviews--btn primary__btn"
                            href="#writereview"
                          >
                            Write A Review
                          </a>
                        </div>
                        <div className="reviews__comment--area">
                          <div className="reviews__comment--list d-flex">
                            <div className="reviews__comment--thumb">
                              <img
                                src="assets/img/other/comment-thumb1.png"
                                alt="comment-thumb"
                              />
                            </div>
                            <div className="reviews__comment--content">
                              <div className="reviews__comment--top d-flex justify-content-between">
                                <div className="reviews__comment--top__left">
                                  <h3 className="reviews__comment--content__title h4">
                                    Richard Smith
                                  </h3>
                                  <ul className="rating reviews__comment--rating d-flex">
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <span className="reviews__comment--content__date">
                                  February 18, 2022
                                </span>
                              </div>
                              <p className="reviews__comment--content__desc">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Eos ex repellat officiis
                                neque. Veniam, rem nesciunt. Assumenda
                                distinctio, autem error repellat eveniet ratione
                                dolor facilis accusantium amet pariatur, non
                                eius!
                              </p>
                            </div>
                          </div>
                          <div className="reviews__comment--list margin__left d-flex">
                            <div className="reviews__comment--thumb">
                              <img
                                src="assets/img/other/comment-thumb2.png"
                                alt="comment-thumb"
                              />
                            </div>
                            <div className="reviews__comment--content">
                              <div className="reviews__comment--top d-flex justify-content-between">
                                <div className="reviews__comment--top__left">
                                  <h3 className="reviews__comment--content__title h4">
                                    Laura Johnson
                                  </h3>
                                  <ul className="rating reviews__comment--rating d-flex">
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <span className="reviews__comment--content__date">
                                  February 18, 2022
                                </span>
                              </div>
                              <p className="reviews__comment--content__desc">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Eos ex repellat officiis
                                neque. Veniam, rem nesciunt. Assumenda
                                distinctio, autem error repellat eveniet ratione
                                dolor facilis accusantium amet pariatur, non
                                eius!
                              </p>
                            </div>
                          </div>
                          <div className="reviews__comment--list d-flex">
                            <div className="reviews__comment--thumb">
                              <img
                                src="assets/img/other/comment-thumb3.png"
                                alt="comment-thumb"
                              />
                            </div>
                            <div className="reviews__comment--content">
                              <div className="reviews__comment--top d-flex justify-content-between">
                                <div className="reviews__comment--top__left">
                                  <h3 className="reviews__comment--content__title h4">
                                    John Deo
                                  </h3>
                                  <ul className="rating reviews__comment--rating d-flex">
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="rating__list">
                                      <span className="rating__list--icon">
                                        <svg
                                          className="rating__list--icon__svg"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14.105"
                                          height="14.732"
                                          viewBox="0 0 10.105 9.732"
                                        >
                                          <path
                                            data-name="star - Copy"
                                            d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                            transform="translate(0 -0.018)"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <span className="reviews__comment--content__date">
                                  February 18, 2022
                                </span>
                              </div>
                              <p className="reviews__comment--content__desc">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Eos ex repellat officiis
                                neque. Veniam, rem nesciunt. Assumenda
                                distinctio, autem error repellat eveniet ratione
                                dolor facilis accusantium amet pariatur, non
                                eius!
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          id="writereview"
                          className="reviews__comment--reply__area"
                        >
                          <form action="#">
                            <h3 className="reviews__comment--reply__title mb-15">
                              Add a review
                            </h3>
                            <div className="reviews__ratting d-flex align-items-center mb-20">
                              <ul className="rating d-flex">
                                <li className="rating__list">
                                  <span className="rating__list--icon">
                                    <svg
                                      className="rating__list--icon__svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14.105"
                                      height="14.732"
                                      viewBox="0 0 10.105 9.732"
                                    >
                                      <path
                                        data-name="star - Copy"
                                        d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                        transform="translate(0 -0.018)"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </span>
                                </li>
                                <li className="rating__list">
                                  <span className="rating__list--icon">
                                    <svg
                                      className="rating__list--icon__svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14.105"
                                      height="14.732"
                                      viewBox="0 0 10.105 9.732"
                                    >
                                      <path
                                        data-name="star - Copy"
                                        d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                        transform="translate(0 -0.018)"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </span>
                                </li>
                                <li className="rating__list">
                                  <span className="rating__list--icon">
                                    <svg
                                      className="rating__list--icon__svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14.105"
                                      height="14.732"
                                      viewBox="0 0 10.105 9.732"
                                    >
                                      <path
                                        data-name="star - Copy"
                                        d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                        transform="translate(0 -0.018)"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </span>
                                </li>
                                <li className="rating__list">
                                  <span className="rating__list--icon">
                                    <svg
                                      className="rating__list--icon__svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14.105"
                                      height="14.732"
                                      viewBox="0 0 10.105 9.732"
                                    >
                                      <path
                                        data-name="star - Copy"
                                        d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                        transform="translate(0 -0.018)"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </span>
                                </li>
                                <li className="rating__list">
                                  <span className="rating__list--icon">
                                    <svg
                                      className="rating__list--icon__svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14.105"
                                      height="14.732"
                                      viewBox="0 0 10.105 9.732"
                                    >
                                      <path
                                        data-name="star - Copy"
                                        d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                        transform="translate(0 -0.018)"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="row">
                              <div className="col-12 mb-10">
                                <textarea
                                  className="reviews__comment--reply__textarea"
                                  placeholder="Your Comments...."
                                ></textarea>
                              </div>
                              <div className="col-lg-6 col-md-6 mb-15">
                                <label>
                                  <input
                                    className="reviews__comment--reply__input"
                                    placeholder="Your Name...."
                                    type="text"
                                  />
                                </label>
                              </div>
                              <div className="col-lg-6 col-md-6 mb-15">
                                <label>
                                  <input
                                    className="reviews__comment--reply__input"
                                    placeholder="Your Email...."
                                    type="email"
                                  />
                                </label>
                              </div>
                            </div>
                            <button
                              className="reviews__comment--btn text-white primary__btn"
                              data-hover="Submit"
                              type="submit"
                            >
                              SUBMIT
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div id="information" className="tab_pane">
                      <div className="product__tab--conten">
                        <div className="product__tab--content__step mb-30">
                          <h2 className="product__tab--content__title h4 mb-10">
                            Nam provident sequi
                          </h2>
                          <p className="product__tab--content__desc">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam provident sequi, nemo sapiente culpa
                            nostrum rem eum perferendis quibusdam, magnam a
                            vitae corporis! Magnam enim modi, illo harum
                            suscipit tempore aut dolore doloribus deserunt
                            voluptatum illum, est porro? Ducimus dolore
                            accusamus impedit ipsum maiores, ea iusto temporibus
                            numquam eaque mollitia fugiat laborum dolor tempora
                            eligendi voluptatem quis necessitatibus nam ab?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div id="custom" className="tab_pane">
                      <div className="product__tab--content">
                        <div className="product__tab--content__step mb-30">
                          <h2 className="product__tab--content__title h4 mb-10">
                            Nam provident sequi
                          </h2>
                          <p className="product__tab--content__desc">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nam provident sequi, nemo sapiente culpa
                            nostrum rem eum perferendis quibusdam, magnam a
                            vitae corporis! Magnam enim modi, illo harum
                            suscipit tempore aut dolore doloribus deserunt
                            voluptatum illum, est porro? Ducimus dolore
                            accusamus impedit ipsum maiores, ea iusto temporibus
                            numquam eaque mollitia fugiat laborum dolor tempora
                            eligendi voluptatem quis necessitatibus nam ab?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <!-- End product details tab section --> */}

        {/* <!-- Start product section --> */}
        <section className="product__section product__section--style3 section--padding">
          <div className="container product3__section--container">
            <div className="section__heading text-center mb-50">
              <h2 className="section__heading--maintitle">You may also like</h2>
            </div>

            <div class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n30">
              {renderRecommendProducts()}
            </div>
          </div>
        </section>
        {/* <!-- End product section --> */}

        {/* <!-- Start shipping section --> */}
        <Shipping />
        {/* <!-- End shipping section --> */}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default ProductDetails;
