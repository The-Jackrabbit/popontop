import { useState } from "react";

export const generateFakeList = () => {
  const ar = [];
  for (let i = 0 ; i < 50 ;i++) {
    ar.push({

    })
  }

  return ar;
}

const List: React.FC = () => {

  const [list,] = useState(generateFakeList());

  return (
    <div className="overflow-y-scroll h-screen">
      {list.map((args, index) => (
        <div key={index} className="mb-4 w-screen h-12 dark:bg-neutral-300">

        </div>
      ))}
    </div>
  );
};

export default List;
