import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import EditChart from '../../components/global/Desktop/EditChart';

const Uuid: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  if (typeof uuid !== 'string') return null;

  return <EditChart uuid={uuid as string} />;
};

export default Uuid;
