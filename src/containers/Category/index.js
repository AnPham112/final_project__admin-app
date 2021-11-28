import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction
} from '../../actions';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  FaRegCircle,
  FaCheckCircle
} from 'react-icons/fa';
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload
} from 'react-icons/io';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import Select from '../../components/UI/Select';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import DeleteCategoryModal from './components/DeleteCategoryModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

const Category = (props) => {
  const category = useSelector(state => state.category);
  const auth = useSelector(state => state.auth);
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate)
      dispatch(getAllCategory());
  }, [auth.authenticate]);

  const addCategoryForm = (data) => {
    const form = new FormData();
    form.append('name', data.categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);
    dispatch(addCategory(form)).then(() =>
      reset({ categoryName: '' }),
      setParentCategoryId(''),
      setShow(false)
    );
  }

  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      );
    }
    return myCategories;
  }

  const createCategoryList = (categories, options = []) => {
    categories.map((category) => {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    })
    return options;
  }

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  }

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) =>
        categoryId === category.value)
      category && checkedArray.push(category)
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const category = categories.find((category, _index) =>
        categoryId === category.value)
      category && expandedArray.push(category)
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  }

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item);
      setCheckedArray(updatedCheckedArray);
    }
    else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item);
      setExpandedArray(updatedExpandedArray);
    }
  }

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : "");
      form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : "");
      form.append('type', item.type);
    });
    dispatch(updateCategories(form))
    setUpdateCategoryModal(false);
  }

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  }

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray))
    }
    setDeleteCategoryModal(false);
  }

  const validationSchema = yup.object().shape({
    categoryName: yup.string()
      .max(50, 'Category name is too long')
      .required('Category is required')
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const categoryList = createCategoryList(category.categories);

  const renderAddCategoryModal = () => {
    return (
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        modalTitle={'Add new Category'}
        modalHeaderColor="add-modal__header"
        buttons={[
          {
            label: 'Add',
            btnColor: 'addBtn',
            onClick: handleSubmit(addCategoryForm)
          },
          {
            label: 'Cancel',
            btnColor: 'cancelBtn',
            onClick: () => setShow(false)
          }
        ]}
      >
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                className="form__input"
                type="text"
                name="categoryName"
                placeholder="Category name"
                {...register("categoryName")}
                isInvalid={errors.categoryName}
              />
              {errors.categoryName && (
                <Form.Control.Feedback type="invalid">
                  {errors.categoryName?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Select
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
              placeholder={'Select category'}
              options={categoryList}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="file"
              name="categoryImage"
              onChange={handleCategoryImage} />
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
              <h3>Category list</h3>
              <div className="actionBtnContainer">
                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                <button onClick={updateCategory}><IoIosCloudUpload /><span>Edit</span></button>
                <button onClick={deleteCategory}><IoIosTrash /><span>Delete</span></button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={checked => setChecked(checked)}
              onExpand={expanded => setExpanded(expanded)}
              icons={{
                check: <FaCheckCircle />,
                uncheck: <FaRegCircle />,
                halfCheck: <FaRegCircle />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        {renderAddCategoryModal()}
        <UpdateCategoriesModal
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(false)}
          onSubmit={updateCategoriesForm}
          modalTitle={'Update Categories'}
          size="lg"
          expandedArray={expandedArray}
          checkedArray={checkedArray}
          handleCategoryInput={handleCategoryInput}
          categoryList={categoryList}
        />

        <DeleteCategoryModal
          modalTitle={'Are you sure?'}
          show={deleteCategoryModal}
          handleClose={() => setDeleteCategoryModal(false)}
          onSubmit={deleteCategories}
          checkedArray={checkedArray}
        />
      </Container>
      <ToastContainer />
    </Layout>
  );
}

export default Category;