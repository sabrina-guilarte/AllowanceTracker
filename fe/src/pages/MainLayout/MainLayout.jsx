import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory'; // Para Picor
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Para Daimacu
import ChildrenCard from '../../componets/childrenCard';
import MovementDialog from '../../componets/movmentDialog';
import { DataGrid } from '@mui/x-data-grid';
import TransactionList from './transactionList';



const drawerWidth = 280;

const MainLayout = ({ children, parameters,setPage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false)
  const [childId, setChildId] = useState(parameters?.user?.isKid? parameters?.user?.id : 0)
  const [userName,setUsername] = useState(undefined)
  const [mpage, setMPage] = useState(parameters?.user?.isKid? "trxList" : "childrenList")
  const [type, setType] = useState(2)

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Usuario de ejemplo - reemplazar con datos reales
  const user = Object.assign({
    avatar: "/api/placeholder/150/150",
    role: "Administrator"
  }, parameters.user)

  const swichPage = (page) => {
    switch (page) {
      case "childrenList":
        return parameters.users.filter(u => u.isKid == true).map(u => <div style={{ marginTop: 20 }} onClick={()=> { setMPage("trxList"); setChildId(u.id)}} ><ChildrenCard name={u.name} balance={u.balance} avatar={u.avatar} setOpenDialog={setOpenDialog} setMovmentType={setType} /></div>)

      case "trxList": 
      return <TransactionList setMPage={setMPage} childId={childId} userName={userName}/>

    }
  }

  useEffect(()=> {
    setUsername( parameters.users.find(u=> u.id==childId)?.name)
  },[childId])

  console.log(user)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [];

  if (!user.isKid) {
    menuItems.push(
      { text: 'Dashboard', icon: <InventoryIcon />, fx: ()=>setMPage("childrenList") },
      { text: 'Lista de transacciones', icon: <InventoryIcon />, fx: () => {setMPage("trxList"); setChildId(0)}  },
      { text: 'Administrar Familia', icon: <InventoryIcon />, fx: '/picor' }
    )
  } else {
    menuItems.push(
      { text: 'Lista de transacciones', icon: <InventoryIcon />,  fx: () => {setMPage("trxList"); setChildId(user.id)}  }
    )
  }

  const handleLogout = () => {
    console.log('Logging out...');
    setPage("userSelector")
    // Implementar lógica de logout
  };

  const drawer = (
    <>
      {/* Profile Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            width: 80,
            height: 80,
            mb: 1,
            border: '3px solid',
            borderColor: 'primary.contrastText'
          }}
        />
        <Typography variant="h6" noWrap component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {user.role}
        </Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding onClick={item.fx}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Section */}
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              px: 2.5,
              '&:hover': {
                bgcolor: 'error.light',
                color: 'error.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'error.contrastText',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: 'none' }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, sm: 0 },
        }}
      >

        {
          swichPage(mpage)
        }
        <ChildrenCard />
      </Box>
      <MovementDialog
        open={openDialog}
        setOpen={setOpenDialog}
        type={type}
      />
    </Box>
  );
};

export default MainLayout;