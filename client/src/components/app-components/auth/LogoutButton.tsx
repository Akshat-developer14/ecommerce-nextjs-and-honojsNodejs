"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();



  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/logout`,
        { withCredentials: true }
      );
      if(response.status === 200){
        dispatch(logout())
      toast({
        description: "Logout successful.",
      })
    } else {
      toast({
        variant: "destructive",
        description: "Logout unsuccessful.",
      })
    }
    } catch (error: any) {
      console.log(error.message);
      toast({
        variant: "destructive",
        description: "Logout unsuccessful.",
      })
    }
    
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
