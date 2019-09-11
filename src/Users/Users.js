import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser } from '../Redux/Users/usersActions';
import { addKdcUser } from '../Redux/KDC/KDCactions';
import { generateUniquekey } from '../utils';
import './Users.scss';

const Users = props => {
    const [newUser, setNewUser] = useState(INITIAL_USER_STATE)

    const createUser = () => {
        if(newUser.name && newUser.key){
            if(newUser.key.split('-').length === 16){
                console.log("Adding!")
                let payload = {...newUser, id: generateUniquekey()}
                props.addUser(payload)
                setNewUser(INITIAL_USER_STATE)
            } else {
                console.log("Invalid user.key");
            }
        } else {
            console.log("Invalid user.name || user.key");
        }
    }

    const renderUsers = () => {
        let usersKeys = Object.keys(props.users)
        return(
        <div className="usersList">
            {usersKeys.map((user) => {
                console.log("Looping: ", props.users[user])
                let userSessionsKeys = Object.keys(props.users[user].sessions)
                return(
                    <div className="userRegister" key={props.users[user].key}>
                        <div className="addKdc">
                            <span>Nome: {user}</span>
                            <button onClick={() => props.addKdcUser(props.users[user])}>Add in KDC</button>
                        </div>
                        <span>Id: {props.users[user].id}</span>
                        <span>Key: {props.users[user].key}</span>
                        <div>
                            <span>Sessions:</span>
                            {userSessionsKeys.map(session => <span>session</span>)}
                        </div>
                    </div>
                )
            })}
        </div>)
    }

    return(
        <div className="users">
            <span className="usersTitle">Users</span>
            <div className="newUser">
                <span>Nome: <input value={newUser.name || ''} onChange={(event) => setNewUser({...newUser, name: event.target.value})}></input></span>
                <span>Key: <input value={newUser.key || ''} onChange={(event) => setNewUser({...newUser, key: event.target.value})}></input></span>
                <span>16 Inteiros (X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X)</span>
                <button onClick={() => createUser()}>New user</button>
                <button onClick={() => console.log(newUser)}>Debug</button>
            </div>
            <div className="content">
                <div className="box users">
                    <span className="usersTitle">Users</span>
                    <div className="usersContent">
                        {renderUsers()}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users,
  });
const mapDispatchToProps = (dispatch) => bindActionCreators({
    addUser,
    addKdcUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);

const INITIAL_USER_STATE = {
    name: null,
    id: null,
    key: null,
    sessions: null
}