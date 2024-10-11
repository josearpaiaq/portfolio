import { IMenuIconProps } from '@/types';

export default function PlusSign({
  width = '20',
  height = '20',
  color = '#000',
  strokeWidth = '1.5',
  onClick,
}: IMenuIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-plus"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      fill={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </svg>
  );
}
