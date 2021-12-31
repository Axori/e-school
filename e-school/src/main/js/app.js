const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

const App = () => {
    return (
        <div>Hello world 3213 refreshed <button className="btn btn-success">success</button></div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)