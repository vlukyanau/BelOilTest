import { FC, useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { orderItemsReducer, State } from '../../../reducer/orderItemsReducer';
import { Button } from 'react-bootstrap';
import * as OrderItemApi from '../../../api/purchases/OrderItemApi';
import * as OrderApi from '../../../api/purchases/OrderApi';
import '../../../css/purchases/orderItem.css';
import OrderForm from '../order/OrderForm';
import { OrderEntity } from '../../../api/purchases/OrderApi';
import Spinner from '../../common/Spinner';
import OrderItemList from './OrderItemList';
import EditOrderItem from './EditOrderItem';


interface OrderItemPageProps {
    orderId: string | undefined;
    handleOrderItemBack: () => void;
}

const initialState: State = {
    orderItems: []
};

const OrderItemPage: FC<OrderItemPageProps> = ({ orderId, handleOrderItemBack }) => {
    if (orderId == undefined)
        return;

    const [stateOrderItem, dispatchOrderItem] = useReducer(orderItemsReducer, initialState);
    const [order, setOrder] = useState<OrderEntity>();
    const [showModal, setShowModal] = useState(false);
    const [orderItemId, setOrderItemId] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        onReloadNeeded();
    }, []);

    const onReloadNeeded = useCallback(async () => {
        const result = await OrderApi.GetById(orderId!)
        if (result != null)
            setOrder(result);

        const orderItems = await OrderItemApi.GetAll(orderId!);
        if (orderItems != null)
            dispatchOrderItem({ type: 'ADD_ORDERITEMS', payload: orderItems! });

        setLoading(false);
    }, []);

    useEffect(() => {
        if (!showModal) {
            setOrderItemId(undefined);
        }
    }, [showModal]);

    const toggleModal = () => {
        setShowModal((show) => !show);
    };

    const handleEdit = (id: string | undefined) => {
        setOrderItemId(id);

        toggleModal();
    };

    return (
        <div>
            <div className='main-container-orderItem'>
                <div className='order'>
                    <h3>Информаци о заказе</h3>
                    {
                        loading == false ?
                            <OrderForm
                                dispatch={() => { }}
                                dataToEdit={order}
                                toggleModal={() => { }}
                                handleDelete={handleOrderItemBack}
                            />
                            :
                            <Spinner />
                    }
                </div>
                <div className='page'>
                    <OrderItemList
                        orderItems={loading == false ? stateOrderItem.orderItems : undefined}
                        handleEdit={handleEdit}
                        dispatch={dispatchOrderItem}
                    />
                    <div className='buttons-group'>
                        <Button variant='primary' type='submit' className='submit-btn' onClick={() => handleEdit(undefined)} >
                            Добавить товар
                        </Button>
                        {loading == false &&
                            <EditOrderItem
                                showModal={showModal}
                                orderId={order!.id!}
                                orderItemId={orderItemId}
                                toggleModal={toggleModal}
                                dispatch={dispatchOrderItem}
                            />
                        }
                        <Button variant='primary' type='button' className='submit-btn' onClick={handleOrderItemBack} >
                            Назад
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderItemPage;