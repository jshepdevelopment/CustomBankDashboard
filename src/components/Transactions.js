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
        const transactions = 
          <div>
            <React.Fragment>
              <Title>Recent Transactions</Title>
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Transaction Type</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell align="left">{u.date}</TableCell>
                          <TableCell align="left">{u.type}</TableCell>
                          <TableCell align="left">{u.description}</TableCell>
                          <TableCell align="left">${u.transaction_amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </React.Fragment>
          </div>
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
          {this.state.transactions}
       </div>
     )
   }
}