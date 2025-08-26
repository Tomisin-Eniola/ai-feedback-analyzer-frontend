import '../../App.css';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SchemaFields from '../home/FixedSchemaFields';
import DynamicSchemaFields from '../home/DynamicSchemaFields';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useTransition, useState } from 'react';
import AllFeedbacks from '../home/AllFeedbacks';

import { useNavigate } from 'react-router-dom';
import Logo from '../general/Logo';

function Home() {
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState('option-one');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [dynamicFields, setDynamicFields] = useState<string[]>(['']);
  const navigate = useNavigate();

  const MIN_TEXT_LENGTH = 10;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    startTransition(async () => {
      try {
        const schema =
          selected === 'option-one'
            ? [
                'customerName',
                'sentiment (Positive, Negative, or Neutral)',
                'summary',
                'productMentioned',
              ]
            : getValidDynamicFields();

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/feedback`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerFeedback: textAreaValue.replace(/\s+/g, ' ').trim(),
              schema: schema,
            }),
          }
        );

        const data = await response.json();
        navigate(`/feedback/${data.data.id}`);

        // we need to get the text from the textarea and the selected radio button value
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    });
  };

  const getValidDynamicFields = () => {
    const nonEmptyFields = dynamicFields.filter((field) => field.trim() !== '');
    const uniqueFields = [
      ...new Set(nonEmptyFields.map((field) => field.trim())),
    ];
    return uniqueFields;
  };

  const isFormValid = () => {
    const isTextValid = textAreaValue.trim().length >= MIN_TEXT_LENGTH;
    const areFieldsValid =
      selected === 'option-one' || getValidDynamicFields().length > 0;
    return isTextValid && areFieldsValid;
  };

  return (
    <>
      <header className='mb-10'>
        <Logo />
      </header>

      <div>
        <h1 className='text-xl font-semibold text-left mb-2'>
          Text for analysis
        </h1>
        <Textarea
          placeholder='Paste your text here for extraction...'
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          className='text-gray-500 placeholder-gray-500'
        />
        {textAreaValue.length > 0 && textAreaValue.length < MIN_TEXT_LENGTH && (
          <p className='text-sm text-red-300 mt-1 text-left'>
            Please enter at least {MIN_TEXT_LENGTH} characters.
          </p>
        )}
      </div>

      <div>
        <h1 className='text-xl font-semibold text-left mb-4 mt-8'>
          Select Extraction Mode
        </h1>

        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          className='flex'
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option-one' id='option-one' />
            <Label htmlFor='option-one' className='text-gray-500'>
              Customer Feedback
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option-two' id='option-two' />
            <Label htmlFor='option-two' className='text-gray-500'>
              Custom Fields
            </Label>
          </div>
        </RadioGroup>
      </div>

      {selected === 'option-one' ? (
        <SchemaFields />
      ) : (
        <DynamicSchemaFields
          fields={dynamicFields}
          setFields={setDynamicFields}
          isPending={isPending}
        />
      )}

      {isPending ? (
        <Button size='sm' disabled className='mt-6 flex'>
          <Loader2Icon className='animate-spin' />
          Please wait
        </Button>
      ) : (
        <Button
          onClick={(e) => onSubmit(e)}
          className='mt-6 flex cursor-pointer'
          disabled={!isFormValid()}
        >
          Analyze Text
        </Button>
      )}

      <AllFeedbacks isPending={isPending} />
    </>
  );
}

export default Home;
