import { Link } from 'react-router-dom';
import '../components/css/error-page.css';

function ErrorPage(): JSX.Element {
  return (
    <div className='errorPage'>
      <div>
        <h1>404.</h1>
        <h2> Page not found </h2>
      </div>

      <Link to = "/"> Go to main page </Link>
    </div>
  );
}

export default ErrorPage;
