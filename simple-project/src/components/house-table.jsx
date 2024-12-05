import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";

// Table columns
const columns = [
    { field: "id", headerName: "Sl No", width: 70 },
    { field: "block", headerName: "Block", width: 100 },
    { field: "floor", headerName: "Floor", width: 120 },
    { field: "houseNumber", headerName: "House No", width: 120 },
    { field: "userCount", headerName: "User Count", type: "number", width: 120 },
    { field: "squareFeet", headerName: "House Sq Ft", type: "number", width: 130 },
    { field: "amountPerSqFt", headerName: "Amount/Sq Ft", type: "number", width: 130 },
    {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => (
            <span
                style={{
                    color: params.value === "Active" ? "green" : "red",
                    fontWeight: "bold",
                }}
            >
        {params.value}
      </span>
        ),
    },
    {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => (
            <>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginRight: 1 }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color={params.row.status === "Active" ? "error" : "success"}
                    size="small"
                >
                    {params.row.status === "Active" ? "Inactivate" : "Activate"}
                </Button>
            </>
        ),
    },
];

// Sample data
const initialRows = [
    {
        id: 1,
        block: "A",
        floor: "1st",
        houseNumber: 101,
        userCount: 2,
        squareFeet: 1200,
        amountPerSqFt: 50,
        status: "Active",
    },
    {
        id: 2,
        block: "A",
        floor: "2nd",
        houseNumber: 201,
        userCount: 0,
        squareFeet: 1000,
        amountPerSqFt: 45,
        status: "Inactive",
    },
    {
        id: 3,
        block: "B",
        floor: "3rd",
        houseNumber: 302,
        userCount: 1,
        squareFeet: 900,
        amountPerSqFt: 40,
        status: "Active",
    },
];

export default function HouseTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRows, setFilteredRows] = useState(initialRows);

    // Search functionality
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
        const filtered = initialRows.filter((row) =>
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "House Details");
        XLSX.writeFile(workbook, "HouseDetails.xlsx");
    };

    return (
        <div className="p-4">
            <h4 className="mb-4">Apartment House Management</h4>
            <div
                className="mb-4"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                {/* Search Input */}
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
                        borderRadius: "50px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",
                        },
                    }}
                />
                {/* Download Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownload}
                    startIcon={<DownloadIcon />}
                    sx={{
                        borderRadius: "50px",
                        textTransform: "capitalize",
                        padding: "8px 16px",
                    }}
                >
                    Download
                </Button>
            </div>
            <div style={{ height: 400, width: "100%" }}>
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
