import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

export interface Props {
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ children }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const modalRootElement = document.getElementById('modal-root');
    const c = document.createElement('div');
    setContainer(c);
    modalRootElement?.appendChild(c);

    // return () => {
    // modalRootElement?.removeChild(modalRootElement);
    // };
  }, []);

  return container !== null ? ReactDOM.createPortal(children, container) : null;
};

export default Modal;
