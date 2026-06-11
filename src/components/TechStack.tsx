import { tags } from '@/constants';

export default function TechStack() {
  return (
    <div className="grid w-full grid-cols-4 gap-3 md:grid-cols-6">
      {Object.values(tags).map(({ title, icon, url }) => (
        <a
          key={title}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="group flex select-none flex-col items-center gap-1.5 rounded-lg border border-transparent p-2 text-muted-foreground transition-colors duration-300 hover:border-border hover:bg-card hover:text-foreground"
        >
          {icon && (
            <img
              src={icon}
              alt=""
              className="h-10 w-10 transition-transform duration-300 group-hover:-translate-y-1"
            />
          )}
          <p className="text-center text-sm">{title}</p>
        </a>
      ))}
    </div>
  );
}
