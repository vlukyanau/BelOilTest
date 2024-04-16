import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Action } from '../../../reducer/ordersReducer';
import OrderForm from './OrderForm';
import { OrderEntity } from '../../../api/purchases/OrderApi';


interface EditOrderProps {
    showModal: boolean;
    dataToEdit: OrderEntity | undefined;
    toggleModal: () => void;
    dispatch: React.Dispatch<Action>;
}

const EditOrder: FC<EditOrderProps> = ({
    toggleModal,
    dataToEdit,
    showModal,
    dispatch
}) => {
    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title> {dataToEdit ? 'Обновить заказ' : 'Добавить заказ'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OrderForm
                    dispatch={dispatch}
                    dataToEdit={dataToEdit}
                    toggleModal={toggleModal}
                    handleDelete={() => { }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default EditOrder;
