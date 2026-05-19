import { tags } from '@/constants';

export default function TechStack() {
  return (
    <div className="px-6 py-3">
      <div
        className={['grid w-full grid-cols-4 gap-3 pt-2 md:grid-cols-6'].filter(Boolean).join(' ')}
      >
        {Object.values(tags).map(({ title, icon, url }, index) => (
          <div
            key={index}
            className="flex select-none flex-col items-center gap-1.5 border-none p-1.5 text-teal-100 [&>a>img]:hover:animate-bounce"
          >
            <a href={url} target="_blank" rel="noreferrer">
              {icon && <img src={icon} alt={title} className="h-10 w-10" />}
            </a>
            <h3 className="text-sm">{title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
