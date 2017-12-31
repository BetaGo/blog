import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import MarkdownElement from './components/MarkdownElement';

const markdown = require('./posts/code/css-in-js.md');
const markdown2 = require('./posts/free/test.md');

const MarkedPost = () => (<MarkdownElement text={markdown} />);

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
            <li><Link to="/marked">marked</Link></li>
            <li><Link to="/test">test</Link></li>
          </ul>
            <Route path="/hello" component={() => <div>hello</div>} />
            <Route path="/world" component={() => <div>world</div>} />
            <Route path="/marked" component={MarkedPost} />
            <Route path="/test" component={() => <MarkdownElement text={markdown2} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
