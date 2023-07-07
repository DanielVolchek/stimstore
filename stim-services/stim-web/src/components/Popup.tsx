import { MouseEventHandler, useState } from "react";

export default function Popup({
  children,
  onClose,
  canClose = true,
  className,
}: {
  children: React.ReactNode;
  onClose?: Function;
  canClose?: boolean;
  className?: string;
}) {
  const [modalIsOpen, setOpen] = useState(true);

  const close: MouseEventHandler<HTMLElement> = () => {
    if (!canClose) {
      return;
    }
    if (onClose) {
      onClose();
    }
    setOpen(false);
  };

  const onInnerClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return modalIsOpen ? (
    <div
      onClick={close}
      className={`${
        className ? className : ""
      } absolute left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-gray-300 bg-opacity-90`}
    >
      <div
        onClick={onInnerClick}
        className="relative z-20 w-1/4 rounded-md bg-alabaster p-8 opacity-100"
      >
        {canClose && (
          <button className="absolute right-0 top-0 text-xl" onClick={close}>
            X
          </button>
        )}
        {children}
      </div>
    </div>
  ) : null;
}
