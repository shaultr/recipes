"use client"
import styles from './style.module.scss'
import Logged from '../Logged';
import Guest from '../guest';
import CheckToken from '@/components/CheckToken';
import { useUserStore } from '@/store/storeUser';


 const AuthStatus = () => {
    const isLoggedIn = useUserStore((state) => state.user);

    return (
        <>
        <CheckToken />
        <div className={styles.login}>
            {isLoggedIn ? <Logged /> : <Guest />}
        </div>
        </>

);

}
export default AuthStatus;