import { prisma } from "@/lib/prisma";
import Destinations from "./Destinations";
import Skeleton from "@/components/ui/Skeleton";
import { Suspense } from "react";

async function DestinationsData() {
  const destinations = await prisma.destination.findMany({
    take: 6,
    orderBy: { order: "asc" },
  });

  // Format highlights to ensure they are tags/strings
  const formattedDestinations = destinations.map((d) => ({
    ...d,
    highlights: d.highlights || [],
  }));

  return <Destinations destinations={formattedDestinations} />;
}

function DestinationsLoading() {
  return (
    <section className="section-padding bg-[#FFF8F0]">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-16">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DestinationsWrapper() {
  return (
    <Suspense fallback={<DestinationsLoading />}>
      <DestinationsData />
    </Suspense>
  );
}
