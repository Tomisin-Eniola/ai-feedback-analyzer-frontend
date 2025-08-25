import { Card, CardContent, CardTitle } from '@/components/ui/card';

type Props = {
  analyzedFeedback: Object;
};

// Convert camelCase / snake_case into "Normal Text"
function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1') // split camelCase -> camel Case
    .replace(/_/g, ' ') // replace underscores
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letters
}

export default function ExtractedInformation({ analyzedFeedback }: Props) {
  const entries = Object.entries(analyzedFeedback);

  return (
    <Card>
      <CardTitle className='px-6 py-4 text-xl font-semibold text-left'>
        Extracted Information
      </CardTitle>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className='w-full table-fixed'>
            <thead>
              <tr className='border-b bg-gray-50'>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-900 w-1/3'>
                  Field
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-900 w-2/3'>
                  Value
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {entries.map(([key, value], index) => (
                <tr
                  key={key}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className='px-6 py-4 text-sm font-medium text-gray-900 align-top w-1/3 text-left'>
                    {formatKey(key)}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 whitespace-pre-wrap break-words w-2/3 text-left'>
                    {value !== null && value !== undefined
                      ? String(value)
                      : 'Not available'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
