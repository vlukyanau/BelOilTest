import { OrderFilters } from "./OrderApi";
import { OrderItemFilters } from "./OrderItemApi";
import { ProviderFilters } from "./ProviderApi";

export interface Filters {
    orderFilters: OrderFilters | undefined;
    orderItemFilters: OrderItemFilters | undefined;
    providerFilters: ProviderFilters | undefined;
}