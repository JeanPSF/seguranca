import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, sendSessionKey, generateNonce, sendNonce, checkNonce } from '../Redux/Users/usersActions';
import { addKdcUser } from '../Redux/KDC/KDCactions';
import { produceSessionRequest } from '../Redux/Queues/queuesActions';
import { generateUniquekey, encrypt, decrypt, parseStringToKey } from '../Utils/utils';
import { USER, SESSION } from '../Utils/Objects';
import './Users.scss';

const Users = props => {
    const [newUser, setNewUser] = useState(USER)

    // useEffect(() => {
    //     //Bob
    //     console.log('Bob Decryopt: ', 
    //         // decrypt(
    //         //     props.users.k0omyspa_kzubawj1is.key, 
    //         //     props.users.k0omyspa_kzubawj1is.sessions
    //         // )
    //     )
    // }, [props.users.k0omyspa_kzubawj1is])

    const checkNonce = (nonce) => {
        return nonce + 1
    }
    const notCHeckNonce = (nonce) => {
        return nonce - 1
    }

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
    const sendSessionKey = (payload) => {
        props.sendSessionKey(payload)
    }
    const sendNonce = (nonce) => {
        return checkNonce(nonce)
    }
    const verifyNonce = (nonce) => {
        return notCHeckNonce(nonce)
    }
    const renderUsers = () => {
        let usersKeys = Object.keys(props.users)
        // decrypt(props.users[user].key.split('-'), props.users[user].sessions.session.users[user].verificationStep)
        return(
        <div className="usersList">
            {usersKeys.map((user) => {
                let userSessionsKeys = Object.keys(props.users[user].sessions)
                let myId = props.users[user].id
                return(
                    <div className="userRegister" key={props.users[user].key}>
                        <span>Name: {props.users[user].name}</span>
                        <span>Id: {props.users[user].id}</span>
                        <span>Friend: {props.users[user].friend}</span>
                        <span>Key: {props.users[user].key}</span>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span>Sessions:</span>
                            {userSessionsKeys.length > 0 ?
                             userSessionsKeys.map(session => {
                                //console.log(session)
                                return  <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <span>Chave sessao: {session}</span>
                                            <span>Chave sessao decrypt: {decrypt(parseStringToKey(props.users[user].key), session)}</span>
                                        </div>
                            })
                            : null}
                        </div>
                        <div>Nonce: {props.users[user].nonce}</div>
                        <button onClick={() => props.addKdcUser(props.users[user])}>Add in KDC</button>
                        <button onClick={() => {
                            getSessionKey({
                                myId: props.users[user].id,
                                friendId: props.users[user].friend,
                                nonce: generateUniquekey()
                            })
                        }}>Get session key</button>
                        <button onClick={() => {
                            let userSessionsKeys = Object.keys(props.users[user].sessions)
                            sendSessionKey({
                                from: props.users[user].id,
                                target: props.users[user].friend,
                                session: props.users[user].sessions[userSessionsKeys[0]]
                            })
                        }}>Send Session Key To Friend</button>
                        <button onClick={() => {
                            let nonce = 0
                            props.generateNonce({nonce: nonce, target: props.users[user].id})
                        }}>Generate nonce</button>

                        <button onClick={() => {
                            let parsedSessionKey = parseStringToKey(decrypt(parseStringToKey(props.users[user].key), userSessionsKeys[0]))
                            props.sendNonce({nonce: encrypt(parsedSessionKey, sendNonce(props.users[user].nonce)), target: props.users[user].friend})
                        }}>Send nonce</button>

                        <button onClick={() => {
                            let parsedSessionKey = parseStringToKey(decrypt(parseStringToKey(props.users[user].key), userSessionsKeys[0]))
                            // console.log(parsedSessionKey)
                            // console.log(verifyNonce(props.users[user].nonce))
                            // console.log(decrypt(parsedSessionKey, verifyNonce(props.users[user].nonce)) === 0 ? '0' : decrypt(parsedSessionKey, verifyNonce(props.users[user].nonce)))
                            props.checkNonce({nonce:  verifyNonce(decrypt(parsedSessionKey,props.users[user].nonce)), target: props.users[user].id})
                        }}>Check nonce</button>
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
    sendSessionKey,
    generateNonce, sendNonce, checkNonce
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);