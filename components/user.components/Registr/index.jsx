'use client'
import { useFormState } from 'react-dom'
import { useState } from "react";
import styles from './style.module.scss';
import { CiUser } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { TbPassword } from "react-icons/tb";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { createUserAction } from "@/server/DB/actions/user.action";

export default function Registr({setIsConnect, setUser}) {

  const [isVisible, setIsVisible] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [state, formAction] = useFormState(createUserAction, undefined)


  const handleUserDetailsChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  

  {state?.success !== undefined  && (setIsConnect(true),setUser(userDetails))}


  const formFields = [
    { name: "userName", placeholder: "* שם משתמש", type: "text", icon: <CiUser />, required: true },
    { name: "email", placeholder: "* מייל", type: "email", icon: <HiOutlineMail />, required: true },
    { name: "password", placeholder: "* סיסמא", type: isVisible ? "text" : "password", icon: <TbPassword />, required: true },
    { name: "avatar", placeholder: "* תמונת פרופיל", type: "file", icon: <FaUserCircle />, required: false }
  ];


  return (
    <>
      <form action={formAction} className={styles.container} >
        {formFields.map((field, index) => (
          <div className={`${styles.imputContainer} ${field.type == "file" && styles.fileUpload}`} key={index}>
            <span className={styles.icon}>{field.icon}</span>
            <input
              type={field.type}
              className={styles.input}
              placeholder={field.placeholder}
              name={field.name}
              required={field.required}
              onChange={handleUserDetailsChange}
            />
            {field.name === "password" &&
              <span onClick={() => setIsVisible(old => !old)}>
                {isVisible ? <FiEyeOff /> : <FiEye />}
              </span>
            }
          </div>
        ))}
        <input className={styles.btn} type="submit" value="הרשמה" />
        <p className={styles.error}>{state?.error}</p>
      </form>
    </>
  );
}