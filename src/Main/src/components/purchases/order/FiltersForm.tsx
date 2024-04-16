import { FC, useState } from "react";
import ProviderForm from "./ProviderForm";
import DatePicker from "react-datepicker";
import { Accordion, Button } from "react-bootstrap";
import { Filters } from "../../../api/purchases/Filters";


interface IInititalFilters {
    orderFilters: {
        number: string | undefined,
        period: {
            from: null | Date,
            till: null | Date
        },
        providerId: string | undefined;
    },
    orderItemFilters: {
        name: string | undefined;
        unit: string | undefined;
    },
    providerFilters: {
        name: string | undefined;
    }
}

const initialFilters: IInititalFilters = {
    orderFilters: {
        number: undefined,
        period: {
            from: null,
            till: null
        },
        providerId: undefined
    },
    orderItemFilters: {
        name: undefined,
        unit: undefined
    },
    providerFilters: {
        name: undefined
    }
}

interface FiltersFormProps {
    applyFilters: (filters: Filters) => void;
}

const FiltersForm: FC<FiltersFormProps> = ({ applyFilters }) => {
    const [filters, setFilter] = useState<IInititalFilters>(initialFilters);

    const handleOrderFilters = (value: string, text: string | undefined) => {
        setFilter((prev) => {
            return {
                ...prev,
                orderFilters: {
                    ...prev.orderFilters,
                    [value]: text
                }
            }
        });
    }
    const handleOrderPeriodFilters = (value: string, date: Date | null) => {
        setFilter((prev) => {
            return {
                ...prev,
                orderFilters: {
                    ...prev.orderFilters,
                    period: {
                        ...prev.orderFilters.period,
                        [value]: date
                    },
                }
            }
        });
    }

    const handleOrderItemFilter = (value: string, text: string | undefined) => {
        setFilter((prev) => {
            return {
                ...prev,
                orderItemFilters: {
                    ...prev.orderItemFilters,
                    [value]: text
                }
            }
        });
    }

    const handleProviderFilter = (value: string, text: string | undefined) => {
        setFilter((prev) => {
            return {
                ...prev,
                providerFilters: {
                    ...prev.providerFilters,
                    [value]: text
                }
            }
        });
    }

    return (
        <div className='filters'>
            <h3>Фильтры</h3>
            <div className='accordions'>
                <Accordion alwaysOpen>
                    <Accordion.Item eventKey="0" className='filtersGroup'>
                        <Accordion.Header className='heading'>Заказы</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <div className='period'>
                                    <label>Период</label>
                                    <div className='filter'>
                                        <div>
                                            <label>С</label>
                                            <DatePicker
                                                className='form-control'
                                                selected={filters.orderFilters.period.from}
                                                maxDate={filters.orderFilters.period.till}
                                                onChange={(date) => { handleOrderPeriodFilters('from', date) }}
                                            />
                                        </div>
                                        <div>
                                            <label>По</label>
                                            <DatePicker
                                                className='form-control'
                                                selected={filters.orderFilters.period.till}
                                                minDate={filters.orderFilters.period.from}
                                                onChange={(date) => { handleOrderPeriodFilters('till', date) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='filter'>
                                    <label>Номер</label>
                                    <input className="form-control" type='text' onChange={(item) => handleOrderFilters('number', item.target.value)} ></input>
                                </div>
                                <ProviderForm
                                    onChange={(item) => { handleOrderFilters('providerId', item.target.value != '' ? item.target.value : undefined) }}
                                    isLoading={() => { }}
                                    providerId={undefined}
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion alwaysOpen>
                    <Accordion.Item eventKey="0" className='filtersGroup'>
                        <Accordion.Header className='heading'>Товары</Accordion.Header>
                        < Accordion.Body>
                            <div className='filter'>
                                <label>Наименование товара</label>
                                <input className="form-control" type='text' onChange={(item) => handleOrderItemFilter('name', item.target.value)} ></input>
                            </div>
                            <div className='filter'>
                                <label>Единица</label>
                                <input className="form-control" type='text' onChange={(item) => handleOrderItemFilter('unit', item.target.value)} ></input>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion alwaysOpen>
                    <Accordion.Item eventKey="0" className='filtersGroup'>
                        <Accordion.Header className='heading'>Поставщик</Accordion.Header>
                        <Accordion.Body>
                            <div className='filter'>
                                <label>Наименование поставщика</label>
                                <input className="form-control" type='text' onChange={(item) => handleProviderFilter('name', item.target.value)} ></input>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className='filtersGroup'>
                <Button variant='primary' type='submit' className='submit-btn' onClick={() => applyFilters(filters)} >
                    Применить фильтр
                </Button>
            </div>
        </div>
    );
}

export default FiltersForm;