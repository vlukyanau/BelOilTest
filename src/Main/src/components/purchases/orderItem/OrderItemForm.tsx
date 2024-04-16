import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Action } from '../../../reducer/orderItemsReducer';
import { OrderItemEntity } from '../../../api/purchases/OrderItemApi';
import * as OrderItemApi from "../../../api/purchases/OrderItemApi";


interface OrderFormProps {
    dispatch: React.Dispatch<Action>;
    orderId: string;
    orderItemId: string | undefined;
    toggleModal: () => void;
}

const defaultOrderItem: OrderItemEntity = {
    id: undefined,
    orderId: '',
    name: '',
    quantity: 0,
    unit: ''
}

const OrderItemForm: FC<OrderFormProps> = ({
    dispatch,
    orderId,
    orderItemId,
    toggleModal
}) => {
    const [orderItem, setOrderItem] = useState<OrderItemEntity>(defaultOrderItem);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        setIsLoading(true);

        onReloadNeeded();
    }, [])

    const onReloadNeeded = useCallback(async () => {
        if (orderItemId == undefined) {
            setOrderItem((prev) => { return { ...prev, orderId: orderId } });
            setIsLoading(false);
            return;
        }

        const result = await OrderItemApi.GetById(orderItemId!);
        if (result != null)
            setOrderItem(result);

        setIsLoading(false);
    }, []);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setOrderItem((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    let ready: boolean = false;

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (ready == true)
            return;

        if (orderItem.name.trim() === '' || orderItem.quantity == undefined || orderItem.unit.trim() === '') {
            setErrorMsg('Все поля должны быть заполнены.');

            return;
        } else if (!orderItem.quantity.toString().match(/^\d{1,15}(.\d{1,3})?$/g)) {
            setErrorMsg('Пожалуйста введите количество');

            return;
        }

        if (orderItemId == undefined) {
            ready = true;
            const result = await OrderItemApi.Create(orderItem as OrderItemEntity);
            if (result != null) {
                dispatch({
                    type: 'ADD_ORDERITEM',
                    payload: result
                });

                setErrorMsg('');
                toggleModal();
                ready = false;
            }
        } else {
            ready = true;

            const result = await OrderItemApi.Update(orderItem as OrderItemEntity);
            if (result != null) {
                dispatch({
                    type: 'UPDATE_ORDERITEM',
                    payload: result
                });

                setErrorMsg('');
                toggleModal();
                ready = false;
            }
        }
    };

    return (isLoading == false &&
        <Form onSubmit={handleOnSubmit} className='orderItem-form'>
            {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
            <Form.Group controlId='name'>
                <Form.Label>Название</Form.Label>
                <Form.Control
                    className='name'
                    name='name'
                    value={orderItem.name}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>
            <Form.Group controlId='quantity'>
                <Form.Label>Количество</Form.Label>
                <Form.Control
                    className='quantity'
                    name='quantity'
                    value={orderItem.quantity}
                    type='number'
                    onChange={handleOnChange}
                />
            </Form.Group>
            <Form.Group controlId='unit'>
                <Form.Label>Unit</Form.Label>
                <Form.Control
                    className='unit'
                    name='unit'
                    value={orderItem.unit}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>
            <Form.Group controlId='submit'>
                <Button variant='primary' type='submit' className='submit-btn'>
                    {orderItemId != undefined ? 'Обновить товар' : 'Добавить товар'}
                </Button>
            </Form.Group>
        </Form>
    );
};

export default OrderItemForm;