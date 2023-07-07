import React, { ChangeEvent, FormEvent, useState } from "react";

export default function FileUploadComponent({
  handleFileChange,
}: {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label>
        Choose a file:
        <input type="file" onChange={handleFileChange} />
      </label>
    </div>
  );
}
