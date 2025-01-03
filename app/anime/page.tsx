import AnimeCarousel from "@/components/carousel/anime";
import FeaturedAnime from "@/components/featured/anime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <AnimeCarousel/>
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 pb-4">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="trending">
            <div className="flex items-center justify-between gap-2 py-4 pb-4">
              <div>
                <h1 className="md:text-4xl font-mono text-2xl font-bold leading-tight tracking-tighter">Trending Anime</h1>
                <p className="text-muted-foreground">Anime ordered by trending.</p>
              </div>
            </div>
            <FeaturedAnime featureType="trending"/>
            {/* FeaturedANime */}
          </TabsContent>
          <TabsContent value="popular">
            <div className="flex items-center justify-between gap-2 py-4 pb-4">
              <div>
                <h1 className="md:text-4xl font-mono text-2xl font-bold leading-tight tracking-tighter">Popular Anime</h1>
                <p className="text-muted-foreground">Anime that are all-time popular.</p>
              </div>
            </div>
            <FeaturedAnime featureType="popular"/>
            {/* FeaturedANime */}
          </TabsContent>
          <TabsContent value="recent">
            <div className="flex items-center justify-between gap-2 py-4 pb-4">
              <div>
                <h1 className="md:text-4xl font-mon text-2xl font-bold leading-tight tracking-tighter">Recent Episodes</h1>
                <p className="text-muted-foreground">Episodes released recently.</p>
              </div>
            </div>
            <FeaturedAnime featureType="recent"/>
            {/* FeaturedANime */}
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
