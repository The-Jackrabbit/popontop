export interface Props {
  children: React.ReactNode;
}

const ButtonAccessory: React.FC<Props> = ({ children }) => {
  return (
    <div className="absolute -translate-x-[7.5rem]">
      <div
        // Bubble content
        className="
          dark:bg-white bg-black
          dark:text-neutral-800 text-neutral-50
          pl-4 pr-4 py-2 
          rounded-xl
          shadow-lg
        "
      >
        {children}   
      </div>
      <div
        // Caret
        className="
          translate-x-[6.2rem]
          -translate-y-[150%]
          bg-black dark:bg-white
          h-3 w-3
          py-2 rotate-45
        "
      />
    </div>
  );
}

export default ButtonAccessory;
