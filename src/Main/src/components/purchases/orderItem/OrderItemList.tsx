import { FC } from 'react';
import { Action } from '../../../reducer/orderItemsReducer';
import OrderItem from './OrderItem';
import { OrderItemEntity } from '../../../api/purchases/OrderItemApi';
import Spinner from '../../common/Spinner';


interface OrderItemListProps {
    orderItems: OrderItemEntity[] | undefined;
    handleEdit: (id: string) => void;
    dispatch: React.Dispatch<Action>;
}

const OrderItemList: FC<OrderItemListProps> = ({
    orderItems,
    handleEdit,
    dispatch
}) => {
    return (
        <div className='orderItems-list'>
            <h3 className='orderItems-list-title'>Список товаров</h3>
            <div className='orderItems-list-table-container'>
                <table className='orderItems-list-table'>
                    <thead className='orderItems-list-header'>
                        <tr>
                            <th>Название</th>
                            <th>Количество</th>
                            <th>Единица измерения</th>
                            <th className="manage">Изменить</th>
                            <th className="manage">Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderItems != undefined ?
                                orderItems.map((orderItem) => (
                                    <OrderItem
                                        key={orderItem.id}
                                        orderItem={orderItem}
                                        handleEdit={handleEdit}
                                        dispatch={dispatch}
                                    />
                                ))
                                :
                                <tr id='loading'>
                                    <th colSpan={5}>
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

export default OrderItemList;
