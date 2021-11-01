import React from "react";

class GoogleAuth extends React.Component{
    state = {isSignedIn : null}

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId : '1068412668259-895iideu6sfunusl2ukgp5u0tsjs0lib.apps.googleusercontent.com',
                scope : 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn : this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    onAuthChange = () => {
        this.setState({isSignedIn : this.auth.isSignedIn.get()});
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton(){
        if(this.state.isSignedIn === null){
            return null;
        } else if(this.state.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else{
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon"/>
                    Sign in using Google
                </button>
            );
        }
    }

    render(){
        return this.renderAuthButton();
    }
}

export default GoogleAuth