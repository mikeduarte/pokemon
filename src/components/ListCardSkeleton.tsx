import VerticalCardSkeleton from './VerticalCardSkeleton';
import HorizontalCardSkeleton from './HorizontalCardSkeleton';

type ListCardSkeletonProps = {
  count: number;
  isGridView: boolean;
};

const ListCardSkeleton = ({ count, isGridView }: ListCardSkeletonProps) => {
  if (isGridView) return <VerticalCardSkeleton count={count} />;

  return <HorizontalCardSkeleton count={count} />;
};

export default ListCardSkeleton;
