import { tags } from '@/constants';

export default function TechStack() {
  return (
    <div className="p-8">
      <div className={['grid w-full grid-cols-4 gap-4 pt-4'].filter(Boolean).join(' ')}>
        {Object.values(tags).map(({ title, icon, url }, index) => (
          <div
            key={index}
            className="flex select-none flex-col items-center gap-2 border-none p-2 text-teal-100 [&>a>img]:hover:animate-bounce"
          >
            <a href={url} target="_blank" rel="noreferrer">
              {icon && <img src={icon} alt={title} className="h-12 w-12" />}
            </a>
            <h3>{title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
