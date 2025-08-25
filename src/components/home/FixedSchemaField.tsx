import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { type FixedSchemaFieldType } from './FixedSchemaFields';

type Props = {
  field: FixedSchemaFieldType;
};

export default function FixedSchemaField({ field }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{field.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
