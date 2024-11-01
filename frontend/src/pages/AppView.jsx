import { useAuth } from '../contexts/SessionProvider';
import Home from './Home.jsx';
import Login from './LoginPage.jsx';

function AppView() {

    const { state } = useAuth();

    return (
            state.isAuth ? <Home /> : <Login />
    )
}

export default AppView