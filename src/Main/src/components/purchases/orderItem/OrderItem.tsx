import { FC, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Action } from '../../../reducer/orderItemsReducer';
import { OrderItemEntity } from '../../../api/purchases/OrderItemApi';
import * as OrderItemApi from "../../../api/purchases/OrderItemApi";
import { Button, Modal } from 'react-bootstrap';


interface ExtraProps {
    orderItem: OrderItemEntity;
    handleEdit: (id: string) => void;
    dispatch: React.Dispatch<Action>;
}

const OrderItem: FC<ExtraProps> = ({
    orderItem,
    handleEdit,
    dispatch
}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSave = async () => {
        const result = await OrderItemApi.Delete(orderItem.id!);
        if (result != null) {
            dispatch({
                type: 'DELETE_ORDERITEM',
                payload: orderItem
            });

            setShowDeleteModal(false);
        }
    }
    const handleClose = () => setShowDeleteModal(false);
    const handleShow = () => setShowDeleteModal(true);

    return (
        <tr>
            <td>{orderItem.name}</td>
            <td>{orderItem.quantity}</td>
            <td>{orderItem.unit}</td>
            <td className="manage" onClick={() => handleEdit(orderItem.id!)}>
                <AiFillEdit size={20} className='icon' />
            </td>
            <td className="manage" onClick={handleShow}>
                <AiFillDelete size={20} className='icon' />
            </td>
            <Modal show={showDeleteModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить заказ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены что хотите удалить товар {orderItem.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Нет
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Да
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    );
};

export default OrderItem;
