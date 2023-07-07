"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import baseURL from "@/utils/url";
import FileUploadForm from "@/components/Form/FileUploadComponent";
import TextInput from "@/components/Form/TextInput";
import supabase from "@/utils/Supabase";
import { FormData } from "@/app/api/items/add/route";

export default function Form() {
  const router = useRouter();

  const session = Cookies.get("session");

  const [formData, setFormData] = useState<FormData>({
    file: null,
    name: "",
    desc: "",
    link: "",
  });

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, name: event.target.value });
  }

  function onDescChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setFormData({ ...formData, desc: event.target.value });
  }

  function onLinkChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, link: event.target.value });
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({ ...formData, file: event.target.files[0] });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { file, name, desc, link } = formData;

    if (!file || !name || !desc || !link) {
      return alert("Fill out all elements of the form");
    }

    // const { data, error } = await supabase.storage
    //   .from("images")
    //   .upload(`public/${uuid()}`, file);
    // if (error) {
    //   console.log(error);
    //   alert("ERROR: Check console for details");
    //   throw new Error(error.message);
    // }

    await uploadFile({ file: await readFile(file as File), name, desc, link });
  };

  const uploadFile = async (formData: FormData) => {
    const res = await fetch(`${baseURL()}/api/items/add`, {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        Cookie: session as string,
      },
    });

    const data = await res.json();

    console.log(data);
    // router.push(`/item/${data.id}`);

    if (data.error) {
      alert("FAILED: Check console ");
      console.error(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        onChange={onNameChange}
        labelName="name"
        labelContent="Set name"
      />
      <label htmlFor="message">Message:</label>
      <textarea
        onChange={onDescChange}
        id="message"
        name="message"
        rows={5}
      ></textarea>
      <TextInput
        onChange={onLinkChange}
        labelName="link"
        labelContent="Set purchase link"
      />
      <FileUploadForm handleFileChange={handleFileChange} />
      <button type="submit">Upload new item</button>
    </form>
  );
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // The result property contains the contents of the file
      const content = reader.result as string;
      resolve(content);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    // Read the file as text
    reader.readAsDataURL(file);
  });
}
