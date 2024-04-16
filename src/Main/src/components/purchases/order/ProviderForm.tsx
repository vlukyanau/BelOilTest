import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { ProviderEntity } from "../../../api/purchases/ProviderApi";
import * as ProviderApi from '../../../api/purchases/ProviderApi';


interface OrderFormProps {
    onChange: (item: React.ChangeEvent<HTMLSelectElement>) => void,
    isLoading: (item: boolean) => void,
    providerId: string | undefined
}

const ProviderForm: FC<OrderFormProps> = ({
    onChange, isLoading, providerId
}) => {
    const [loading, setLoading] = useState(true);

    const [providers, setProviders] = useState<ProviderEntity[]>([]);

    useEffect(() => { isLoading(loading) }, [loading])

    useLayoutEffect(() => {
        onReloadNeeded();
    }, [])

    const onReloadNeeded = useCallback(async () => {
        const result = await ProviderApi.GetAll();
        if (result != null)
            setProviders(result);

        setLoading(false);
    }, []);

    return (loading == false &&
        <Form.Group controlId='providerInfo'>
            <Form.Label>Поставщик</Form.Label>
            <Form.Select onChange={onChange} defaultValue={providerId} >
                <option value={''} key={''}>Выбрать...</option>
                {
                    providers.map((item) => {
                        return (<option value={item.id} key={item.id} >{item.name}</option>)
                    })
                }
            </Form.Select>
        </Form.Group>
    )
}

export default ProviderForm