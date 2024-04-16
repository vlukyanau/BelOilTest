import { OrderItemEntity } from "../api/purchases/OrderItemApi";


export interface Action {
    type: 'ADD_ORDERITEM' | 'ADD_ORDERITEMS' | 'UPDATE_ORDERITEM' | 'DELETE_ORDERITEM'
    payload: OrderItemEntity | OrderItemEntity[];
}

export interface State {
    orderItems: OrderItemEntity[];
}

export const orderItemsReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_ORDERITEM':
            return {
                ...state,
                orderItems: state.orderItems.concat(action.payload as OrderItemEntity)
            };

        case 'ADD_ORDERITEMS':
            return {
                ...state,
                orderItems: state.orderItems.concat(action.payload as OrderItemEntity[])
            };

        case 'UPDATE_ORDERITEM':
            const payload = action.payload as OrderItemEntity;
            return {
                ...state,
                orderItems: state.orderItems.map((order) => {
                    if (order.id === payload.id) {
                        return {
                            ...order,
                            ...payload
                        };
                    }

                    return order;
                })
            };

        case 'DELETE_ORDERITEM': {
            const payload = action.payload as OrderItemEntity;
            return {
                ...state,
                orderItems: state.orderItems.filter((orderItem) => orderItem.id !== payload.id)
            };
        }
        default:
            return state;
    }
};