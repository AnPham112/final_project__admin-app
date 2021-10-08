import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Form } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import Select from '../../components/UI/Select';
import { addProduct, deleteProductById } from '../../actions/product.action';
import { generatePublicUrl } from '../../urlConfig';
import { IoIosAdd } from 'react-icons/io';
import { BsTrash, BsEye } from "react-icons/bs";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import './style.scss';

const Products = (props) => {
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .max(50, 'Category name is too long')
      .required('Category is required'),
    quantity: yup.number()
      .typeError('Quantity is required'),
    price: yup.number()
      .typeError('Price is required'),
    description: yup.string()
      .max(200, 'Description is too long')
      .required('Description is required'),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const submitProductForm = (data) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("quantity", data.quantity);
    form.append("price", data.price);
    form.append("description", data.description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then(() =>
      setShow(false),
      setCategoryId(''),
      setProductPictures([]),
      reset({
        name: "",
        quantity: "",
        price: "",
        description: ""
      }),
      toast.success("Add product successfully!", { autoClose: 1500, theme: 'dark' })
    );
  };

  const createCategoryList = (categories, options = []) => {
    categories.map((category) => {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    })
    return options;
  }

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  const renderProducts = () => {
    return (
      <table className="content-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category?.name}</td>
                <td>
                  <button
                    onClick={() => showProductDetailsModal(product)}
                    className="btn-view-product"
                  >
                    <BsEye />
                  </button>
                  <button
                    className="btn-delete-product"
                    onClick={() => {
                      const payload = {
                        productId: product._id,
                      };
                      dispatch(deleteProductById(payload)).then(() =>
                        toast.success("Delete product successfully!", { autoClose: 1500, theme: 'dark' })
                      )
                    }}
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))
            : null
          }
        </tbody>
      </table>
    );
  }

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Add New Product'}
        buttons={[
          {
            label: 'Add',
            btnColor: 'addBtn',
            onClick: handleSubmit(submitProductForm)
          },
          {
            label: 'Cancle',
            btnColor: 'cancleBtn',
            onClick: handleClose
          }
        ]}>
        <Form.Group>
          <Form.Control
            className="form__input"
            type="text"
            name="name"
            placeholder="Product Name"
            {...register("name")}
            isInvalid={errors.name}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="form__input"
            type="number"
            name="quantity"
            placeholder="Quantity"
            {...register("quantity")}
            isInvalid={errors.quantity}
          />
          {errors.quantity && (
            <Form.Control.Feedback type="invalid">
              {errors.quantity?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="form__input"
            type="number"
            name="price"
            placeholder="Price"
            {...register("price")}
            isInvalid={errors.price}
          />
          {errors.price && (
            <Form.Control.Feedback type="invalid">
              {errors.price?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="form__input"
            as="textarea"
            name="description"
            placeholder="Description"
            {...register("description")}
            isInvalid={errors.description}
            style={{ height: '100px' }}
          />
          {errors.description && (
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder={'Select category'}
          options={createCategoryList(category.categories)}
        />
        <label className="label-input-file">Product pictures</label>
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
        {productPictures.length > 0 ?
          productPictures.map((pic, index) =>
            <div key={index}>
              {pic.name}
            </div>
          ) : null}
      </Modal>
    );
  }

  const handleCloseProductDetaislModal = () => {
    setProductDetailModal(false);
  }
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  }

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetaislModal}
        modalTitle={'Product Details'}
        size="lg"
        buttons={[
          {
            label: 'Close',
            btnColor: 'cancleBtn',
            onClick: handleCloseProductDetaislModal
          }
        ]}>
        <Row>
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category?.name}</p>
          </Col>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div className="pictureList">
              {productDetails.productPictures.map((picture, index) =>
                <div key={index} className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button className="btn-add-product" onClick={handleShow}
              >
                <IoIosAdd /><span>Add</span>
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
      <ToastContainer />
    </Layout>
  );
}

export default Products;