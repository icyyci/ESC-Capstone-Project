import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable(data) {
  const classes = useStyles();

  var array = []
  for (var i = 0; i < data["data"].length; i++){
    var key_value_pair = data["data"][i]
    var property_name = (Object.keys(key_value_pair))[0]
    var property_value = key_value_pair[property_name]
    array.push([property_name, property_value])
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
          {array.map((arrayentry) => (
            <TableRow key={arrayentry[0]}>
              <TableCell component="th" scope="row">
                {arrayentry[0]}
              </TableCell>
              <TableCell align="right">
                {arrayentry[1]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}