import { Loader as ListItemLoader } from '../../../lib/Mobile/ListRow/Loader';

export const Loader = () => (
  <div>
    {[...new Array(10)].map((_, index) => (
      <ListItemLoader key={`${index}-list-item-loader`} index={index} />
    ))}
  </div>
);

export default Loader;
