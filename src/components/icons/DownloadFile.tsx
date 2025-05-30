import { IMenuIconProps } from '@/types';

export default function DownloadFile({
  width = '20',
  height = '20',
  color = '#000',
  strokeWidth = '1.5',
  stroke = '#000',
  onClick,
}: IMenuIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-file-download"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d="M12 17v-6" />
      <path d="M9.5 14.5l2.5 2.5l2.5 -2.5" />
    </svg>
  );
}
