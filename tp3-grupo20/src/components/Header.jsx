import logoInstitucional from '../assets/logo-fi-unju-institucional.png'
import Nav from './Nav' 

export default function Header() {
  return (
    <header>
      <div className="header-content">
        <img src={logoInstitucional} alt="Logo Institucional FI - UNJu" className="logo"/>
        <Nav/>
      </div>  
    </header>
  );
}
