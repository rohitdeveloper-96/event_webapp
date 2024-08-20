import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'UserId',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Username',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email-Id',
    },
    {
        id: 'event',
        numeric: false,
        disablePadding: false,
        label: 'Event Name',
    },
    {
        id: 'skills',
        numeric: false,
        disablePadding: false,
        label: 'PrimarySkills',
    },
    {
        id: 'edit',
        numeric: false,
        disablePadding: false,
        label: 'EditUsers',
    },
    {
        id: 'Delete',
        numeric: false,
        disablePadding: false,
        label: 'DeleteUsers',
    },
    {
        id: 'Details',
        numeric: false,
        disablePadding: false,
        label: 'Details',
    },
];
export default function EnhancedTableHead(props) {
    const { order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ width: 250 }}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};