import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateUniquekey, parseStringToKey, encrypt, decrypt } from '../Utils/utils';
import { addSession } from '../Redux/Users/usersActions';
import { consumeSessionRequest } from '../Redux/Queues/queuesActions';
import './KDC.scss';
import { USER, SESSION } from '../Utils/Objects';

const KDC = props => {
    const [newUser, setNewUser] = useState(USER)
    const [newSession, setNewSession] = useState(SESSION)
    const [users, setUsers] = useState({})
    const [sessions, setSessions] = useState({})

    useEffect(() => {
         //console.log(users)
      }, []);

    useEffect(() => {
         //console.log('Acessando fila de requisicoes !')
        if(props.queues.session.length > 0){
            const consuming = props.queues.session[props.queues.session.length - 1]
             //console.log('Consuming: ', consuming)
            let payload = {
                [consuming.myId]: {
                    sessionKey: encrypt(parseStringToKey(props.kdc.users[consuming.myId].key), '15-14-13-12-11-10-9-8-7-6-5-4-3-2-1-0'),
                    verificationStep: encrypt(parseStringToKey(props.kdc.users[consuming.myId].key, consuming)),
                },
                [consuming.friendId]: {
                    sessionKey: encrypt(parseStringToKey(props.kdc.users[consuming.friendId].key), '15-14-13-12-11-10-9-8-7-6-5-4-3-2-1-0'),
                    friendId: encrypt(parseStringToKey(props.kdc.users[consuming.friendId].key, props.kdc.users[consuming.friendId].id)),
                }
            }
             //console.log('Payload: ', payload)
            props.addSession({target: consuming.myId, session: payload})
            props.consumeSessionRequest()
        }
    }, [props.queues])

    const createUser = user => {
        if(user.name && user.key){
            let userKey = user.key.split('-')
            if(userKey.length === 16){
                 //console.log("Adding!")
                setUsers({
                    ...users,
                    [user.name]: {
                        id: generateUniquekey(),
                        nonce: generateUniquekey(),
                        key: user.key,
                        sessions: user.section ? user.section : {}
                    }
                });
                setNewUser(USER)
            } else {
                 //console.log("Invalid user.key");
            }
        } else {
             //console.log("Invalid user.name || user.key");
        }
    }

    const createSession = session => {
        if(session.key){
            setSessions({
                ...sessions,
                [generateUniquekey()]: {
                    key: session.key
                }
            })
            setNewSession({SESSION})
        } else {
             //console.log("Invalid session.name");
        }
    }

    const renderUsers = () => {
        let usersKeys = Object.keys(props.kdc.users)
        return(
        <div className="usersList">
            {usersKeys.map((user) => {
                // //console.log("Looping: ", kdc.users[user])
                let userSessionsKeys = Object.keys(props.kdc.users[user].sessions)
                return(
                    <div className="userRegister" key={props.kdc.users[user].key}>
                        <span>Nome: {user}</span>
                        <span>Friend: {props.kdc.users[user].friend}</span>
                        <span>Id: {props.kdc.users[user].id}</span>
                        <span>Key: {props.kdc.users[user].key}</span>
                        <div>
                            <span>Sessions:</span>
                            {userSessionsKeys.map(session => <span>{session}</span>)}
                        </div>
                    </div>
                )
            })}
        </div>)
    }

    const renderSessions = () => {
        let sessionsKeys = Object.keys(sessions)
        return(
        <div className="sessionsList">
            {sessionsKeys.map((session) => {
                return(
                    <div className="sessionRegister">
                        <span>Nome: {session}</span>
                        <span>Key: {sessions[session].key}</span>
                    </div>
                )
            })}
        </div>)
    }

    return(
        <div className="kdc">
            <span className="kdcTitle">KDC</span>
            <div className="config">
                <div className="newUser">
                    <span>Nome: <input value={newUser.name || ''} onChange={(event) => setNewUser({...newUser, name: event.target.value})}></input></span>
                    <span>Key: <input value={newUser.key || ''} onChange={(event) => setNewUser({...newUser, key: event.target.value})}></input></span>
                    <span>16 Inteiros (X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X)</span>
                    <button onClick={() => createUser(newUser)}>New user</button>
                    <button onClick={() => {}}>Debug</button>
                </div>
                <div className="newSection">
                    <span>Key: <input value={newSession.key || ''} onChange={(event) => setNewSession({...newSession, key: event.target.value})}></input></span>
                    <span>16 Inteiros (X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X)</span>
                    <button onClick={() => createSession(newSession)}>New session</button>
                    <button onClick={() =>  {}}>Debug</button>
                </div>
            </div>
            <div className="content">
                <div className="box users">
                    <span className="usersTitle">Users</span>
                    <div className="usersContent">
                        {renderUsers()}
                    </div>
                </div>
                <div className="box sessions">
                    <span className="sessionsTitle">Sessions</span>
                    <div className="sessionsContent">
                        {renderSessions()}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    kdc: state.kdc,
    users: state.users,
    queues: state.queues,
  });
const mapDispatchToProps = (dispatch) => bindActionCreators({
    addSession,
    consumeSessionRequest,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(KDC);


// bob: {
//     id: "bobId",
//     key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
//     sessions: {}
// },
// alice: {
//     id: "aliceId",
//     key: [15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0],
//     sessions: {}
// },
// 0-1-2-3-4-5-6-7-8-9-10-11-12-13-14-15   kbob
// 15-1-2-3-4-5-6-7-8-9-10-11-12-13-14-0   kalice
// 15-14-13-12-11-10-9-8-7-6-5-4-3-2-1-0   sessao