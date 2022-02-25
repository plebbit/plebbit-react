export const PlebbitDarkLogo = ({ bg, outline }) => {
  return (
    <svg version="1.1" viewBox="0 0 306.14 306.14" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="153.07"
        cy="153.07"
        r="153.07"
        fill={bg || '#7c7c7c'}
        stroke={outline}
        strokeWidth="13.5"
      />
      <g transform="translate(-229.37 -308.69)">
        <circle cx="334.04" cy="399.32" r="14.563" fill={outline || '#fff'} />
        <circle cx="476.01" cy="400.8" r="14.563" fill={outline || '#fff'} />
        <path
          d="m427.18 415.83 26.214 97.087-80.583-1.9418"
          fill="none"
          stroke={outline || '#fff'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="13.5"
        />
        <path
          d="m359.22 557.57 100.97 3.8835"
          fill="none"
          stroke={outline || '#fff'}
          strokeLinecap="round"
          strokeWidth="13.5"
        />
      </g>
    </svg>
  );
};
