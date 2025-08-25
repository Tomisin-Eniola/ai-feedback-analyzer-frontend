import FixedSchemaField from './FixedSchemaField';

type Props = {};

export type FixedSchemaFieldType = {
  name: string;
  value: string;
};

const fixedSchemaFields: FixedSchemaFieldType[] = [
  { name: 'Customer Name', value: 'customer_name' },
  { name: 'Product Mentioned', value: 'product_mentioned' },
  { name: 'Sentiment', value: 'sentiment' },
  { name: 'Summary', value: 'summary' },
];

export default function FixedSchemaFields({}: Props) {
  return (
    <section className='mt-8'>
      <h1 className='text-xl font-semibold text-left mb-4'>
        Customer Feedback
      </h1>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4'>
        {fixedSchemaFields.map((field) => (
          <FixedSchemaField key={field.value} field={field} />
        ))}
      </div>
    </section>
  );
}
