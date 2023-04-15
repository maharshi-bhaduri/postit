import MainSection from "./MainSection";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import sha1 from 'sha1';
import Loader from "./Loader";
import Landing from "./Landing";

function App() {
    const year = (new Date()).getFullYear();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    let token;

    if (!isLoading && isAuthenticated)
        getAccessTokenSilently()
            .then(accessToken => {
                token = accessToken
                localStorage.setItem('token', token);
            })
    if (user && user.sub) {
        localStorage.setItem('uuid', sha1(user.sub));
    }
    if (user && user.name) {
        localStorage.setItem('uname', user.name.split('@')[0]);
    }
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="parent">
                <Routes>
                    <Route path='/*'
                        element=
                        {
                            isLoading ? <Loader /> :
                                <Landing />
                        }
                    >
                    </Route>
                    <Route exact path='/posts/*'
                        element=
                        {
                            isLoading ? <Loader /> :
                                <MainSection user={user}
                                    isAuthenticated={isAuthenticated}
                                    isLoading={isLoading}
                                />
                        }
                    >
                    </Route>
                </Routes>
                {/* <footer>© {year} Maharshi Bhaduri Design</footer> */}
                {/* <Profile></Profile> */}
            </div>
        </Router>
    );
}

export default App;
