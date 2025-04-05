import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
const Profile = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

  return (
    <div>
    <section className={'z-50- flex items-center sticky top-0 bg-opacity-95'}>
        <KeyboardBackspaceIcon className='cursor-pointer' onclick={handleBack}/>
        <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Profile</h1>
    </section>
    <section className='pl-6'>
        <div className='flex justfy-between items-start mt-5 h-[5rem]'>
            <Avatar alt='code with jahan' className='trasnform translate-y-24'
            src='https://images.unsplash.com/photo-1633657921013-2e5f3f8a8b7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
            />
        </div>
    </section>
      
    </div>
  )
}
export default Profile
