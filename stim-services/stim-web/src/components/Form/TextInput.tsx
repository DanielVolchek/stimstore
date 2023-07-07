import { ChangeEvent } from "react";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  labelName: string;
  labelContent: string;
};

export default function TextInput({
  onChange,
  labelName,
  labelContent,
}: Props) {
  return (
    <div>
      <label htmlFor={labelName}>{labelContent}</label>
      <input type="text" id={labelName} onChange={onChange} />
    </div>
  );
}
