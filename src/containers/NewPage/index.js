import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import linearCategories from '../../helpers/linearCategories';
import {
  createPage,
  deletePageById,
  getAllPages
} from '../../actions';
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

  useEffect(() => {
    dispatch(getAllPages());
  }, []);
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

  const renderPages = () => {
    return (
      <Table className="pageTable-container" responsive="sm">
        <thead>
          <tr>
            <th className="page-index">#</th>
            <th className="page-title">Title</th>
            <th className="page-description">Description</th>
            <th className="page-banners">Banner(s)</th>
            <th className="page-products">Product(s)</th>
          </tr>
        </thead>
        <tbody>
          {
            page.pages.length > 0
              ? page.pages.map((page, index) => (
                <tr key={page._id}>
                  <td className="page-index">{index + 1}</td>
                  <td className="page-title">{page.title}</td>
                  <td className="page-description">{page.description}</td>
                  <td className="page-banners">
                    {page.banners?.map((banner, index) => (
                      <img className="banner-size" src={banner?.img} alt="123" />
                    ))}
                  </td>
                  <td className="page-products">
                    {page.products?.map((product, index) => (
                      <img className="product-size" src={product?.img} alt="123" />
                    ))}
                  </td>
                  <td>
                    <button
                      className="deletePage-btn"
                      onClick={() => {
                        const payload = { pageId: page._id };
                        dispatch(deletePageById(payload));
                      }}>Delete</button>
                  </td>
                </tr>
              ))
              : null
          }
        </tbody>
      </Table>
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
              className="createPage-btn"
              onClick={() => setCreateModal(true)}
            >
              Create Page
            </button>
          </>
      }
      {renderPages()}
    </Layout>
  )
}

export default NewPage;
