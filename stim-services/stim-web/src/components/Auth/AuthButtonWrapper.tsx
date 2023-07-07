type Props = {
  onClick: () => void;
  innerText: string;
  className?: string;
};

export default function AuthButtonWrapper({
  onClick,
  innerText,
  className,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`hoverEffect rounded-3xl border border-copper bg-alabaster px-12 py-2 text-copper  hover:shadow-copper ${className}`}
    >
      {innerText}
    </button>
  );
}
