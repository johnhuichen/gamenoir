interface Props {
  symbol: string;
  label: string;
}

const Emoji: React.FC<Props> = ({ symbol, label }: Props) => {
  return (
    <span className="emoji" role="img" aria-label={label}>
      {symbol}
    </span>
  );
};

export default Emoji;
