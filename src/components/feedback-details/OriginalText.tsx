import { Card, CardContent, CardTitle } from '@/components/ui/card';

type Props = {
  text: string;
};

export default function OriginalText({ text }: Props) {
  return (
    <Card>
      <CardTitle className='px-6 text-xl font-semibold text-left text-gray-600'>
        Original Feedback
      </CardTitle>
      <CardContent className='space-y-2 text-sm text-left text-gray-500'>
        {text}
      </CardContent>
    </Card>
  );
}
