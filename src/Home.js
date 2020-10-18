import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import './Home.css';




class Home extends Component {
    constructor() {
    	super();
        const cookies = new Cookies();
        this.state = {
            myArray : [],
            newval : '',
            errors : {},
            txt : '',
            space : true,
            color : cookies.get("theme") || 'themeDark'
        }
           
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Listitems = this.Listitems.bind(this);
        this.changeColor = this.changeColor.bind(this);

    }
    Listitems(en) {
    	const remove = en.target.getAttribute('value')
		var index = this.state.myArray.indexOf(remove);
		this.state.myArray.splice(index, 1);
    	this.setState(this.state.myArray)
    }

    componentWillMount() {
        const cookies = new Cookies();
        if(!cookies.get("isLoggedin")){
          window.location.href = './';
        }
    }

    handleChange(e) {
    	this.setState({txt : e.target.value}); 
    }

    handleClick(e) {
        if(this.state.txt){
    	if(this.state.myArray.indexOf(this.state.txt) === -1){
    		this.state.myArray.push(this.state.txt)
            this.state.errors.duplicate = ''
            }
    	else{
            this.state.errors.duplicate = 'you have entered duplicate value'
    	}
        }else{
            this.state.errors.duplicate = 'Null values not accepted'

        }  
    this.setState({txt : '', errors : this.state.errors})     
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

    render() {
        return(
            <div className="App">
                <div className ={this.state.color}>
                    <div style={{textAlign : 'right', padding : '20px 50px'}}>
                        <input className ="togglebutton" type = "button" value = "Dark/Light" onClick={this.changeColor}/>
                    </div>
        	        <input className="field" placeholder="Enter text here..." type="textbox" value = {this.state.txt} onChange = {this.handleChange} />
                    <p><span style={{ color: 'red' }}>{this.state.errors.duplicate}</span></p>
                    <p><button onClick={this.handleClick}> Add </button>
                    </p>
            	    <div>
              		{
              		this.state.myArray.map( (name, index) => (
                        <div className = "divItemlist" >
                	       <div className = "itemList" key = {index} value = {name} onClick = {this.Listitems}>
                	       {name} &nbsp; &nbsp; X 
                           </div>
                        </div>
                    )
              		)}

                    </div>
                </div>
            </div>
            );
    }
}

export default Home;
