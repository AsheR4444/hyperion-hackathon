const XLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none">
    <mask
      id="a"
      width={21}
      height={21}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path fill="#fff" d="M0 0h21v21H0V0Z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#7F7F7F"
        d="M16.538.984h3.22l-7.035 8.061L21 20.016h-6.48l-5.079-6.652-5.805 6.652H.412l7.524-8.625L0 .986h6.645l4.584 6.08L16.538.983Zm-1.133 17.1h1.785L5.67 2.816H3.756l11.649 15.268Z"
      />
    </g>
  </svg>
)
export { XLogo }
