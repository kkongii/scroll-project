import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { Badge } from '@/components/ui/badge';

export default function page() {
  return (
    <div className="mt-10 space-y-6 overflow-y-auto p-4 md:p-8">
      <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight text-black lg:text-3xl">
        Scroll Price Up and Down
      </h1>

      <div className="flex space-x-6">
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          ~ 24.08.30
        </Badge>
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          AMA
        </Badge>
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          Scroll
        </Badge>
      </div>

      <div className="flex h-full space-x-8">
        <div className="h-full w-2/3 space-y-20 overflow-y-auto pr-2">
          <GameDetail />
          <GameDetailComment />
        </div>

        <div className="h-full w-1/3 space-y-4 overflow-y-auto pl-2">
          <GameDetailVote />
        </div>
      </div>
    </div>
  );
}
