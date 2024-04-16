import { Button, Form, Modal } from 'react-bootstrap';
import { Action } from '../../../reducer/ordersReducer';
import { OrderEntity } from '../../../api/purchases/OrderApi';
import * as OrderApi from "../../../api/purchases/OrderApi";
import DatePicker from "react-datepicker";
import ProviderForm from './ProviderForm';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import Spinner from '../../common/Spinner';


interface OrderFormProps {
    dispatch: React.Dispatch<Action>;
    dataToEdit: OrderEntity | undefined;
    toggleModal: () => void;
    handleDelete: () => void;
}

const defaultOrder: OrderEntity = {
    id: undefined,
    number: '',
    date: new Date(),
    providerInfo: {
        id: '',
        name: ''
    }
}

const OrderForm: FC<OrderFormProps> = ({
    dispatch,
    dataToEdit,
    toggleModal,
    handleDelete
}) => {
    const [order, setOrder] = useState<OrderEntity>(defaultOrder);
    const [errorMsg, setErrorMsg] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [handleProviderLoading, setHandleProviderLoading] = useState(true);
    const [resultState, setResultState] = useState<'done' | 'fail' | undefined>(undefined);

    useEffect(() => {
        handleCheckLoading();
    }, [handleProviderLoading])

    const handleCheckLoading = () => {
        if (handleProviderLoading == false)
            setLoading(false);
    }

    useEffect(() => {
        if (resultState != undefined)
            setTimeout(() => setResultState(undefined), 3000);
    }, [resultState])

    useLayoutEffect(() => {
        if (dataToEdit != undefined)
            setOrder(dataToEdit!);
    }, [])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setOrder((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };
    const handleOnChangeDate = (date: Date | null) => {
        if (date == null)
            return;

        setOrder((prevState) => {
            return {
                ...prevState,
                date: date
            };
        });
    };

    const handleChangeDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        setOrder((prevState) => {
            return {
                ...prevState,
                providerInfo: { id: value, name: prevState.providerInfo.name }
            };
        });
    }

    const handleSave = async () => {
        const result = await OrderApi.Delete(order.id as string);
        if (result != null) {
            dispatch({
                type: 'DELETE_ORDER',
                payload: order
            });

            setShowDeleteModal(false);

            setErrorMsg('');
            toggleModal();
            handleDelete();
        }
    }
    const handleClose = () => setShowDeleteModal(false);
    const handleShow = () => setShowDeleteModal(true);

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (ready == true)
            return;

        const { number, providerInfo } = order;

        if (number.trim() === '' || providerInfo.id?.trim() === '') {
            setErrorMsg('Все поля должны быть заполнены.');

            return;
        }

        if (!dataToEdit) {
            setReady(true);

            const result = await OrderApi.Create(order as OrderEntity);
            if (result != null) {
                dispatch({
                    type: 'ADD_ORDER',
                    payload: result
                })

                setErrorMsg('');
                toggleModal();
                setReady(false);
            }
        } else {
            setReady(true);

            const result = await OrderApi.Update(order as OrderEntity);
            if (result != null) {
                setResultState('done');

                dispatch({
                    type: 'UPDATE_ORDER',
                    payload: result
                });


                setErrorMsg('');
                toggleModal();
                setReady(false);
            }
            else {
                setResultState('fail');
            }
        }
    };

    return (
        <Form onSubmit={handleOnSubmit} className='order-form'>
            {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
            <Form.Group controlId='number'>
                <Form.Label>Номер заказа</Form.Label>
                <Form.Control
                    className='number'
                    name='number'
                    value={order.number}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>
            <Form.Group controlId='date'>
                <Form.Label>Дата заказа</Form.Label>
                <div>
                    <DatePicker
                        className='form-control'
                        selected={order.date}
                        onChange={(date) => handleOnChangeDate(date)}
                    />
                </div>
            </Form.Group>
            <ProviderForm
                onChange={handleChangeDropdown}
                isLoading={setHandleProviderLoading}
                providerId={order.providerInfo.id}
            />
            <Form.Group controlId='submit' >
                <Button variant='primary' type='submit' className='button-btn' disabled={loading} >
                    {loading == false ?
                        <>
                            {ready == true && < Spinner size="sm" hideText={true} />}
                            {dataToEdit ? 'Обновить заказ' : 'Добавить заказ'}
                        </>
                        :
                        <Spinner size="sm" />
                    }
                </Button>
                {
                    dataToEdit &&
                    <>
                        <Button variant='primary' type='button' className='button-btn' onClick={handleShow} >
                            {ready == true && < Spinner size="sm" hideText={true} />}
                            Удалить заказ
                        </Button>
                        <Modal show={showDeleteModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Удалить заказ?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Вы уверены что хотите удалить заказ {order.number}?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleClose}>
                                    Нет
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Да
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                }
                {
                    resultState != undefined &&
                    <label className={resultState} >
                        {resultState == 'done' ? 'Данные успешно сохранены' : 'Не удалось сохранить данные'}
                    </label>
                }
            </Form.Group>
        </Form>
    );
};

export default OrderForm;