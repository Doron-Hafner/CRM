import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import SearchBar from './SearchBar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    table: {
        maxHeight: '80vh',
        gridArea:'t'
    },
    pageination: {
        gridArea:'pg'
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

const ClientsTable = props => {
    let clientList = props.clientList
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
    return (
        <>
            <Box className={classes.pageination} margin={1}>
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
            <TableContainer className={classes.table}>
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
                        {clientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
        </>
    )
}

export default ClientsTable
