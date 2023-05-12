import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ScreenShot from '../../../components/global/ScreenShot';

const Uuid: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  if (typeof uuid !== 'string') return null;

  return <ScreenShot uuid={uuid as string} />;
};

export default Uuid;
