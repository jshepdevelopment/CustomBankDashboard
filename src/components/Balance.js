import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const timestamp = new Date().toLocaleString()

function preventDefault(event) {
  event.preventDefault();
}

export default class Balance extends Component {
  constructor(props) {
      super(props);

      this.state = {
          current_balance: 0
      }
      this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(current_balance) {
    this.setState({ current_balance });
  }

  componentDidMount() {
    axios.get('http://localhost:3001/posts/')
        .then((response) => {
          console.log(response.data)
            this.setState({
                current_balance:response.data.pop().current_balance
            });
        }).catch((error) => {
            console.error(error);
        });       
  }

  render() {
    const { current_balance } = this.state;
/*     const { classes } = this.props;
 */    return (
        <div>
        <React.Fragment>
        <Title>Account Balance</Title>
        <Typography component="p" variant="h4" handleChange={this.handleChange}>
         $ {current_balance}
        </Typography>
        <Typography color="textSecondary" >
          { timestamp }
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View account history
          </Link>
        </div>
      </React.Fragment>
          </div>
    );
  }
}