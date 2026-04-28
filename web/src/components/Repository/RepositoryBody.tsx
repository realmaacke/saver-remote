import {
    Box,
    Typography,
    Button,
    IconButton,
    Divider,
    Table,
    TableBody
} from "@mui/material";

import DownloadIcon from '@mui/icons-material/Download';
import RampLeftIcon from '@mui/icons-material/RampLeft';

import type { RepositoryBodyData } from "./RepositoryModel";

type Props = {
    data: RepositoryBodyData
}

export default function RepositoryBody(
    { data } : Props
) {
return(
<>
<Box className="repo-toolbar">
    <Button size="small" variant="outlined" className="branch-selector" endIcon={<RampLeftIcon/>}>branch</Button>
    <Box className="clone-bar">
        <Button variant="contained" endIcon={<DownloadIcon/>}>
            Download
        </Button>
    </Box>
</Box>

<Divider />

<Box className="repo-commit">
    <Typography variant="caption" className="last-commit-text">
        last commit:
    </Typography>
    <Typography variant="caption" className="last-commit">
        username
    </Typography>
</Box>

<Divider />

{/* File browser */}
<Table size="small" className="file-table">
    <TableBody>
    {/* rows injected here */}
    </TableBody>
</Table>

<Divider />

{/* README */}

{data.hasReadme ? (
<Box className="readme-panel">
    <Box className="readme-header">
        <Typography variant="body2">README.md</Typography>
    </Box>
    <Box className="readme-content" />
</Box>
): (
    <h1></h1>
)}
</>
);
}