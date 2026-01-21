import { prisma } from '@/lib/prisma';
import Destinations from './Destinations';
import Skeleton from '@/components/ui/Skeleton';
import { Suspense } from 'react';

async function DestinationsData() {
  const destinations = await prisma.destination.findMany({
    take: 6,
    orderBy: { order: 'asc' }
  });

  // Format highlights to ensure they are tags/strings
  const formattedDestinations = destinations.map((d) => ({
    ...d,
    highlights: d.highlights || []
  }));

  return <Destinations destinations={formattedDestinations} />;
}

function DestinationsLoading() {
  return (
    <section className='section-padding bg-[#FFF8F0]'>
      <div className='container-custom'>
        <div className='mb-16 flex flex-col items-center'>
          <Skeleton className='mb-4 h-10 w-64' />
          <Skeleton className='h-6 w-96' />
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='h-[400px] w-full rounded-2xl' />
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
