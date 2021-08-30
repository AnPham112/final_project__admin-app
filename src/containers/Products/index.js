import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { addProduct, deleteProductById } from '../../actions/product.action';
import { generatePublicUrl } from '../../urlConfig';
import './style.scss';
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload
} from 'react-icons/io';

const Products = (props) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
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

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form)).then(() =>
      setShow(false),
      setName(''),
      setQuantity(''),
      setPrice(''),
      setDescription(''),
      setCategoryId(''),
      setProductPictures([]),
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
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0
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
                      View
                    </button>
                    <button
                      className="btn-delete-product"
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              : null
          }
        </tbody>
      </Table>
    )
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
            onClick: submitProductForm
          },
          {
            label: 'Cancle',
            btnColor: 'cancleBtn',
            onClick: handleClose
          }
        ]}>
        <Input
          type={'text'}
          placeholder={'Product Name'}
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        <Input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => { setQuantity(e.target.value) }}
        />
        <Input
          className="input-modal"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => { setPrice(e.target.value) }}
        />
        <Input
          className="input-modal"
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
        />
        <Input
          type="select"
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
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category?.name}</p>
          </Col>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.desciption}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div className="pictureList">
              {productDetails.productPictures.map(picture =>
                <div className="productImgContainer">
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
              <button
                className="btn-add-product"
                onClick={handleShow}
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
    </Layout>
  );
}

export default Products;