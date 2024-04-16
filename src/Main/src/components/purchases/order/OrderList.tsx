import { FC } from 'react';
import Order from './Order';
import { OrderEntity } from '../../../api/purchases/OrderApi';
import Spinner from '../../common/Spinner';


interface OrderListProps {
    orders: OrderEntity[] | undefined;
    handleEdit: (id: string) => void;
    handleOrderClick: (id: string) => void;
}

const OrderList: FC<OrderListProps> = ({
    orders,
    handleEdit,
    handleOrderClick
}) => {
    return (
        <div className='orders-list'>
            <h3 className='orders-list-title'>Список заказов</h3>
            <div className='orders-list-table-container'>
                <table className='orders-list-table'>
                    <thead className='orders-list-header'>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Дата заказа</th>
                            <th>Поставщик</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders != undefined ? orders.map((order) => (
                                <Order
                                    key={order.id}
                                    order={order}
                                    handleEdit={handleEdit}
                                    handleOrderClick={handleOrderClick}
                                />
                            ))
                                :
                                <tr id='loading'>
                                    <th colSpan={3}>
                                        <Spinner />
                                    </th>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default OrderList;
