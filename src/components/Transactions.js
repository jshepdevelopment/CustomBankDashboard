import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
      this.state = {
        transactions: []
      };
   }

   getTransactionsData() {
     axios
      .get('http://localhost:3001/posts/', {})
      .then(res => {
        const data = res.data
        console.log(data)
        const transactions = data.map(u =>
          <div>
            <React.Fragment>
                  <Table size="small">
                    <TableBody>
                        <TableRow key={u.id}>
                          <TableCell align="right">{u.date}</TableCell>
                          <TableCell align="right">{u.type}</TableCell>
                          <TableCell align="right">{u.description}</TableCell>
                          <TableCell align="right">${u.transaction_amount}</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
              </React.Fragment>
          </div>)
        this.setState({transactions})
      })
      .catch((error) => {
        console.log(error)
      })
   }
   componentDidMount(){
     this.getTransactionsData()
   }
   render() {
     return (
       <div>
         <React.Fragment>
           <Title>Recent Transactions</Title>
         <Table size="small">
        <TableBody>
          <TableHead>
          <TableRow>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        </TableBody>
        </Table>
        </React.Fragment>
          {this.state.transactions}
       </div>
     )
   }
}