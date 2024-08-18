import { GameList } from '@/components/game-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function page() {
  return (
    <div className="mt-10 space-y-6 p-4 md:p-8">
      <h1 className="mb-20 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Price prediction service from 'Wise and Weird' people.
      </h1>
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="flex justify-start rounded-lg bg-transparent p-2">
          <TabsTrigger
            value="all"
            className="px-4 py-2 text-center text-lg font-extrabold aria-selected:text-black"
          >
            ALL EVENTS
          </TabsTrigger>
          <TabsTrigger
            value="tge"
            className="px-4 py-2 text-center text-lg font-extrabold aria-selected:text-black"
          >
            TGE
          </TabsTrigger>
          <TabsTrigger
            value="hardfork"
            className="px-4 py-2 text-center text-lg font-extrabold aria-selected:text-black"
          >
            Lisiting
          </TabsTrigger>
          <TabsTrigger
            value="rebranding"
            className="px-4 py-2 text-center text-lg font-extrabold aria-selected:text-black"
          >
            REBRANDING
          </TabsTrigger>
          <TabsTrigger
            value="ama"
            className="px-4 py-2 text-center text-lg font-extrabold aria-selected:text-black"
          >
            AMA
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <GameList />
        </TabsContent>
        <TabsContent value="tge" className="space-y-4">
          <GameList />
        </TabsContent>
        <TabsContent value="hardfork" className="space-y-4">
          <GameList />
        </TabsContent>
        <TabsContent value="rebranding" className="space-y-4">
          <GameList />
        </TabsContent>
        <TabsContent value="ama" className="space-y-4">
          <GameList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
