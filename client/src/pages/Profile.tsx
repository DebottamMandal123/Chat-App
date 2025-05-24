import React, { useState } from 'react';
import { CameraIcon, UserIcon, MailIcon } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import moment from "moment"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Profile: React.FC = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUploadProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      setSelectedImage(reader.result as string);
    }

    const profilePic = new FormData();
    profilePic.append('profilePic', file);

    try {
      await updateProfile(profilePic);
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
    }
  }

  return (
    <div className='relative h-screen w-screen overflow-hidden text-white'>
      <div className='absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900'></div>
      <div className='absolute top-10 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl'></div>
      <div className='absolute bottom-10 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl'></div>
      <div className='relative z-10 flex justify-center items-center h-full'>
        <div className='w-full max-w-md bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl shadow-2xl'>
          <h2 className='text-3xl text-center font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent'>Profile</h2>
          <p className='text-sm text-center text-gray-400 mb-8'>Your profile information</p>
          <div className='relative w-32 h-32 mx-auto mb-6'>
            <img
              src={selectedImage || authUser?.profilePic || '/avatar.png'}
              alt='Profile'
              className='w-32 h-32 rounded-full border-4 border-gray-700 object-cover shadow-lg'
            />
            <div className='absolute -bottom-1 -right-1 p-2 bg-gray-800 rounded-full border-2 border-gray-600 shadow-lg'>
              <label className='cursor-pointer' htmlFor='avatar-upload'>
                <CameraIcon className={`w-5 h-5 text-yellow-400 ${isUpdatingProfile ? 'animate-pulse' : ''} hover:text-yellow-300 transition-colors`} />
              </label>
              <Input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleUploadProfile}
                disabled={isUpdatingProfile}
              />
            </div>
          </div>
          <p className='text-sm text-center text-gray-400 mb-8'>
            {isUpdatingProfile ? 'Uploading ...' : '✨ Click camera to update photo'}
          </p>
          <div className='space-y-4'>
            <div className='relative'>
              <UserIcon className='absolute left-3 top-2.5 w-4 h-4 text-gray-400' />
              <Input
                type='text'
                defaultValue={`${authUser?.fullName}`}
                disabled
                className='w-full pl-10 pr-3 py-2 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-not-allowed'
              />
            </div>
            <div className='relative'>
              <MailIcon className='absolute left-3 top-2.5 w-4 h-4 text-gray-400' />
              <Input
                type='email'
                defaultValue={`${authUser?.email}`}
                disabled
                className='w-full pl-10 pr-3 py-2 bg-gray-800 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-not-allowed'
              />
            </div>
          </div>
          <div className='mt-8'>
            <h3 className='text-md font-semibold mb-2'>Account Information</h3>
            <div className='flex justify-between text-sm text-gray-400'>
              <span>Member Since</span>
              <span>{moment(authUser?.createdAt).format("MMMM Do, YYYY")}</span>
            </div>
            <div className='flex justify-between text-sm text-gray-400 mt-2'>
              <span>Account Status</span>
              <span className='text-green-500'>Active</span>
            </div>
          </div>
          <Button className='w-full mt-6 bg-gradient-to-br from-gray-800 to-gray-600 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-500 active:bg-gradient-to-br active:from-gray-800 active:to-gray-700' onClick={() => window.location.href = '/'}>Go back</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;