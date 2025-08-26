import { Card, CardContent } from '@/components/ui/card';
import { type FeedbackType } from './AllFeedbacks';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type Props = {
  feedback: FeedbackType;
  isPending: boolean;
};

// Convert camelCase / snake_case into "Normal Text"
function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1') // split camelCase -> camel Case
    .replace(/_/g, ' ') // replace underscores
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letters
}

// Utility to truncate long text
function truncate(text: string | null | undefined, length: number = 80) {
  if (!text) return 'Not stated in feedback';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

export default function FeedbackSummary({ feedback, isPending }: Props) {
  const { analyzed_feedback, customer_feedback } = feedback;

  // take the first 3 entries from analyzed_feedback
  const selectedEntries = Object.entries(analyzed_feedback).slice(0, 3);

  return (
    <Card className='md:max-w-[400px] w-full shadow-md h-max md:h-[320px]'>
      <CardContent className='flex flex-col justify-between h-full text-sm text-left gap-4'>
        <div className='space-y-2'>
          <p className='text-gray-500'>
            <span className='font-medium text-gray-600'>
              Customer Feedback:{' '}
            </span>
            {truncate(customer_feedback, 120)}
          </p>

          {/* First 3 key-value pairs */}
          {selectedEntries.map(([key, value]) => (
            <p key={key} className='text-gray-500'>
              <span className='font-medium text-gray-600'>
                {formatKey(key)}:{' '}
              </span>
              {truncate(value ? String(value) : null, 80)}
            </p>
          ))}
        </div>

        {isPending ? (
          <Button className='w-full cursor-pointer' disabled>
            View Details
          </Button>
        ) : (
          <Link
            to={`/feedback/${feedback.id}`}
            className='text-blue-600 hover:underline text-sm block'
          >
            <Button className='w-full cursor-pointer'>View Details</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
