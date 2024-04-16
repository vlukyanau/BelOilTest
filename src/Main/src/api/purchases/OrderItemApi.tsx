import api from "../api";


export interface OrderItemEntity {
    id: string | undefined;
    orderId: string;
    name: string;
    quantity: number;
    unit: string;
}

export interface OrderItemFilters {
    name: string | undefined;
    unit: string | undefined;
}

export async function GetAll(orderId: string): Promise<OrderItemEntity[] | null> {
    return await api.get(
        'api/purchases/orderitems',
        {
            params: {
                orderid: orderId
            }
        })
        .then(response => { return response.data as OrderItemEntity[] })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function GetById(id: string): Promise<OrderItemEntity | null> {
    return await api.get(`api/purchases/orderitems/${id}`)
        .then(response => { return response.data as OrderItemEntity })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function Create(orderItem: OrderItemEntity): Promise<OrderItemEntity | null> {
    return await api.post('api/purchases/orderitems', orderItem)
        .then(response => { return response.data as OrderItemEntity })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function Update(orderItem: OrderItemEntity): Promise<OrderItemEntity | null> {
    return await api.put('api/purchases/orderitems', orderItem)
        .then(response => { return response.data as OrderItemEntity })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function Delete(id: string) {
    return await api.delete(`api/purchases/orderitems/${id}`)
        .catch((error) => {
            console.log(error);

            return null;
        });
}

