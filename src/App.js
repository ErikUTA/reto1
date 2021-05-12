import React, { useState } from 'react';
import Header from './components/Header/Header';
import Landing from './components/about/about';
import { viewsEnum } from './components/constantes/constantes';
import './App.css';
import Excercises from './components/Excercises/Excercises';

function App() {
  const [view, setView] = useState(viewsEnum.LANDING);

  const handleNavigation = (newView) => {
    setView(newView);
  }

  let content = null;

  switch (view) {
    case viewsEnum.EXCERCISES:
      content = <Excercises />;
      break;
    case viewsEnum.LANDING:
    default:
      content = <Landing />;
  }

  return (
    <div>
      <Header view={view} onNav={handleNavigation} />

      {content}
    </div>
  );
}

export default App;