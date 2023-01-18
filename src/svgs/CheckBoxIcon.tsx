type Props = {
  stroke: string
}

export default function CheckBoxIcon({ stroke }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12.5L11 15.5L16 9.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  )
}
