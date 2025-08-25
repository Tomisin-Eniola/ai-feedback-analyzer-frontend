import DynamicField from './DynamicField';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

type Props = {
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  isPending: boolean;
};

export default function DynamicSchemaFields({
  fields,
  setFields,
  isPending,
}: Props) {
  const addField = () => {
    setFields([...fields, '']);
  };

  const updateField = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };

  const removeField = (index: number) => {
    if (fields.length > 1) {
      const updatedFields = fields.filter((_, i) => i !== index);
      setFields(updatedFields);
    }
  };

  return (
    <Card className='my-10'>
      <CardTitle className='px-6 text-xl font-semibold text-left'>
        Custom Fields
      </CardTitle>
      <CardContent className='px-6'>
        {fields.map((field, index) => (
          <DynamicField
            key={index}
            value={field}
            onChange={(value) => updateField(index, value)}
            onRemove={() => removeField(index)}
          />
        ))}
      </CardContent>

      <CardFooter>
        <Button
          className='flex cursor-pointer'
          onClick={addField}
          disabled={isPending}
        >
          Add Field
        </Button>
      </CardFooter>
    </Card>
  );
}
