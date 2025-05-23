import { IMenuIconProps } from '@/types';

export default function MenuIcon({
  color = '#000',
  className = '',
  width = '20',
  height = '20',
  // stroke = "#fff",
  strokeWidth = '1.5',
  onClick,
}: IMenuIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={['icon icon-tabler icon-tabler-menu-2', className].join(' ')}
      onClick={onClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg>
  );
}
