import LogoIcon from '@/assets/logo.svg';

type Props = {};

export default function Logo({}: Props) {
  return (
    <div className='flex items-center'>
      <img src={LogoIcon} alt='Logo' />
      <h1 className='text-2xl font-bold'>TAFA</h1>
    </div>
  );
}
