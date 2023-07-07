import { NextRequest, NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";

import { authenticationFlow } from "@/utils/auth";
import { v4 as uuid } from "uuid";
import supabase from "@/utils/Supabase";
import prisma from "@/utils/prisma";

export type FormData = {
  file: string | File | null;
  name: string;
  desc: string;
  link: string;
};

const BASE_BUCKET_URL =
  "https://rcbjgrelbmayqxgrxmtb.supabase.co/storage/v1/object/public/images/";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const session = req.cookies.get("session")?.value;

  let user;
  try {
    user = await authenticationFlow(session);
    if (user.role !== "ADMIN") {
      throw new Error("Admin privileges required");
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Unauthorized: ${err}` },
      { status: 400 }
    );
  }

  const { file: image, name, desc, link }: FormData = body.formData;

  const getMissingData = (data: Object) => {
    let missingData = "";

    for (let [key, value] of Object.entries(data)) {
      if (!value) {
        missingData += `${key},`;
      }
    }

    return missingData.substring(0, missingData.length - 1);
  };

  if (!image || !name || !desc || !link) {
    return NextResponse.json(
      { error: "Missing data: " + getMissingData({ image, name, desc, link }) },
      { status: 400 }
    );
  }

  // add item
  // convert image to Image

  const { data, error } = await supabase.storage
    .from("images")
    .upload("items/" + uuid(), decode((image as string).split(",")[1]), {
      contentType: "image/png",
    });

  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  const item = await prisma.item.create({
    data: {
      name,
      desc,
      purchaseLink: link,
    },
  });

  const dbImage = await prisma.image.create({
    data: {
      url: BASE_BUCKET_URL + data.path,
      itemID: item.id,
    },
  });

  return NextResponse.json(
    { message: "Success", item: { ...item, image: dbImage } },
    { status: 200 }
  );
}
