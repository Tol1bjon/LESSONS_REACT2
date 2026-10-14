import React from 'react'
import { useForm } from 'react-hook-form'
import { useData } from '../Store/Zustand'
import { Box, Button, Dialog, IconButton, InputAdornment, Slide, TextField, Typography } from '@mui/material'
import { keyframes } from '@mui/material/styles'
import { Activity, Briefcase, Calendar, Image as ImageIcon, Mail, User, UserPlus, X } from 'lucide-react'

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />
})

const fieldIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`

const fieldSx = (i: number) => ({
  animation: `${fieldIn} 0.5s ease both`,
  animationDelay: `${0.15 + i * 0.07}s`,
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    bgcolor: '#f7f8fc',
    transition: 'all 0.3s ease',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover': { bgcolor: '#eef0ff' },
    '&.Mui-focused': { bgcolor: '#fff', transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(79, 70, 229, 0.18)' },
    '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
  },
  '& .MuiInputAdornment-root svg': { transition: 'color 0.3s ease' },
  '& .Mui-focused .MuiInputAdornment-root svg': { color: '#4f46e5' },
})

export default function Add({ open, close }: any) {
  const postUser = useData((state: any) => state.postUser)
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm()

  const onSubmit = async(info: any) => {
    await postUser(info)
    reset()
    close()
  }

  return (
    <Dialog open={open} onClose={close} slots={{ transition: Transition }} slotProps={{ paper: { sx: { borderRadius: 5, width: '100%', maxWidth: 440, m: 2, overflow: 'hidden' } } }}>
      {/* HEADER */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 2.5, color: '#fff', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', }}>
        <UserPlus size={26} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Add user</Typography>
        <IconButton onClick={close} sx={{ position: 'absolute', right: 12, color: '#fff', transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(90deg)', bgcolor: 'rgba(255,255,255,0.2)' } }}><X size={20} /></IconButton>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
          <TextField placeholder="Avatar" error={!!errors.avatar} sx={fieldSx(0)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><ImageIcon size={18} /></InputAdornment> },
              htmlInput: { ...register("avatar", { required: true }) },}}/>

          <TextField placeholder="Name" error={!!errors.name} sx={fieldSx(1)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><User size={18} /></InputAdornment> },
              htmlInput: { ...register("name", { required: true }) },}}/>

          <TextField type="number" placeholder="Age" error={!!errors.age} sx={fieldSx(2)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><Calendar size={18} /></InputAdornment> },
              htmlInput: { ...register("age", { required: true }) },}}/>

          <TextField type="email" placeholder="E-mail" error={!!errors.email} sx={fieldSx(3)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><Mail size={18} /></InputAdornment> },
              htmlInput: { ...register("email", { required: true }) },}}/>

          <TextField placeholder="Job" error={!!errors.job} sx={fieldSx(4)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><Briefcase size={18} /></InputAdornment> },
              htmlInput: { ...register("job", { required: true }) },}}/>
              
          <TextField select defaultValue="true" sx={fieldSx(5)}
            slotProps={{
              select: { native: true },
              input: { startAdornment: <InputAdornment position="start"><Activity size={18} /></InputAdornment> },
              htmlInput: { ...register("status", { setValueAs: (value) => value === 'true' }) },}}>
            <option value="true">ACTIVE</option>
            <option value="false">INACTIVE</option>
          </TextField>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 1, animation: `${fieldIn} 0.5s ease both`, animationDelay: '0.6s' }}>
            <Button onClick={close} type='button' fullWidth sx={{ py: 1.3, borderRadius: 3, fontWeight: 700, color: '#6b7280', bgcolor: '#f1f2f6', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#e5e7ee', transform: 'translateY(-2px)' }, '&:active': { transform: 'scale(0.97)' },}}>CANCEL</Button>
            <Button type='submit' variant="contained" fullWidth sx={{ py: 1.3, borderRadius: 3, fontWeight: 700, bgcolor: '#4f46e5', boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#4338ca', transform: 'translateY(-3px)', boxShadow: '0 12px 26px rgba(79, 70, 229, 0.4)' }, '&:active': { transform: 'translateY(0) scale(0.97)' },}}>ADD</Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  )
}