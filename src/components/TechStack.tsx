import { tags } from '@/constants';

export default function TechStack() {
  return (
    <>
      <div className="md:w-1/2">
        <h3 className="text-md mt-4 text-balance text-center font-semibold text-teal-100 md:mt-0 md:text-lg">
          Technologies and tools I use on a daily basis
        </h3>
        <div className={['grid w-full grid-cols-4 gap-4 pt-4'].filter(Boolean).join(' ')}>
          {Object.values(tags).map(({ title, icon, url }, index) => (
            <div
              key={index}
              className="flex select-none flex-col items-center gap-2 border-none p-2 text-teal-100 [&>a>img]:hover:animate-spin"
            >
              <a href={url} target="_blank" rel="noreferrer">
                {icon && <img src={icon} alt={title} className="h-12 w-12" />}
              </a>
              <h3>{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
