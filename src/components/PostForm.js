import React, { Component } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';


const timeStamp = Date.now();

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  });

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            type: '',
            description: '',
            transaction_amount: 0,
            previous_balance: 12,
            current_balance: 32
        }
        
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({date: timeStamp});
    }

    addAction =(event)=> {
        let x = Number(this.state.previous_balance) + Number(this.state.transaction_amount);
        this.setState({current_balance: x });

        console.log(this.state.current_balance);

    }    

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state)
        axios.post('http://localhost:3001/posts', this.state)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }
    
    render() {
        const { type, description, transaction_amount } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={this.addAction, this.submitHandler}>
                    <TextField id="standard-basic" label="Type"
                    type="text" 
                    name="type" 
                    value={type}
                    onChange={this.changeHandler} />
                    <TextField id="standard-basic" label="Description"
                    type="text" 
                    name="description" 
                    value={description}
                    onChange={this.changeHandler} />
                    <TextField id="standard-basic" label="Amount"
                    type="number" 
                    name="transaction_amount" 
                    value={transaction_amount}
                    onChange={this.changeHandler} />
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="contained" color="primary" type="submit" onClick={this.addAction}>
                        Add
                    </Button>
                </form>

{/*                 <form onSubmit={this.submitHandler}>
                    <div>
                        <input 
                        type="text" 
                        name="title" 
                        value={title}
                        onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input 
                        type="text" 
                        name="description" 
                        value={description}
                        onChange={this.changeHandler} />
                    </div>
                    <button type="submit">Submit</button>
                </form> */}
            </div>
        )
    }
}

export default withStyles(styles, { withStyles: true })(PostForm);
