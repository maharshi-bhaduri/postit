import MainSection from "./MainSection";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginButton from "./LoginButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import sha1 from 'sha1';

function App() {
    const year = (new Date()).getFullYear();
    const { user, isAuthenticated, isLoading } = useAuth0();
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
                    {
                        isLoading ||
                        <Route exact path='/*'
                            element={
                                <MainSection user={user}
                                    isAuthenticated={isAuthenticated}
                                    isLoading={isLoading} />
                            }>
                        </Route>
                    }
                </Routes>
                <footer>© {year} Maharshi Bhaduri Design</footer>
                {/* <Profile></Profile> */}
            </div>
        </Router>
    );
}

export default App;
