import '../../App.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type FeedbackType } from '../home/AllFeedbacks';
import PageLoader from '../general/PageLoader';
import OriginalText from '../feedback-details/OriginalText';
import ExtractedInformation from '../feedback-details/ExtractedInformation';

type Props = {};

export default function FeedbackDetails({}: Props) {
  const { id } = useParams();
  const [feedbackData, setFeedbackData] = useState<FeedbackType | null>(null);

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      if (!id) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/feedback/${id}`
      );
      const data = await response.json();
      setFeedbackData(data);
    };

    fetchFeedbackDetails();
  }, []);

  if (!feedbackData) {
    return <PageLoader />;
  }

  return (
    <section className='gap-10 flex flex-col'>
      <OriginalText text={feedbackData.customer_feedback} />
      <ExtractedInformation analyzedFeedback={feedbackData.analyzed_feedback} />
    </section>
  );
}
