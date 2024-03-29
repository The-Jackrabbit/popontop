import { Loader as ListItemLoader } from '../../../lib/Mobile/ListRow/Loader';

export const Loader = () => (
  <div className="mt-4">
    {[...new Array(10)].map((_, index) => (
      <ListItemLoader key={`${index}-list-item-loader`} index={index} />
    ))}
  </div>
);

export default Loader;
