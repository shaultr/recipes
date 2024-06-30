import Styles from './style.module.scss'

export const Popup = ({setPopup , children}) => {
   
    return (
        <div className={Styles.Container} onClick={()=>setPopup(false)} >
            <div className={Styles.popupContent} onClick={(e) => e.stopPropagation()}>
               {children}
            </div>
        </div>
    )
}