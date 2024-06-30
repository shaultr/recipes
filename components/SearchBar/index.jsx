"use client"
import { useRouter } from 'next/navigation';
import styles from './style.module.scss';

export const SearchBar = ({ val }) => {

    const router = useRouter()

    const handleSearch = e => {
        if (e.target.value) {
            router.push(`/result?search=${e.target.value}`)
        } else {
            router.push('/')
        }
    }
    return (
        <div className={styles.search}>
            <div className={styles.container}>
                <input
                    className={styles.formInput}
                    type="text"
                    placeholder="חפש מתכונים"
                    name="search"
                    value={val || ''}
                    autoFocus
                    autoComplete="off"
                    onChange={handleSearch}
                />
                <img
                    src="https://www.10dakot.co.il/wp-content/themes/10dakot/assets/img/search.png"
                    alt="Search"
                    className={styles.img}
                />
            </div>
        </div>
    );
};
