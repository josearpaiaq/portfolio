import { contactEmail, mediaLinks } from '@/constants';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground md:flex-row">
        <a
          href={`mailto:${contactEmail}`}
          className="font-mono text-xs transition-colors hover:text-foreground"
        >
          {contactEmail}
        </a>
        <div className="flex items-center gap-4">
          <a
            href={mediaLinks.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={mediaLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Jose Arpaia Quintero</p>
      </div>
    </footer>
  );
}
