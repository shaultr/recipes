"use client"
import React, { useContext, useState } from 'react';
import styles from './style.module.scss';
import { IoIosSettings } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useUserStore } from '@/store/storeUser';


const Setting = ({settings}) => { 
const setIsLoggedIn = useUserStore((state) => state.setUser);


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.settingContainer}>
     {isOpen ? <IoClose  className={styles.settingIcon} onClick={toggleDropdown} /> :
     <IoIosSettings  className={styles.settingIcon} onClick={toggleDropdown}/> 
     }
      {isOpen && (
        <div className={styles.dropdown}>
          <ul>            
          {settings.map((setting, index) => (
            <li key={index} onClick={()=> setting.action(setIsLoggedIn)}>{setting.title}</li>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Setting;
