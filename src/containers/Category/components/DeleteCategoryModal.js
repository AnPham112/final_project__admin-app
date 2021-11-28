import React from 'react';
import Modal from '../../../components/UI/Modal';

const DeleteCategoryModal = (props) => {
  const {
    show,
    handleClose,
    onSubmit,
    modalTitle,
    checkedArray
  } = props;

  return (
    <Modal
      modalTitle={modalTitle}
      show={show}
      handleClose={handleClose}
      modalHeaderColor="delete-modal__header"
      buttons={[
        {
          label: 'Cancel',
          btnColor: 'cancelBtn',
          onClick: handleClose
        },
        {
          label: 'Yes',
          btnColor: 'deleteBtn',
          onClick: onSubmit
        }
      ]}
    >
      <h6>{checkedArray.length <= 1 ? 'Do you really want to delete the category' : 'Do you really want to delete the categories'}?</h6>
      {
        checkedArray.map((item, index) =>
          <span key={index}>{item.name}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        )
      }
    </Modal>
  );
}

export default DeleteCategoryModal;