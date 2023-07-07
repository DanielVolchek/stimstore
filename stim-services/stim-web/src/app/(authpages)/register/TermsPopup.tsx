import Popup from "@/components/Popup";
import useClientMessageStore from "@/utils/useClientMessageStore";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import TermsText from "./TermsText";

type Props = {
  agreeCallback: () => void;
  open: boolean;
};

export default function TermsPopup({ agreeCallback, open }: Props) {
  const { updateClientMessage } = useClientMessageStore();

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    console.log("submitting");
    console.log("agreed to terms is ", agreedToTerms);
    if (!agreedToTerms) {
      updateClientMessage({
        type: "ERROR",
        message: "Please agree to terms to continue",
      });
      return;
    }
    agreeCallback();
  };

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = () => {
    console.log("changed");
    setAgreedToTerms((current) => {
      console.log("value is ", !current);
      return !current;
    });
  };

  return (
    open && (
      <Popup canClose={false}>
        <form className="mx-10 my-20" onSubmit={handleSubmit}>
          <TermsText />

          <label htmlFor="check">
            I agree to the terms of using this website
          </label>
          <input
            type="checkbox"
            id="check"
            checked={agreedToTerms}
            onChange={handleCheckboxChange}
          />
          <button type="submit">Submit</button>
        </form>
      </Popup>
    )
  );
}
