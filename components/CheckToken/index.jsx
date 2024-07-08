"use client"
import React, { useEffect } from 'react'
import { deleteCookie, getCookies, hasCookie } from 'cookies-next';
import { useUserStore } from '@/store/storeUser';


export default function CheckToken() {
    const setIsLoggedIn = useUserStore((state) => state.setUser);


    const getAuthStatus = async () => {
        if (!hasCookie('name')) return
        if (!hasCookie('avatar')) return
        let { name, avatar } = getCookies();
        name = decodeURIComponent(name);
        avatar = decodeURIComponent(avatar);
        try {
            const response = await fetch('/api/user', { method: "POST" })
            const { _id } = await response?.json();
            _id && setIsLoggedIn({ userlogged: { name, avatar } });
        } catch (error) {
            console.log(error);
            deleteCookie('name')
            deleteCookie('avatar')
            console.error("Fetch error:", error);
        }

    };
    useEffect(() => {
        getAuthStatus();
    }, []);
  return (
   <></>
  )
}
