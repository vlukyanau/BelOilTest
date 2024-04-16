import { FC } from 'react';
import { OrderEntity } from '../../../api/purchases/OrderApi';


interface ExtraProps {
    order: OrderEntity;
    handleEdit: (id: string) => void;
    handleOrderClick: (id: string) => void;
}

const Order: FC<ExtraProps> = ({
    order,
    handleOrderClick
}) => {
    return (
        <tr onClick={() => handleOrderClick(order.id as string)} >
            <td>{order.number}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>{order.providerInfo.name}</td>
        </tr>
    );
};

export default Order;
