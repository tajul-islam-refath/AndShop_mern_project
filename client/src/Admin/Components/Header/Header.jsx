import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { BiMenuAltLeft } from "react-icons/bi";

const Header = ({ openNav }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            mr: 2,

                        }}
                        onClick={() => openNav()}
                    >
                        <BiMenuAltLeft />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        And Shop
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header