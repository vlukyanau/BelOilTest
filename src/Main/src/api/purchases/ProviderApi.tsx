import api from "../api";

export interface ProviderEntity {
    id: string | undefined;
    name: string;
}

export interface ProviderFilters {
    name: string | undefined;
}

export async function GetAll(): Promise<ProviderEntity[] | null> {
    return await api.get("api/purchases/providers")
        .then(response => { return response.data as ProviderEntity[] })
        .catch((error) => {
            console.log(error);

            return null;
        });
}

