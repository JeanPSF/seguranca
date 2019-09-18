import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser } from '../Redux/Users/usersActions';
import { addKdcUser } from '../Redux/KDC/KDCactions';
import { produceSessionRequest } from '../Redux/Queues/queuesActions';
import { generateUniquekey, encrypt, decrypt } from '../Utils/utils';
import { USER, SESSION } from '../Utils/Objects';
import './Users.scss';

const Users = props => {
    const [newUser, setNewUser] = useState(USER)

    useEffect(() => {
        //Bob
        console.log('Bob Decryopt: ', 
            // decrypt(
            //     props.users.k0omyspa_kzubawj1is.key, 
            //     props.users.k0omyspa_kzubawj1is.sessions
            // )
        )
    }, [props.users.k0omyspa_kzubawj1is])

    const createUser = () => {
        if(newUser.name && newUser.key){
            if(newUser.key.split('-').length === 16){
                console.log("Adding!")
                let payload = {...newUser, id: generateUniquekey()}
                props.addUser(payload)
                setNewUser(USER)
            } else {
                console.log("Invalid user.key");
            }
        } else {
            console.log("Invalid user.name || user.key");
        }
    }

    const getSessionKey = (payload) => {
        props.produceSessionRequest(payload)
    }    

    const renderUsers = () => {
        let usersKeys = Object.keys(props.users)
        
        return(
        <div className="usersList">
            {usersKeys.map((user) => {
                let userSessionsKeys = Object.keys(props.users[user].sessions)
                return(
                    <div className="userRegister" key={props.users[user].key}>
                        <span>Name: {props.users[user].name}</span>
                        <span>Id: {props.users[user].id}</span>
                        <span>Friend: {props.users[user].friend}</span>
                        <span>Key: {props.users[user].key}</span>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span>Sessions:</span>
                            {userSessionsKeys.map(session => {
                                console.log(session)
                                return  <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <span>Chave sessao: {decrypt(props.users[user].key.split('-'), props.users[user].sessions.session.user.sessionKey)}</span>
                                            <span>Chave verificacao: {decrypt(props.users[user].key.split('-'), props.users[user].sessions.session.user.verificationStep)}</span>
                                        </div>
                            })}
                        </div>
                        <button onClick={() => props.addKdcUser(props.users[user])}>Add in KDC</button>
                        <button onClick={() => {
                            getSessionKey({
                                myId: props.users[user].id,
                                friendId: props.users[user].friend,
                                nonce: generateUniquekey()
                            })
                        }}>Get session key</button>
                    </div>
                )
            })}
        </div>)
    }

    return(
        <div className="users">
            <span className="usersTitle">Users</span>
            <div className="newUser">
                <span>Name: <input value={newUser.name || ''} onChange={(event) => setNewUser({...newUser, name: event.target.value})}></input></span>
                <span>friend: <input value={newUser.friend || ''} onChange={(event) => setNewUser({...newUser, friend: event.target.value})}></input></span>
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
    addKdcUser,
    produceSessionRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);