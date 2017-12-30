import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hello">hello</Link></li>
            <li><Link to="/world">world</Link></li>
          </ul>
            <Route path="/hello" component={() => <div>hello</div>} />
            <Route path="/world" component={() => <div>world</div>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
