import img from './error.gif';
import './errorMessage.scss';


const ErrorMessage = () =>{
    return(<img  src={img} alt="Error!" className="error-message"/>); // src={process.env.PUBLIC_URL + '/error.gif'} - вот так можно достучаться до папки паблик из срц 
}

export default ErrorMessage;