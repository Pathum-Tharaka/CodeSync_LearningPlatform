import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

  return (
    <div>
    <section className={'z-50- flex items-center sticky top-0 bg-opacity-95'}>
        <KeyboardBackspaceIcon className='text-white cursor-pointer' fontSize='large'/>
        <h1 className='text-white text-2xl font-bold'>Profile</h1>
    </section>
      
    </div>
  )
}
export default Profile
