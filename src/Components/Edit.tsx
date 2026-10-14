import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useData } from '../Store/Zustand'
import { Box, Button, Dialog, IconButton, InputAdornment, Slide, TextField, Typography } from '@mui/material'
import { keyframes } from '@mui/material/styles'
import { Activity, Briefcase, Calendar, Image as ImageIcon, Mail, Pencil, User, X } from 'lucide-react'

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
    '&:hover': { bgcolor: '#fff4e0' },
    '&.Mui-focused': { bgcolor: '#fff', transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(217, 119, 6, 0.18)' },
    '&.Mui-focused fieldset': { borderColor: '#d97706' },
  },
  '& .MuiInputAdornment-root svg': { transition: 'color 0.3s ease' },
  '& .Mui-focused .MuiInputAdornment-root svg': { color: '#d97706' },
})

export default function Edit({ user, close }) {
  const editUser = useData((state) => state.putUser)

  const {
      register,
      watch,
      reset,
      handleSubmit,
      formState: {errors}
    } = useForm()

    const onSubmit = async(values: any) => {
      await editUser(user.id, values)
      close()
    }

    useEffect(() => {
      if (user) {
        reset(user)
      }
    }, [user, reset])

  return (
    <Dialog open={user} onClose={close} slots={{ transition: Transition }} slotProps={{ paper: { sx: { borderRadius: 5, width: '100%', maxWidth: 440, m: 2, overflow: 'hidden' } } }}>
      {/* HEADER */}
      <Box
        sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 2.5, color: '#fff', background: 'linear-gradient(135deg, #f59e0b, #d97706)',}}>
        <Pencil size={24} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Edit user</Typography>
        <IconButton onClick={close} sx={{ position: 'absolute', right: 12, color: '#fff', transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(90deg)', bgcolor: 'rgba(255,255,255,0.2)' } }}>
          <X size={20} />
        </IconButton>
      </Box>

      <form key={user?.id} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
          <TextField defaultValue={user?.avatar} placeholder="Image" sx={fieldSx(0)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><ImageIcon size={18} /></InputAdornment> },
              htmlInput: { ...register("avatar") },}}/>

          <TextField defaultValue={user?.name} placeholder="Name" sx={fieldSx(1)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><User size={18} /></InputAdornment> },
              htmlInput: { ...register("name") },}}/>

          <TextField defaultValue={user?.age} type="number" placeholder="Age" sx={fieldSx(2)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><Calendar size={18} /></InputAdornment> },
              htmlInput: { ...register("age") },}}/>

          <TextField defaultValue={user?.email} type="email" placeholder="E-mail" sx={fieldSx(3)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><Mail size={18} /></InputAdornment> },
              htmlInput: { ...register("email") },}}/>

          <TextField defaultValue={user?.job} placeholder="Job" sx={fieldSx(4)} slotProps={{
              input: { startAdornment: <InputAdornment position="start"><Briefcase size={18} /></InputAdornment> },
              htmlInput: { ...register("job") },}}/>

          <TextField select defaultValue={user?.status} sx={fieldSx(5)} slotProps={{
              select: { native: true },
              input: { startAdornment: <InputAdornment position="start"><Activity size={18} /></InputAdornment> },
              htmlInput: { ...register("status", { setValueAs: (value) => value === 'true' }) },}}>
            <option value="true">ACTIVE</option>
            <option value="false">INACTIVE</option>
          </TextField>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 1, animation: `${fieldIn} 0.5s ease both`, animationDelay: '0.6s' }}>
            <Button onClick={close} type='button' fullWidth sx={{ py: 1.3, borderRadius: 3, fontWeight: 700, color: '#6b7280', bgcolor: '#f1f2f6', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#e5e7ee', transform: 'translateY(-2px)' }, '&:active': { transform: 'scale(0.97)' }, }}>CANCEL </Button>
            <Button type='submit' variant="contained" fullWidth sx={{ py: 1.3, borderRadius: 3, fontWeight: 700, bgcolor: '#d97706', boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)', transition: 'all 0.3s ease','&:hover': { bgcolor: '#b45309', transform: 'translateY(-3px)', boxShadow: '0 12px 26px rgba(217, 119, 6, 0.4)' },'&:active': { transform: 'translateY(0) scale(0.97)' },}}>SAVE</Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  )
}