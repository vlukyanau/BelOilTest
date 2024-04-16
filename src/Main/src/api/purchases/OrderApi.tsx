import api from "../api";
import { Period } from "../common/Period";
import { Filters } from "./Filters";
import { ProviderEntity } from "./ProviderApi";


export interface OrderEntity {
    id: string | undefined;
    number: string;
    date: Date;
    providerInfo: ProviderEntity;
}

export interface OrderFilters {
    number: string | undefined;
    period: Period | undefined;
    providerId: string | undefined;
}

export async function GetAll(): Promise<OrderEntity[] | null> {
    return await api.get("api/purchases/orders")
        .then(response => { return response.data as OrderEntity[] })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function Search(filters: Filters): Promise<OrderEntity[] | null> {
    return await api.post("api/purchases/orders/search", filters)
        .then(response => { return response.data as OrderEntity[] })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function GetById(id: string): Promise<OrderEntity | null> {
    return await api.get(`api/purchases/orders/${id}`)
        .then(response => { return response.data as OrderEntity })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function Create(order: OrderEntity) {
    return await api.post("api/purchases/orders", order)
        .then(response => { return response.data as OrderEntity })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function Update(order: OrderEntity): Promise<OrderEntity | null> {
    return await api.put('api/purchases/orders', order)
        .then(response => { return response.data as OrderEntity })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

export async function Delete(id: string) {
    return await api.delete(`api/purchases/orders/${id}`)
        .catch((error) => {
            console.log(error);

            return null;
        });
}