import { prisma } from "@/lib/prisma";
import Stats from "./Stats";
import Skeleton from "@/components/ui/Skeleton";
import { Suspense } from "react";

async function StatsData() {
  const stats = await prisma.stat.findMany({
    where: { category: "general" },
    orderBy: { order: "asc" },
  });
  return <Stats statsData={stats} />;
}

function StatsLoading() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-16">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StatsWrapper() {
  return (
    <Suspense fallback={<StatsLoading />}>
      <StatsData />
    </Suspense>
  );
}
