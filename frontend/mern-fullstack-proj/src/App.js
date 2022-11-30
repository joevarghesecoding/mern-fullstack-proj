import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//as is used to make an alias, BrowserRouter as Router; Route is separate
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation'
import Auth from './user/pages/Auth';
import UserPlaces from './places/pages/UserPlaces';

const App = () => {
  return <Router> {/* Router will change components based on url path while staying in same page*/}
    <MainNavigation />
      <main>
        <Switch> {/* Switch will not redirect if it finds a proper path*/}
          <Route path="/" exact> {/* exact makes sure the path is / only */}
          <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/auth">
            <Auth></Auth>
          </Route>
          <Redirect to="/" /> {/* will redirect any other url to / */}
        </Switch>
      </main>
  </Router>;
};

export default App;
