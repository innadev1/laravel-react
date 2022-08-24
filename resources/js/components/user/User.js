import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import UserService from '../../requests/userRequests.js'
import '../../style/components/user.css'
import { connect, Provider } from 'react-redux'
import { store } from "../../state/store"
import { bindActionCreators } from "redux"
import { updateData, updateInput } from "../../actions"

export class UserComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    UNSAFE_componentWillMount() {
        const { updateData } = this.props;
        UserService
            .get()
            .then((response) => {
                response.map(data => {
                    if (data.id.toString() === this.props.id) {
                        this.setState(data);
                        updateData(data);
                    }
                })
            })
    }

    //Handle input changes
    handleInputChange = (e) =>{
        e.preventDefault();
        const { updateInput } = this.props;
        this.setState({[e.target.name]: e.target.value});
        updateInput(e.target.name, e.target.value);
    }

    //Updating user information
    updateUserData = (e) => {
        UserService
            .update({data: {name: this.props.user.name}, id: this.props.user.id})
            .then(() => { window.location.reload(false) })
    }

    render() {
        const { name, email } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Profile information:</div>

                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between">
                                            <div className="field-name">Name:</div>
                                            <input className="user-input" type="text" name="name" onChange={this.handleInputChange} defaultValue={name || ''}/>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between">
                                            <div className="field-name">E-mail:</div>
                                            <input className="user-input" type="text" value={email || ''} readOnly/>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <button id="form-button-control-public" className="ui button" style={{marginTop: 20}} onClick={this.updateUserData}>Update</button>
                    </div>
                </div>
            </div>
        )}
}

function mapStateToProps(state){ return { user: state.userReducer } }
const mapDispatchToProps = dispatch => bindActionCreators({updateData, updateInput}, dispatch)
export const UserContainer = connect(mapStateToProps, mapDispatchToProps)(UserComponent);

class User extends Component {
    render () {
        return (
            <Provider store={store}>
                <UserContainer {...this.props}/>
            </Provider>
        );
    }
}
export default User;

if (document.getElementById('User')) {
    const element = document.getElementById('User')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<User {...props}/>, element);
}
