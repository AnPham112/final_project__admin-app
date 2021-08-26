import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import linearCategories from '../../helpers/linearCategories';
import { createPage } from '../../actions';
import './style.css';
const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const category = useSelector(state => state.category);
  const page = useSelector(state => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('category', category);
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModal(false);
      setTitle('');
      setCategoryId('');
      setDesc('');
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const category = categories.find(category =>
      category.value == e.target.value);
    setCategoryId(e.target.value);
    setType(category.type);
  }

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  }

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  }

  const submitPageForm = (e) => {
    if (title === "") {
      console.log('Title is required');
      return;
    }
    const form = new FormData();
    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    banners.forEach((banner, index) => {
      form.append('banners', banner);
    });
    products.forEach((product, index) => {
      form.append('products', product);
    });
    dispatch(createPage(form));
  }

  const handleClose = () => {
    setCreateModal(false);
  }

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={'Create New Page'}
        handleClose={handleClose}
        buttons={[
          {
            label: 'Add',
            btnColor: 'addBtn',
            onClick: submitPageForm
          },
          {
            label: 'Cancle',
            btnColor: 'cancleBtn',
            onClick: handleClose
          }
        ]}
      >
        <Container>
          <Input
            type="select"
            value={categoryId}
            onChange={onCategoryChange}
            placeholder={'Select Category'}
            options={categories}
          />
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={'Page Title'}
          />
          <Input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={'Page Desc'}
          />
          <label className="create-page__banner">Banner(s)</label>
          <input
            className="form-control"
            type="file"
            name="banners"
            onChange={handleBannerImages}
          />
          {
            banners.length > 0 ?
              banners.map((banner, index) =>
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ) : null
          }
          <label className="create-page__product">Product(s)</label>
          <input
            className="form-control"
            type="file"
            name="products"
            onChange={handleProductImages}
          />
          {
            products.length > 0 ?
              products.map((product, index) =>
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ) : null
          }

        </Container>
      </Modal>
    )
  }

  return (
    <Layout sidebar>
      {
        page.loading ?
          <p>Creating Page...please wait</p>
          :
          <>
            {renderCreatePageModal()}
            <button
              onClick={() => setCreateModal(true)}
            >
              Create Page
            </button>
            {/* {JSON.stringify({ page })} */}
          </>
      }
    </Layout>
  )
}

export default NewPage;
