import { prisma } from "@/lib/prisma";
import Specialties from "./Specialties";
import Skeleton from "@/components/ui/Skeleton";
import { Suspense } from "react";

async function SpecialtiesData() {
  const specialties = await prisma.specialty.findMany({
    take: 3,
    orderBy: { order: "asc" },
  });
  return <Specialties specialties={specialties} />;
}

function SpecialtiesLoading() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-16">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SpecialtiesWrapper() {
  return (
    <Suspense fallback={<SpecialtiesLoading />}>
      <SpecialtiesData />
    </Suspense>
  );
}
