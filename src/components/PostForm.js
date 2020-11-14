import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
            transaction_amount: '',
            previous_balance: '',
            current_balance: ''
        }
        
    }
    
    componentDidMount() {
        axios.get('http://localhost:3001/posts/')
            .then((response) => {
              console.log(response.data)
                this.setState({
                    current_balance: response.data.pop().current_balance
                });
            }).catch((error) => {
                console.error(error);
        });
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({date: timeStamp});
    }

    updateStateHandler = (e) => {
        let x = Number(this.state.current_balance) + Number(this.state.transaction_amount);
        let y = Number(this.state.current_balance);
        this.setState({ current_balance: x });
        this.setState({ previous_balance: y });
    }

    submitHandler = (e) => {

        e.preventDefault();
       
        axios.post('http://localhost:3001/posts', this.state)
        .then(response => {
            /* console.log(response) */
        }).catch(error => {
            console.log(error)
        });
        
        window.location.reload(false);
    }
    
    render() {
        const { type, description, transaction_amount, current_balance } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={this.submitHandler}>
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
                    <Button variant="contained" color="primary" type="submit" onClick={this.updateStateHandler}>
                        Submit
                    </Button>         
                </form>
            </div>
        )
    }
}

export default withStyles(styles, { withStyles: true })(PostForm);
