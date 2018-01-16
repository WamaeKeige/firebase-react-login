import React, { Component } from 'react'
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyB4KruvsG6fYJYNq0RWAjAx88h0H6iUcq4",
    authDomain: "surveyapp-b138d.firebaseapp.com",
    databaseURL: "https://surveyapp-b138d.firebaseio.com",
    projectId: "surveyapp-b138d",
    storageBucket: "surveyapp-b138d.appspot.com",
    messagingSenderId: "1068816821814"
  };
  firebase.initializeApp(config);

class Authen extends Component {
  /**signup**/
  signup(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
/**then for succes, catch for errors**/
    promise
    .then(user =>{
      var err = "Welcome" + user.email;
      firebase.database().ref('users/' +user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err: err});
    });
    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState(({err: err}));
    });
  }
/**Login function**/
login(event){
  const email = this.refs.email.value;
  const password = this.refs.password.value;
  console.log(email, password);
  /**
   * Calling firebase auth
   */
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(email, password);
/**
 * catching the error passed
 */
 promise.then(user => {
   var lout = document.getElementById('logout');
   lout.classList.remove('hide');
 });

  promise.catch(e => {
        var err = e.message;
        console.log(err);
        this.setState({err: err});
      });


}
logout(){
  firebase.auth().signOut();
  var lout = document.getElementById('logout');
  lout.classList.add('hide');
}
/**google**/
google(){
 var provider = new firebase.auth.GoogleAuthProvider();
 var promise = firebase.auth().signInWithPopup(provider);

 promise.then( result =>{
   var user = result.user;
   console.log(result);
   firebase.database().ref('users/' +user.uid).set({
     email: user.email,
     name: user.displayName
   });
 });
 promise.catch(e =>{
   var msg = e.message;
   console.log(msg);
 })
}
/**
 * calling the constrtuctor.
 */
 constructor(props) {
   super(props);
   this.state = {
     err: ''
   };
   this.login = this.login.bind(this);
   this.signup = this.signup.bind(this);
   this.logout = this.logout.bind(this);
   this.google = this.google.bind(this);
 }

  render() {
    return (
      <div>
      <input id="email" ref="email" type="email" placeholder="Email Address"/> <br/>
      <input id="pass" ref="password" type="password" placeholder="Password" />
      <p>{this.state.err}</p>
      <button onClick={this.login}>Log In</button>
      <button onClick={this.signup}>Sign up</button>
      <button id="logout"className="hide" onClick={this.logout}>Log Out</button>
      <button id="google" onClick={this.google}>Sign In With Google</button><br/>
     </div>
    );
  }
}
export default Authen
