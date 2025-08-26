import { useEffect, useState, useCallback, useRef } from 'react';
import PageLoader from '../general/PageLoader';
import FeedbackSummary from './FeedbackSummary';

type Props = {
  isPending: boolean;
};

export type FeedbackType = {
  id: string;
  customer_feedback: string;
  analyzed_feedback: Object;
};

type FeedbackResponse = {
  data: FeedbackType[];
  page: number;
  lastPage: number;
  total: number;
};

export default function AllFeedbacks({ isPending }: Props) {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchFeedbacks = async (page: number, isInitial = false) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/feedback?page=${page}&limit=5`
      );
      const data: FeedbackResponse = await response.json();

      if (isInitial) {
        setFeedbacks(data.data);
        setInitialLoading(false);
      } else {
        setFeedbacks((prev) => [...prev, ...data.data]);
      }

      setCurrentPage(data.page);
      setLastPage(data.lastPage);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      if (isInitial) {
        setInitialLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Intersection Observer callback
  const lastFeedbackElementCallback = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < lastPage) {
          fetchFeedbacks(currentPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, currentPage, lastPage]
  );

  useEffect(() => {
    fetchFeedbacks(1, true);
  }, []);

  if (initialLoading) {
    return <PageLoader />;
  }

  return (
    <section className='my-12'>
      <h1 className='text-xl font-semibold text-left mb-4'>Past Feedbacks</h1>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4'>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <FeedbackSummary
              key={feedback.id}
              feedback={feedback}
              isPending={isPending}
            />
          ))
        ) : (
          <p className='text-gray-500'>No feedbacks available</p>
        )}

        {/* Invisible sentinel element for intersection observer */}
        {currentPage < lastPage && (
          <div ref={lastFeedbackElementCallback} className='h-1 w-full' />
        )}
      </div>

      {/* Loading indicator for additional pages */}
      {isLoading && !initialLoading && (
        <div className='flex justify-center mt-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      )}

      {/* End of results indicator */}
      {currentPage >= lastPage && feedbacks.length > 0 && (
        <div className='text-center text-gray-500 mt-8'>
          You've reached the end of all feedbacks
        </div>
      )}
    </section>
  );
}
