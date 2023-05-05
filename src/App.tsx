import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { ProductSelection } from "./pages/ProductSelection";
import { ContactInfo } from "./pages/ContactInfo";
import { MobilePayment } from "./pages/MobilePayment";
import { CheckIdleActivity } from "./components/CheckIdleActivity";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/productSelection">Product Selection</Link>
            </li>
            <li>
              <Link to="/contactInfo">Contact Info</Link>
            </li>
            <li>
              <Link to="/mobilePayment">Mobile Payment</Link>
            </li>
          </ul>
        </nav>
        <br />
        <CheckIdleActivity />
        <br />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/productSelection">
            <ProductSelection />
          </Route>
          <Route path="/contactInfo">
            <ContactInfo />
          </Route>
          <Route path="/mobilePayment">
            <MobilePayment />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
