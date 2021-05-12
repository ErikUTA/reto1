import React from 'react';
import NavItem from '../NavItem/NavItem';
import { viewsEnum } from '../../../src/components/constantes/constantes';
import './Header.css';

const items = [
  { title: 'Home', id: viewsEnum.LANDING },
  { title: 'Exercises', id: viewsEnum.EXCERCISES },
];

const Header = (props) => {
  const handleNavigation = (newView) => () => {
    if (newView !== props.view) {
      props.onNav(newView);
    }
  };

  return (
    <header className="Header">
      <div className="Header-logo">
        <img src="https://raw.githubusercontent.com/FraGa96/bootcamp/reto-semana-2/src/assets/images/arkus_logo.png" />
      </div>

      {items.map(item => (
        <NavItem
          key={item.title}
          selected={props.view === item.id}
          onNav={handleNavigation(item.id)}
          title={item.title}
        />
      ))}
    </header>
  );
};

export default Header;