interface LocationDetailsProps {
  isOpen: boolean;
  title?: string;
  address?: string;
}

export default function LocationDetails({ isOpen, title, address }: LocationDetailsProps) {
  return (
    <div className={`
      absolute bottom-0 left-6 right-0 z-[500] w-[750px]
      bg-white rounded-t-3xl shadow-xl p-6 h-[600px] 
      transition-transform duration-300 
      ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <h2 className="text-xl font-bold">{title || 'Location'}</h2>
      <p className="text-gray-500">{address || 'No address available'}</p>
    </div>
  );
}