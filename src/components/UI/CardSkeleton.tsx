import { Card as NextUiCard, CardHeader, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const CardSkeleton = () => {
  return (
    <NextUiCard isFooterBlurred className="h-[300px] w-full">
      <Skeleton className="rounded-lg">
        <div className="h-60 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="flex items-center justify-between p-2">
        <div className="w-3/4">
          <Skeleton className="my-2 w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="w-1/4">
          <Skeleton className="my-2 w-full rounded-full">
            <div className="h-8 w-full rounded-full bg-default-200"></div>
          </Skeleton>
        </div>
      </div>
    </NextUiCard>
  );
};

export default CardSkeleton;
