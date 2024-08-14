import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { Badge } from '@/components/ui/badge';

export default function page() {
  return (
    <div className="mt-10 space-y-6 p-4 md:p-8 overflow-y-auto">
      <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
        BNB Price Up and Down
      </h1>

      <div className="flex space-x-6">
        <Badge className="text-xs bg-[#575757] text-F7F8F8 rounded-3xl p-1.5 px-5">~ 24.08.30</Badge>
        <Badge className="text-xs bg-[#575757] text-F7F8F8 rounded-3xl p-1.5 px-5">AMA</Badge>
        <Badge className="text-xs bg-[#575757] text-F7F8F8 rounded-3xl p-1.5 px-5">BNB</Badge>
      </div>

      <div className="flex space-x-8 h-full">
        <div className="w-2/3 space-y-20 h-full overflow-y-auto pr-2">
          <GameDetail />
          <GameDetailComment />
        </div>

        <div className="w-1/3 space-y-4 h-full overflow-y-auto pl-2">
          <GameDetailVote />
        </div>
      </div>
    </div>
  );
}
