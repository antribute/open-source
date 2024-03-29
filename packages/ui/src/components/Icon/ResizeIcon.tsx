import { svgIcon } from 'components/Icon/SvgIconWrapper';

export const VerticalResizeIcon = svgIcon(
  <svg>
    <path
      fill="currentColor"
      d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
    />
  </svg>,
  {
    autoSize: true,
  }
);

export const HorizontalResizeIcon = svgIcon(
  <svg>
    <path
      fill="currentColor"
      d="M18,16V13H15V22H13V2H15V11H18V8L22,12L18,16M2,12L6,16V13H9V22H11V2H9V11H6V8L2,12Z"
    />
  </svg>,
  { autoSize: true }
);
