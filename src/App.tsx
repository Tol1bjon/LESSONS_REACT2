import React, { useEffect, useState } from 'react'
import { useData } from './Store/Zustand'
import Info from './Components/Info'
import Add from './Components/Add'
import Edit from './Components/Edit'
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grow,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { keyframes } from '@mui/material/styles'
import { Briefcase, EllipsisVertical, Info as InfoIcon, Mail, Pencil, Plus, Search, Trash2 } from 'lucide-react'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(46, 160, 110, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(46, 160, 110, 0); }
  100% { box-shadow: 0 0 0 0 rgba(46, 160, 110, 0); }
`

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
`

export default function App() {
  const { data, loading, get, error, deleteUser, searchUser } = useData((state: any) => state)
  const [addOpen, setAddOpen] = useState(false)
  const [info, setInfo] = useState(null)
  const [editOpen, setEditOpen] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuUser, setMenuUser] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const filteredData = data.filter((user: any) =>
    user.name.toLowerCase().includes(inputValue.trim().toLowerCase())
  )

  useEffect(() => {
    const timer = setTimeout(
      () => inputValue.trim() ? searchUser(inputValue.trim()) : get(),
      inputValue ? 500 : 0
    )
    return () => clearTimeout(timer)
  }, [inputValue])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f5f9', p: { xs: 2, md: 5 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

        {/* HEADER */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 4, animation: `${slideDown} 0.6s ease both`}}>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>Users</Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
            <TextField value={inputValue} onChange={(e: any) => setInputValue(e.target.value)} size="small" placeholder="Search..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{width: { xs: '100%', sm: 240 },bgcolor: '#fff',borderRadius: 2,transition: 'all 0.3s ease','&:focus-within': { width: { sm: 300 }, boxShadow: '0 6px 20px rgba(79, 70, 229, 0.18)' },'& .MuiOutlinedInput-root': { borderRadius: 2 },}}/>

            <Select size="small" defaultValue="all" sx={{ minWidth: 130, bgcolor: '#fff', borderRadius: 2, transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.08)' } }}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>

            <Button variant="contained" startIcon={<Plus size={20} />} onClick={() => setAddOpen(true)} sx={{borderRadius: 2,px: 2.5,py: 1,textTransform: 'none',fontWeight: 700,bgcolor: '#4f46e5',boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',transition: 'all 0.3s ease','&:hover': { bgcolor: '#4338ca', transform: 'translateY(-3px)', boxShadow: '0 12px 26px rgba(79, 70, 229, 0.4)' },'&:active': { transform: 'translateY(0) scale(0.97)' },}}>Add user</Button>
          </Box>
        </Box>

        {/* LIST */}
        {loading ? (
          <Box sx={{display: 'grid',gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',gap: 3,}}>
            {filteredData.map((user: any, i: number) => (
              <Grow in key={user.id} timeout={400 + i * 120}>
                <Box sx={{position: 'relative',p: 3,bgcolor: '#fff',borderRadius: 4,overflow: 'hidden',border: '1px solid transparent',transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)','&::before': {content: '""',position: 'absolute',top: 0,left: 0,width: '100%',height: 4,bgcolor: user.status ? '#2ea06e' : '#c4c9d4',transform: 'scaleX(0)',transformOrigin: 'left',transition: 'transform 0.4s ease',},'&:hover': {transform: 'translateY(-8px)',borderColor: '#e0e4ff',boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)',},'&:hover::before': { transform: 'scaleX(1)' },'&:hover .user-avatar': { transform: 'scale(1.08) rotate(-3deg)' },}}>
                  {/* 3 DOTS */}
                  <IconButton onClick={(e) => {setAnchorEl(e.currentTarget); setMenuUser(user)}} sx={{position: 'absolute',top: 14,right: 14,transition: 'all 0.3s ease','&:hover': { bgcolor: '#eef0ff', color: '#4f46e5', transform: 'rotate(90deg)' },}}><EllipsisVertical size={22} /></IconButton>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Avatar className="user-avatar" src={user.avatar} alt={user.name} sx={{ width: 88, height: 88, mb: 2, transition: 'transform 0.4s ease', border: '3px solid #eef0ff' }}/>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{user.age} years old</Typography>
                    <Chip size="small" label={user.status ? 'ACTIVE' : 'INACTIVE'} sx={{ fontWeight: 700, mb: 2, bgcolor: user.status ? '#e6f6ee' : '#eceef3', color: user.status ? '#1f7a52' : '#6b7280', animation: user.status ? `${pulse} 2s infinite` : 'none',}}/>
                    <Divider flexItem sx={{ mb: 2 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mb: 0.5, transition: 'color 0.3s', '&:hover': { color: '#4f46e5' } }}>
                      <Mail size={18} />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', transition: 'color 0.3s', '&:hover': { color: '#4f46e5' } }}>
                      <Briefcase size={18} />
                      <Typography variant="body2">{user.job}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grow>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, py: 12 }}>
            <CircularProgress size={28} sx={{ color: '#4f46e5' }} />
            <Typography sx={{ fontWeight: 600 }}>LOADING...</Typography>
          </Box>
        )}
      </Box>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: { mt: 1, minWidth: 170, borderRadius: 3, boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
              '& .MuiMenuItem-root': { py: 1.2, mx: 0.5, borderRadius: 2, transition: 'all 0.25s ease', '&:hover': { transform: 'translateX(4px)' },},
            },
          },
        }}
      >
        <MenuItem onClick={() => { setInfo(menuUser); setAnchorEl(null) }} sx={{ '&:hover': { color: '#4f46e5', bgcolor: '#eef0ff' } }}>
          <ListItemIcon sx={{ color: 'inherit' }}><InfoIcon size={20} /></ListItemIcon>
          <ListItemText>INFO</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { setEditOpen(menuUser); setAnchorEl(null) }} sx={{ '&:hover': { color: '#d97706', bgcolor: '#fff4e0' } }}>
          <ListItemIcon sx={{ color: 'inherit' }}><Pencil size={20} /></ListItemIcon>
          <ListItemText>EDIT</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { deleteUser(menuUser.id); setAnchorEl(null) }} sx={{ '&:hover': { color: '#dc2626', bgcolor: '#fde8e8' } }}>
          <ListItemIcon sx={{ color: 'inherit' }}><Trash2 size={20} /></ListItemIcon>
          <ListItemText>DELETE</ListItemText>
        </MenuItem>
      </Menu>

      <Info user={info} close={() => setInfo(null)} />
      <Add open={addOpen} close={() => setAddOpen(false)} />
      <Edit user={editOpen} close={() => setEditOpen(null)} />
    </Box>
  )
}