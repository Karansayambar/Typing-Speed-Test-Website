import  Select  from 'react-select'
import {ThemeOptions} from '../Utils/ThemeOptions';
import { useTheme } from '../Context/ThemeContext';

const Footer = () => {
    const {setTheme, theme} = useTheme();

    const handleChange = (e) => {
        setTheme(e.value);
        localStorage.setItem("theme", JSON.stringify(e.value));
    }
  return (
    <div className='footer'>
        <div className='links'>
            <p>links</p>
        </div>
        <div className='theme-button'>
            <Select
             onChange = {handleChange}
             options={ThemeOptions}
             menuPlacement = "top"
             defaultValue={{label : theme.label, value : theme}}
            />
        </div>
    </div>
  )
}

export default Footer