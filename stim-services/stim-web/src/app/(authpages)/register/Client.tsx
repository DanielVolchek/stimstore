"use client";

import AuthenticationForm from "@/components/Form/AuthenticationForm";
import { useState } from "react";
import TermsPopup from "./TermsPopup";

export default function ClientRegisterForm() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return agreedToTerms ? (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl">Register</h1>
      <AuthenticationForm type={"register"} />
    </div>
  ) : (
    <TermsPopup
      agreeCallback={() => setAgreedToTerms(true)}
      open={!agreedToTerms}
    />
  );
}
