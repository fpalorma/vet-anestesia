
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Links } from '../links';
import { useRouter } from 'next/navigation';

const DrawerContent = ({ onToggle }) => {
  const router = useRouter();

  return (
    <Box onClick={onToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VET
      </Typography>
      <Divider />
      <List>
        {Links.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
};

export default DrawerContent;