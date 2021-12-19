import Alert from 'react-bootstrap/Alert';

export default function AlertBanner({ message, varient }) {

    const alertMessage = message || 'An unexpected error occured pls try again..';
    const alertVarient = varient || 'danger';

    return (
        <Alert variant={alertVarient} style={{backgroundColor: 'red'}}>
            {alertMessage}
        </Alert>
    )

}