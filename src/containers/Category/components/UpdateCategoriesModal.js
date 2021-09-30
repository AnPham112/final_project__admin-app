import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Modal from '../../../components/UI/Modal';
import Select from '../../../components/UI/Select';

const UpdateCategoriesModal = (props) => {
  const {
    show,
    handleClose,
    onSubmit,
    modalTitle,
    size,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList
  } = props;

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
      size={size}
      modalHeaderColor="update-modal__header"
      buttons={[
        {
          label: 'Update',
          btnColor: 'updateBtn',
          onClick: onSubmit
        },
        {
          label: 'Cancle',
          btnColor: 'cancleBtn',
          onClick: handleClose
        }
      ]}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {
        expandedArray.length > 0 &&
        expandedArray.map((item, index) =>
          <Row key={index}>
            <Col sm={4} sx={12}>
              <Form.Group>
                <Form.Control
                  className="form__input"
                  type="text"
                  value={item.name}
                  placeholder="Category name"
                  onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                />
              </Form.Group>
            </Col>
            <Col>
              <Select
                value={item.parentId}
                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                placeholder={'Select category'}
                options={categoryList}
              />
            </Col>
            <Col sm={4} sx={12}>
              <select
                className="form-select"
                value={item.type}
                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
              >
                <option value="" className="select-placeholder">---Select Type---</option>
                <option value="store">Store</option>
                {/* <option value="page">Page</option> */}
              </select>
            </Col>
          </Row>
        )
      }
      <h6>{checkedArray.length <= 1 ? "Checked Category" : "Checked Categories"}</h6>
      {
        checkedArray.length > 0 &&
        checkedArray.map((item, index) =>
          <Row key={index}>
            <Col sm={4} sx={12}>
              <Form.Group>
                <Form.Control
                  className="form__input"
                  type="text"
                  value={item.name}
                  placeholder="Category name"
                  onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                />
              </Form.Group>
            </Col>
            <Col sm={4} sx={12}>
              <Select
                value={item.parentId}
                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                placeholder={'Select category'}
                options={categoryList}
              />
            </Col>
            <Col sm={4} sx={12}>
              <select
                className="form-select"
                value={item.type}
                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
              >
                <option value="" className="select-placeholder">---Select Type---</option>
                <option value="store">Store</option>
                {/* <option value="page">Page</option> */}
              </select>
            </Col>
          </Row>
        )
      }
    </Modal>
  );
}

export default UpdateCategoriesModal;