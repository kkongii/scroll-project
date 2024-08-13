import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { Badge } from '@/components/ui/badge';

export default function page() {
  return (
    <div className="mt-10 space-y-6 p-4 md:p-8">
      <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
        Price prediction service from 'Wise and Weird' people.
      </h1>

      <div className="flex space-x-6">
        <Badge className="text-sm">~ 24.08.30</Badge>
        <Badge className="text-sm">AMA</Badge>
        <Badge className="text-sm">BNB</Badge>
      </div>

      <div className="flex space-x-8">
        <div className="w-2/3 space-y-20">
          <GameDetail />
          <GameDetailComment />
        </div>

        <div className="w-1/3 space-y-4">
          <GameDetailVote />
        </div>
      </div>
    </div>
  );
}
