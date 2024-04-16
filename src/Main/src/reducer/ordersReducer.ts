import { OrderEntity } from "../api/purchases/OrderApi";


export interface Action {
    type: 'ADD_ORDER' | 'UPDATE_ORDER' | 'ADD_ORDERS' | 'DELETE_ORDER' | 'DELETE_ALLORDERS'
    payload?: OrderEntity | OrderEntity[];
}

export interface State {
    orders: OrderEntity[];
}

export const ordersReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_ORDER':
            return {
                ...state,
                orders: state.orders.concat(action.payload as OrderEntity)
            };

        case 'ADD_ORDERS':
            return {
                ...state,
                orders: state.orders.concat(action.payload as OrderEntity[])
            };

        case 'UPDATE_ORDER':
            const payload = action.payload as OrderEntity;
            return {
                ...state,
                orders: state.orders.map((order) => {
                    if (order.id === payload.id) {
                        return {
                            ...order,
                            ...payload
                        };
                    }

                    return order;
                })
            };

        case 'DELETE_ORDER': {
            const payload = action.payload as OrderEntity;
            return {
                ...state,
                orders: state.orders.filter((order) => order.id !== payload.id)
            };
        }

        case 'DELETE_ALLORDERS': {
            return {
                ...state,
                orders: []
            };
        }

        default:
            return state;
    }
};