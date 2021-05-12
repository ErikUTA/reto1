import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import Counter from '../counter/Counter';
import { excercisesEnum } from '../../components/constantes/constantes';
import './Excercises.css';

const items = [
  { title: 'Counter', id: excercisesEnum.COUNTER },
  { title: 'Task list', id: excercisesEnum.TASK_LIST },
];

const Excercises = () => {
  const [actualExercise, setActualExercise] = useState(excercisesEnum.COUNTER);

  const handleChangeExcercise = (newExcercise) => {
    setActualExercise(newExcercise);
  };

  let content = null;
  switch (actualExercise) {
    case excercisesEnum.COUNTER:
      content = (
        <Counter maxValue={15}>
          <span>Hey you!</span>
        </Counter>
      )
      break;
    default:
      content = null;
}

return (
    <div className="Excercises">
      <SideBar
        items={items}
        selected={actualExercise}
        onNav={handleChangeExcercise}
      />

      <main>
        {content}
      </main>
    </div>
  );
};

export default Excercises;