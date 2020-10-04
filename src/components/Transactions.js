import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Transaction Data
function createData(id, date, type, description, amount) {
  return { id, date, type, description, amount };
}

const rows = [
  createData(0, 'Sept 30, 2020', 'Deposit', 'Behavior chart reward', 7.00),
  createData(0, 'Sept 9, 2020', 'Deposit', 'Behavior chart reward', 3.00),
  createData(0, 'Aug 12, 2020', 'Withdrawl', 'Lego Purchase', -11.23),
  createData(0, 'July 30, 2020', 'Deposit', 'Behavior chart reward', 12.00),
  createData(0, 'July 2, 2020', 'Deposit', 'Behavior chart reward', 5.00),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Transactions() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more transactions
        </Link>
      </div>
    </React.Fragment>
  );
}
