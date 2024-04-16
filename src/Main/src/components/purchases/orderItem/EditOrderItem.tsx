import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Action } from '../../../reducer/orderItemsReducer';
import OrderItemForm from './OrderItemForm';


interface EditOrderItemProps {
    showModal: boolean;
    orderId: string;
    orderItemId: string | undefined;
    toggleModal: () => void;
    dispatch: React.Dispatch<Action>;
}

const EditOrderItem: FC<EditOrderItemProps> = ({
    toggleModal,
    orderId,
    orderItemId,
    showModal,
    dispatch
}) => {
    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title> {orderItemId != undefined ? 'Обновить товар' : 'Добавить товар'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OrderItemForm
                    dispatch={dispatch}
                    orderId={orderId}
                    orderItemId={orderItemId}
                    toggleModal={toggleModal}
                />
            </Modal.Body>
        </Modal>
    );
};

export default EditOrderItem;
