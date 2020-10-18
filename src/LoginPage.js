import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './LoginPage.css';
import { Cookies } from 'react-cookie';




class LoginPage extends Component{
	constructor() {
	super();
	const cookies = new Cookies();
        
	this.state = {

	 	email : '',
		pass : '',
		verified : false,
		errors : {},
		color : cookies.get("theme") || 'themeDark'
	}
	this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeColor = this.changeColor.bind(this);

}
changeColor = (e) => {
	const cookies = new Cookies();
	if (this.state.color === 'themeDark' ){
		cookies.set("theme", 'themeLight')
		this.setState({color : 'themeLight'})
	} else {
		cookies.set("theme", 'themeDark')
		this.setState({color : 'themeDark'})
	}
}

handleChangeEmail = (e) => {
  this.setState({email : e.target.value})
}
handleChangePass = (e) => {
  this.setState({pass : e.target.value})
}
handleSubmit = (e) => {
	const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(this.state.email);
    if (result === true) {
		this.state.errors.email = '';
		if (this.state.pass === "password"){
			this.state.errors.pass = '';
		    const cookies = new Cookies();
		    cookies.set("isLoggedin", true)
		    window.location.href = './homepage';
		}
		else{
			this.state.errors.pass = 'Please enter correct password';
		}
	}
	else{
		this.state.errors.email = 'Please enter correct email fromat';
	}
	this.setState({errors : this.state.errors})
}

render() 
{

  return (
  	<div className="App">
        <div className={this.state.color}>
        	<div style={{textAlign : 'right', padding : '20px 50px'}}>
          		<input className ="togglebutton" type = "button" value = "Dark/Light" onClick={this.changeColor}/>
          	</div>
         	<p><label> Login </label></p>
          	<p>
            <div>
            	<input className="field" type="text" value={this.state.email} placeholder="Username" onChange={this.handleChangeEmail} />
            </div>
            </p><span className = "errors" style={{ color: 'green' }}>{this.state.errors.email}</span>
	        <p><input className="field" type="password" value={this.state.pass} placeholder="Password" onChange={this.handleChangePass} /></p>
	        <span style={{ color: 'green' }}>{this.state.errors.pass}</span>
	        <p><button onClick={this.handleSubmit}> Submit</button>
	        </p>
        </div>
    </div>
	)
}

}
export default LoginPage;