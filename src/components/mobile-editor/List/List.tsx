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
    <div >
      {list.map((args, index) => (
        <div key={index} className="mb-4 w-screen h-12 bg-green-300">

        </div>
      ))}
    </div>
  );
};

export default List;
