import React from 'react'
import { Avatar, Box, Button, Chip, Drawer, IconButton, Typography } from '@mui/material'
import { keyframes } from '@mui/material/styles'
import { Briefcase, Calendar, Mail, X } from 'lucide-react'

const itemIn = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`

const avatarIn = keyframes`
  0% { opacity: 0; transform: scale(0.5) rotate(-12deg); }
  70% { transform: scale(1.08) rotate(2deg); }
  100% { opacity: 1; transform: scale(1) rotate(0); }
`

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(46, 160, 110, 0.5); }
  70% { box-shadow: 0 0 0 10px rgba(46, 160, 110, 0); }
  100% { box-shadow: 0 0 0 0 rgba(46, 160, 110, 0); }
`

export default function Info({ user, close, }) {
  const rows = [
    { icon: <Calendar size={20} />, label: 'Age', value: user?.age },
    { icon: <Mail size={20} />, label: 'E-mail', value: user?.email },
    { icon: <Briefcase size={20} />, label: 'Job', value: user?.job },
  ]

  return (
    <Drawer anchor="right" open={Boolean(user)} onClose={close} transitionDuration={400} slotProps={{paper: {sx: {width: { xs: '100%', sm: 420 },height: '100vh',borderTopLeftRadius: { sm: 32 },borderBottomLeftRadius: { sm: 32 },overflow: 'hidden',display: 'flex',flexDirection: 'column',},}}}>
      <Box key={user?.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* HEADER */}
        <Box sx={{position: 'relative',display: 'flex',flexDirection: 'column',alignItems: 'center',px: 3,pt: 6,pb: 4,color: '#fff',background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',}}>
          <IconButton onClick={close} sx={{position: 'absolute',top: 16,right: 16,color: '#fff',transition: 'transform 0.3s ease','&:hover': { transform: 'rotate(90deg)', bgcolor: 'rgba(255,255,255,0.2)' },}}><X size={22} /></IconButton>
          <Typography variant="body2" sx={{ position: 'absolute', top: 24, left: 24, fontWeight: 700, opacity: 0.85 }}>INFO USER</Typography>

          <Avatar src={user?.avatar} alt={user?.name} sx={{width: 130, height: 130, mb: 2, border: '4px solid rgba(255,255,255,0.8)', boxShadow: '0 12px 30px rgba(0,0,0,0.25)', animation: `${avatarIn} 0.7s ease both`, animationDelay: '0.2s',}}/>
          <Typography variant="h5" sx={{ fontWeight: 800, animation: `${itemIn} 0.5s ease both`, animationDelay: '0.35s' }}>{user?.name}</Typography>
          <Chip label={user?.status ? 'ACTIVE' : 'INACTIVE'} sx={{ mt: 1.5, fontWeight: 700, bgcolor: user?.status ? '#e6f6ee' : '#eceef3', color: user?.status ? '#1f7a52' : '#6b7280', animation: user?.status ? `${pulse} 2s infinite` : 'none',}}/>
        </Box>

        {/* ROWS */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, p: 3, overflowY: 'auto' }}>
          {rows.map((row, i) => (
            <Box key={row.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 4, bgcolor: '#f7f8fc', transition: 'all 0.3s ease', animation: `${itemIn} 0.5s ease both`, animationDelay: `${0.45 + i * 0.1}s`, '&:hover': { bgcolor: '#eef0ff', transform: 'translateX(-6px)', boxShadow: '0 8px 20px rgba(79, 70, 229, 0.12)' }, '&:hover .row-icon': { bgcolor: '#4f46e5', color: '#fff' },}}>
              <Box className="row-icon" sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',width: 44,height: 44,borderRadius: 3,bgcolor: '#e0e4ff',color: '#4f46e5',transition: 'all 0.3s ease',}}>{row.icon}</Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" color="text.secondary">{row.label}</Typography>
                <Typography sx={{ fontWeight: 700, wordBreak: 'break-word' }}>{row.value}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* FOOTER */}
        <Box sx={{ p: 3, pt: 0 }}>
          <Button onClick={close} fullWidth variant="contained" sx={{ py: 1.4, borderRadius: 3, fontWeight: 700, bgcolor: '#4f46e5', boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#4338ca', transform: 'translateY(-3px)', boxShadow: '0 12px 26px rgba(79, 70, 229, 0.4)' }, '&:active': { transform: 'translateY(0) scale(0.97)' }, }}>CLOSE</Button>
        </Box>
      </Box>
    </Drawer>
  )
}