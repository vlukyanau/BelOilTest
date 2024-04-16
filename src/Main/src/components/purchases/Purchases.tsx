import { useState } from 'react';
import OrderPage from './order/OrderPage';
import OrderItemPage from './orderItem/OrderItemPage';


const enum Components { 'Order', 'OrderItem' };

function Purchases() {
    const [showComponent, setShowComponent] = useState<Components>(Components.Order);
    const [orderId, setOrderId] = useState<string | undefined>(undefined);

    const handleOrderClick = (id: string) => {
        setShowComponent(Components.OrderItem);
        setOrderId(id);
    }
    const handleOrderItemBack = () => {
        setShowComponent(Components.Order);
    }

    const show = () => {
        switch (showComponent) {
            case Components.Order:
                return (<OrderPage handleOrderClick={handleOrderClick} />);

            case Components.OrderItem:
                return (<OrderItemPage orderId={orderId} handleOrderItemBack={handleOrderItemBack} />);

            default: return;
        }
    }

    return (
        <div>{show()}</div>
    );
}

export default Purchases;