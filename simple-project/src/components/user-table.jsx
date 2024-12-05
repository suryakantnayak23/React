import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';

const columns = [
    { field: 'id', headerName: 'Sl No', width: 70 },
    {
        field: 'photo',
        headerName: 'Photo',
        width: 100,
        renderCell: () => (
            <img
                src="/src/assets/user.png"
                alt="User"
                style={{ width: '40px', borderRadius: '50%' }}
            />
        ),
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'registrationStatus', headerName: 'Registration Status', width: 180 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'ownerType', headerName: 'Owner Type', width: 130 },
    { field: 'userType', headerName: 'User Type', width: 130 },
    { field: 'userTag', headerName: 'User Tag', width: 150 },
    { field: 'approvalDetails', headerName: 'Approval Details', width: 180 },
    {
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: () => (
            <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{
                    textTransform: 'capitalize',
                    borderRadius: '15px',
                    backgroundColor: '#6200ea',
                    '&:hover': {
                        backgroundColor: '#3700b3',
                    },
                }}
            >
                Edit
            </Button>
        ),
    },
];

const rows = [
    {
        id: 1,
        photo: '',
        name: 'John Doe',
        registrationStatus: 'Registered',
        address: '123 Main St',
        phone: '123-456-7890',
        email: 'johndoe@example.com',
        ownerType: 'Owner',
        userType: 'Admin',
        userTag: 'Gold',
        approvalDetails: 'Approved',
    },
    {
        id: 2,
        photo: '',
        name: 'Jane Smith',
        registrationStatus: 'Pending',
        address: '456 Elm St',
        phone: '987-654-3210',
        email: 'janesmith@example.com',
        ownerType: 'Tenant',
        userType: 'User',
        userTag: 'Silver',
        approvalDetails: 'Pending',
    },
];

export default function UserTable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);

    // Search functionality
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
        const filtered = rows.filter((row) =>
            Object.values(row).some((field) =>
                String(field).toLowerCase().includes(value)
            )
        );
        setFilteredRows(filtered);
    };

    // Download Excel functionality
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'User Details');
        XLSX.writeFile(workbook, 'UserDetails.xlsx');
    };

    return (
        <div className="p-4">
            <h4 className="mb-4">User Management</h4>
            <div
                className="mb-4"
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                {/* Search Input with Icon */}
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    value={searchQuery}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        borderRadius: '50px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px',
                        },
                    }}
                />
                {/* Download Button with Icon */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownload}
                    startIcon={<DownloadIcon />}
                    sx={{
                        borderRadius: '50px',
                        textTransform: 'capitalize',
                        padding: '8px 16px',
                    }}
                >
                    Download
                </Button>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}
