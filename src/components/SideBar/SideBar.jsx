import React from 'react';
import NavItem from '../NavItem/NavItem';
import './SideBar.css';

const SideBar = (props) => {
  const handleNavigation = (selectedItem) => () => props.onNav(selectedItem);

  return (
    <div className="Sidebar">
      {props.items.map(item => (
        <NavItem
          key={item.title}
          title={item.title}
          vertical
          selected={item.id === props.selected}
          onNav={handleNavigation(item.id)}
        />
      ))}
    </div>
  );
};

export default SideBar;