import { GameList } from '@/components/game-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function page() {
  return (
    <div className="mt-10 space-y-6 p-4 md:p-8">
      <h1 className="mb-20 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Price prediction service from 'Wise and Weird' people.
      </h1>
      <div className="">
        <GameList/>
      </div>
    </div>
  );
}
