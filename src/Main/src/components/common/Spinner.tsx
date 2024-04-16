import { FC } from 'react';
import { Spinner as BsSpinner } from 'react-bootstrap';

interface spinnerProps {
    size?: "sm" | undefined
    hideText?: boolean
}

const Spinner: FC<spinnerProps> = ({ size, hideText }) => {
    return (
        <>
            <BsSpinner animation='border' variant="success" size={size} />
            {hideText == null && <span>Загрузка...</span>}
        </>
    );
}

export default Spinner