type Props = {};

export default function PageLoader({}: Props) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
      <span className='loader'></span>
    </div>
  );
}
