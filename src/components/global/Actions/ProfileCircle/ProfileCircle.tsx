
import { useSession } from 'next-auth/react';
import styles from './ProfileCircle.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
  
}

const ProfileCircle: React.FC = () => {
  return (
    <div
      className={`m-4 ${styles.profile}`}
    >
    </div>
  );
};

export default ProfileCircle;
