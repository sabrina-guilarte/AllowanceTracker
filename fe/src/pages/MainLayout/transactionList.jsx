import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Fab } from '@mui/material';

import Home from "@mui/icons-material/Home"

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'dateTime',
        headerName: 'Date',
        valueGetter: (row) => new Date(row.row?.dateTime).toLocaleString(),

        width: 175,
    },
    {
        field: 'reason',
        headerName: 'Reason',
        flex: 1,
        minWidth: 200
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 110,
        renderCell: (params) => {
            const amount = params.row.amount;
            return (
                <span style={{ color: amount < 0 ? '#d32f2f' : 'inherit' }}>
                    {amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })}
                </span>
            );
        }
    },
    {
        field: 'child',
        headerName: 'Child',
        sortable: false,
        width: 180
    },
];

const rows = [
    { id: 1, dateTime: 1732244184174, reason: "porque me dio la gana darle dinero a mi hijo, que pregunta mas ilogica", amount: 14, child: "Matias Alberto", childId: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1" },
    { id: 2, dateTime: 1732244184174, amount: -54444, child: "b" },
    { id: 2, dateTime: 1732244184174, amount: -54444, child: "b" },
    { id: 2, dateTime: 1732244184174, amount: -54444, child: "b" },
    { id: 2, dateTime: 1732244184174, amount: -54444, child: "b" },
    { id: 2, dateTime: 1732244184174, amount: -54444, child: "b" },
    { id: 2, dateTime: 1732244184174, amount: -54444, child: "b" },
    { id: 3, dateTime: 1732244184174, amount: 3444, child: "c" }
];



export default function TransactionList({ childId, setMPage,userName }) {
    const [trx, setTrx] = React.useState([])

    const fetchTrx = (childId) => {
        setTrx(rows.filter(r => childId == r.childId || childId == 0))
    }

    React.useEffect(() => {
        fetchTrx(childId)
    }, [childId])

    React.useEffect(() => {
        fetchTrx(childId)
    }, [])
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                overflow: 'hidden', // Importante para evitar scroll innecesario
                width: '100%',
                height: '100%', // Asegura que tome toda la altura disponible
                '& .MuiDataGrid-root': {
                    border: 'none',
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 1,
                    '& .MuiDataGrid-main': {
                        '& .MuiDataGrid-virtualScroller': {
                            // Mejora el scrolling
                            '&::-webkit-scrollbar': {
                                width: '0.4em',
                                height: '0.4em',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: '#555',
                            },
                        },
                    },
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'background.neutral',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                },
                '& .MuiDataGrid-cell': {
                    borderColor: 'divider'
                }
            }}
        >
            <div style={{  height:80, display: "flex", justifyContent: "space-between" }}>
                <Fab color="primary" aria-label="edit" onClick={() => setMPage("childrenList")}>
                    <Home />
                </Fab>
                <span>{userName}</span>
                <div>
                    <span style={{ fontWeight: 900, fontSize: 24 }}>Balance: </span>
                    <span>{trx.reduce((a,b)=> a + b.amount,0).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        })}</span>

                </div>

            </div>

            <DataGrid
                rows={trx}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'dateTime', sort: 'desc' }],
                    },
                }}
                pageSizeOptions={[5, 10, 25, 100]}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight={false} // Importante para que tome toda la altura
                sx={{
                    flex: 1, // Hace que el DataGrid tome todo el espacio disponible
                    minHeight: 0, // Necesario para que flex: 1 funcione correctamente
                }}
            />
        </Box>
    );
}