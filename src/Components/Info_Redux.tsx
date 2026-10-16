import React from 'react';

const InfoRedux = ({ user, close }) => {
    return (
        <dialog className='bg-white border-5 border-black rounded-xl p-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' open={user}>
            <div className='flex flex-col gap-4' key={user?.id}>
                <img className='rounded-full' src={user?.avatar} alt="" />
                <h1 className='text-red-900 text-4xl font-bold'>{user?.name}</h1>
                <h2 className='text-blue-900 text-3xl font-bold'>{user?.job}</h2>
                <h2 className='text-green-900 text-3xl font-bold'>{user?.email}</h2>
                <h2 className='text-yellow-900 text-3xl font-bold'>{user?.age}</h2>
                <h2 className={`text-3xl font-bold ${user?.status ? "text-green-500" : "text-red-500"}`}>{user?.status ? "ACTIVE" : "INACTIVE"}</h2>
                <button className='w-[100px] h-[50px] bg-green-500 rounded-full text-white mx-auto' onClick={close}>Close</button>
            </div> 
        </dialog>
    );
}

export default InfoRedux;
