import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRedux, getUsers } from './Store/Redux'
import InfoRedux from './Components/Info_Redux'
import AddRedux from './Components/Add_Redux'
import EditRedux from './Components/Edit_Redux'

export default function App() {
  const dispatch = useDispatch()
  const [infoOpen, setInfoOpen] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(null)
  const { user, loading, error, } = useSelector((state: any) => state.data)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div className='flex flex-col gap-[50px] mt-20'>
      <button onClick={() => setAddOpen(true)} className='w-[100px] h-[50px] bg-green-500 rounded-full text-white'>Add</button>
      {user.map((item) => (
        <div key={item.id} className='flex flex-col gap-[50px] bg-gray-400 rounded-full p-10 w-[500px] mx-auto text-center'>
          <img className='rounded-full' src={item.avatar} alt="" />
          <h1 className='text-red-900 text-4xl font-bold'>{item.name}</h1>
          <h2 className='text-blue-900 text-3xl font-bold'>{item.job}</h2>
          <h2 className='text-green-900 text-3xl font-bold'>{item.email}</h2>
          <h2 className='text-yellow-900 text-3xl font-bold'>{item.age}</h2>
          <h2 className={`text-3xl fon  t-bold ${item.status ? "text-green-500" : "text-red-500"}`}>{item.status ? "ACTIVE" : "INACTIVE"}</h2>
          <div className='flex justify-around'>
            <button className='w-[100px] h-[50px] bg-red-500 rounded-full text-white' onClick={() => dispatch(deleteRedux(item.id))}>Delete</button>
            <button className='w-[100px] h-[50px] bg-green-500 rounded-full text-white' onClick={() => setEditOpen(item)}>Update</button>
            <button className='w-[100px] h-[50px] bg-blue-500 rounded-full text-white' onClick={() => setInfoOpen(item)}>View</button>
          </div>
        </div>
      ))}

      <InfoRedux user={infoOpen} close={() => setInfoOpen(null)}/>
      <AddRedux open={addOpen} close={() => setAddOpen(false)} />
      <EditRedux user={editOpen} close={() => setEditOpen(null)}/>
    </div>
  )
}