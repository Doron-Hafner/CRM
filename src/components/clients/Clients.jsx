import React, {useState} from 'react'
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import SearchBar from './SearchBar';
import ClientsTable from './ClientsTable';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: '80vh',
    },
    tableHeader: {
        justifyContent: 'space-between',
        display:'flex',
    }
  });

  const columns = [
    { id: 'firstName', label: 'Name', minWidth: 100 },
    { id: 'lastName', label: 'Surname', minWidth: 100 },
    { id: 'country', label: 'Country', minWidth: 70 },
    { id: 'first_contact', label: 'First Contact', minWidth: 200 },
    { id: `email_type`, label: 'Email', minWidth: 20 },
    { id: 'sold', label: 'Sold', minWidth: 20 },
    { id: 'owner', label: 'Owner', minWidth: 100 },
  ];

const Clients = inject("ClientsStore")(observer(props=> {
    let loading = props.ClientsStore.loading
    let clientList = [...props.ClientsStore.clientList]
    clientList.forEach(c =>  {
        if(!c.email_type) c.email_type =  <RemoveIcon/> 
        if(c.sold === 1) {c.sold = <CheckIcon/>}
        if(c.sold === 0) {c.sold = <RemoveIcon/>}
    })
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (evt, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (evt) => {
      setRowsPerPage(+evt.target.value);
      setPage(0);
    };
    const handlePopup = evt => {
        
    }
    const filter = (searchType, searchInput) => {
        if(searchInput > 0){
            if(searchType === 'name'){
                return clientList.filter(c => (c.firstName+c.lastName).toLowerCase().indexOf(searchInput) > -1)
            }
            return clientList.filter(c => c[searchType] === searchInput)
        }
        return clientList
    }
    return (
        <Box>
            {!loading && <h3>...loading</h3>}
            {loading && (
                  <Paper className={classes.root}>
                    <Box className={classes.tableHeader} margin={1}>
                        <SearchBar filter={filter}/>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={clientList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Box>
                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filter().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.name} onClick={handlePopup}>
                                {columns.map((column) => {
                                  const value = row[column.id]
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                        {value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                  )}
        </Box>
    )
}))
            


export default Clients
