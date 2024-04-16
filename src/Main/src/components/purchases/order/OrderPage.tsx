import { FC, useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import OrderList from './OrderList';
import EditOrder from './EditOrder';
import { ordersReducer, State } from '../../../reducer/ordersReducer';
import { Button } from 'react-bootstrap';
import * as OrderApi from "../../../api/purchases/OrderApi";
import { OrderEntity } from '../../../api/purchases/OrderApi';
import '../../../css/purchases/order.css';
import { Filters } from '../../../api/purchases/Filters';
import FiltersForm from './FiltersForm';


interface OrderPageProps {
    handleOrderClick: (id: string) => void;
}

const initialState: State = {
    orders: []
};


const OrderPage: FC<OrderPageProps> = ({ handleOrderClick }) => {
    const [state, dispatch] = useReducer(ordersReducer, initialState);
    const [showModal, setShowModal] = useState(false);
    const [dataToEdit, setDataToEdit] = useState<OrderEntity | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useLayoutEffect(() => {
        onReloadNeeded();
    }, []);

    const onReloadNeeded = useCallback(async () => {
        const orders = await OrderApi.GetAll();
        if (orders != null)
            dispatch({ type: 'ADD_ORDERS', payload: orders! });

        setLoading(false);
    }, []);

    useEffect(() => {
        if (!showModal) {
            setDataToEdit(undefined);
        }
    }, [showModal]);

    const toggleModal = () => {
        setShowModal((show) => !show);
    };

    const applyFilters = async (filters: Filters) => {
        const orders = await OrderApi.Search(filters);
        if (orders != null) {
            dispatch({ type: 'DELETE_ALLORDERS' });
            dispatch({ type: 'ADD_ORDERS', payload: orders! });
        }
    };

    const handleEdit = (id: string | undefined) => {
        setDataToEdit(id ? state.orders!.find(item => item.id === id) : undefined);
        toggleModal();
    };

    return (
        <div>
            <div className='main-container-order'>
                <FiltersForm
                    applyFilters={applyFilters}
                />
                <div className='page'>
                    <OrderList
                        orders={loading == false ? state.orders : undefined}
                        handleEdit={handleEdit}
                        handleOrderClick={handleOrderClick}
                    />
                    <div>
                        <Button variant='primary' type='submit' className='submit-btn' onClick={() => handleEdit(undefined)} >
                            Добавить заказ
                        </Button>
                        <EditOrder
                            showModal={showModal}
                            dataToEdit={dataToEdit}
                            toggleModal={toggleModal}
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default OrderPage;