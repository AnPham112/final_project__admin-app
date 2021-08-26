import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    onSubmit,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
  } = props;
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      onSubmit={onSubmit}
      variant="success"
      modalHeaderColor="add-modal__header"
      buttons={[
        {
          label: 'Add',
          btnColor: 'addBtn',
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
          <Input
            value={categoryName}
            type={'text'}
            placeholder={'Category name'}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Col>
        <Col>
          <Input
            type="select"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            placeholder={'Select category'}
            options={categoryList}
          />
          {/* <select
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select category</option>
            {
              categoryList.map(option =>
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.name}
                </option>
              )
            }
          </select> */}
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

export default AddCategoryModal;