import { GameList } from '@/components/game-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function page() {
  return (
    // 상단에 패딩 10(px 단위 아님) → mt-10과 유사
    <div className="border-white bg-transparent text-black">
      <h2 className="scroll-m-20 pt-10 text-center text-4xl font-bold tracking-tight lg:text-3xl">
        Future Scroll
      </h2>
      <h1 className="mb-20 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Get started with scroll!
      </h1>
      <div>
        <GameList />
      </div>
    </div>
  );
}
