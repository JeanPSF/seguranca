import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {generateUniquekey} from '../utils';
import './KDC.scss';

const KDC = props => {
    const [newUser, setNewUser] = useState(INITIAL_USER_STATE)
    const [newSession, setNewSession] = useState(INITIAL_SESSION_STATE)
    const [users, setUsers] = useState({})
    const [sessions, setSessions] = useState({})

    useEffect(() => {
        console.log(users)
      }, []);

    const createUser = user => {
        if(user.name && user.key){
            let userKey = user.key.split('-')
            if(userKey.length === 16){
                console.log("Adding!")
                setUsers({
                    ...users,
                    [user.name]: {
                        id: generateUniquekey(),
                        key: user.key,
                        sessions: user.section ? user.section : {}
                    }
                });
                setNewUser(INITIAL_USER_STATE)
            } else {
                console.log("Invalid user.key");
            }
        } else {
            console.log("Invalid user.name || user.key");
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
            setNewSession({INITIAL_SESSION_STATE})
        } else {
            console.log("Invalid session.name");
        }
    }

    const renderUsers = () => {
        let usersKeys = Object.keys(props.kdc.users)
        return(
        <div className="usersList">
            {usersKeys.map((user) => {
                //console.log("Looping: ", kdc.users[user])
                let userSessionsKeys = Object.keys(props.kdc.users[user].sessions)
                return(
                    <div className="userRegister" key={props.kdc.users[user].key}>
                        <span>Nome: {user}</span>
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
                    <button onClick={() => console.log(users)}>Debug</button>
                </div>
                <div className="newSection">
                    <span>Key: <input value={newSession.key || ''} onChange={(event) => setNewSession({...newSession, key: event.target.value})}></input></span>
                    <span>16 Inteiros (X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X)</span>
                    <button onClick={() => createSession(newSession)}>New session</button>
                    <button onClick={() => console.log(sessions)}>Debug</button>
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
  });
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(KDC);

const INITIAL_USER_STATE = {
    name: null,
    id: null,
    key: null,
    sessions: null
}
const INITIAL_SESSION_STATE = {
    name: null,
    key: null
}
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
// 0-1-2-3-4-5-6-7-8-9-10-11-12-13-14-15
// 15-1-2-3-4-5-6-7-8-9-10-11-12-13-14-0
// 15-14-13-12-11-10-9-8-7-6-5-4-3-2-1-0