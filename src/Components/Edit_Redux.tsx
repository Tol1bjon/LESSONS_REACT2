import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Schemas } from '../Schemas/Schemas';
import { useDispatch } from 'react-redux';
import { editUserRedux } from '../Store/Redux';

const EditRedux = ({ user, close }) => {
    const dispatch = useDispatch()

    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(Schemas),
        defaultValues: {
            name: user?.name,
            job: user?.job,
            email: user?.email,
            age: user?.age,
            avatar: user?.avatar,
            status: user?.status,
        }
    })

    const Onsubmit = (data:any) => {
        dispatch(editUserRedux({ id: user?.id, user: data }))
        reset()
        close()
    }

    useEffect(() => {
        reset(user)
    }, [user])

    return (
        <dialog className='bg-white border-5 border-black rounded-xl p-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' open={user}>
            <form onSubmit={handleSubmit(Onsubmit)}>
                <h1 className='text-2xl font-bold text-black'>EDIT USER</h1>
                <input {...register("name")} type="text" placeholder='Name' className='w-[250px] h-[50px] bg-gray-200 rounded-full text-black mt-5 px-5' />
                <input {...register("job")} type="text" placeholder='Job' className='w-[250px] h-[50px] bg-gray-200 rounded-full text-black mt-5 px-5' />
                <input {...register("email")} type="text" placeholder='Email' className='w-[250px] h-[50px] bg-gray-200 rounded-full text-black mt-5 px-5' />
                <input {...register("age")} type="text" placeholder='Age' className='w-[250px] h-[50px] bg-gray-200 rounded-full text-black mt-5 px-5' />
                <input {...register("avatar")} type="text" placeholder='Avatar' className='w-[250px] h-[50px] bg-gray-200 rounded-full text-black mt-5 px-5' />
                <select {...register("status", { setValueAs: (v) => v === "true" })} className='w-[250px] h-[50px] bg-gray-200 rounded-full text-black mt-5 px-5'>
                    <option value={"true"}>Active</option>
                    <option value={"false"}>Inactive</option>
                </select>
                <div className='flex justify-end gap-10 mt-5'>
                    <button type='button' onClick={close} className='w-[100px] h-[50px] bg-red-500 rounded-full text-white'>Close</button>
                    <button className='w-[100px] h-[50px] bg-green-500 rounded-full text-white' type='submit'>Add</button>
                </div>
            </form>
        </dialog>
    );
}

export default EditRedux;
