import { Typography, Divider, Box, Stack } from "@mui/material";

export default function RepositorySidebar() {
return (
    <div className="repository-statistics">

    <Box className="sidebar-section">
        <Typography variant="caption" className="sidebar-section-title">About</Typography>
        <Typography variant="body2" className="repo-description" />
        <Typography variant="caption" className="repo-license" />
    </Box>

    <Divider />

    {/* Topics */}
    <Box className="sidebar-section">
        <Typography variant="caption" className="sidebar-section-title">Topics</Typography>
        <Box className="topics-list">
        {/* topic chips injected here */}
        </Box>
    </Box>

    <Divider />

    {/* Stats */}
    <Box className="sidebar-section">
        <Typography variant="caption" className="sidebar-section-title">Stats</Typography>
        <Stack spacing={1.25} className="stats-list">
        {/* stat rows injected here */}
        </Stack>
    </Box>

    <Divider />

    {/* Languages */}
    <Box className="sidebar-section">
        <Typography variant="caption" className="sidebar-section-title">Languages</Typography>
        <Box className="language-bar" />
        <Stack spacing={0.75} className="language-list">
        {/* language rows injected here */}
        </Stack>
    </Box>

    </div>
);
}