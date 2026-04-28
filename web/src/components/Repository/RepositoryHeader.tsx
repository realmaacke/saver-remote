import {
    Box,
    Typography,
    Chip,
    Button
} from "@mui/material";

export default function RepositoryHeader() {
return (
    <>
        <Box className="repo-header">
            <Box className="repo-title">
                <Typography className="repo-owner">Marcus</Typography>
                <Typography className="repo-slash">/</Typography>
                <Typography className="repo-name">saver</Typography>
                <Chip className="repo-visibility" label="public" size="small" variant="outlined" />
            </Box>
        </Box>
    </>
);
}