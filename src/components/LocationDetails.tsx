interface LocationDetailsProps {
  isOpen: boolean;
  title?: string;
  address?: string;
}

export default function LocationDetails({
  isOpen,
  title,
  address,
}: LocationDetailsProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[500] bg-white rounded-t-3xl shadow-xl p-6 h-[300px]">
      <h2 className="text-xl font-bold">{title || 'Location'}</h2>
      <p className="text-gray-500">{address || 'No address available'}</p>
    </div>
  );
}