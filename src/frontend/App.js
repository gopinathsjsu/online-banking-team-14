import './App.css';
import Header from './Header'
import Login from './Login'
import Footer from './Footer'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checking from './Checking'
import Deposite from './Deposite'
import Withdraw from './Withdraw'

function App() {
  return (
    <Router>
        <div className="app">
          <Switch>
            <Route path="/checking">
              <Header/>
              <Checking />
            </Route>
            <Route path="/deposite">
              <Header />
              <Deposite />
            </Route>
            <Route path="/withdraw">
              <Header />
              <Withdraw />
            </Route>
            <Route path="/">
              <Header/>
              <Login />
              <Footer />
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
