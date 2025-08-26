import { Input } from '@/components/ui/input';
import Bin from '@/assets/bin.svg';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
};

export default function DynamicField({ value, onChange, onRemove }: Props) {
  return (
    <div className='flex gap-2 items-center mb-4'>
      <Input
        type='text'
        placeholder=''
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='text-gray-500'
      />
      <div
        className='flex justify-center items-center bg-red-600 w-8 h-8 rounded'
        onClick={onRemove}
      >
        <img src={Bin} alt='Delete field' className='w-4 h-4 cursor-pointer' />
      </div>
    </div>
  );
}
