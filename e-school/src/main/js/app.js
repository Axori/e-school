const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

const App = () => {

    // constructor(props) {
    //     super(props);
    //     this.state = {employees: []};
    // }
    //
    // componentDidMount() {
    //     client({method: 'GET', path: '/api/employees'}).done(response => {
    //         this.setState({employees: response.entity._embedded.employees});
    //     });
    // }

    return (
        <div>Hello world 1231</div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)