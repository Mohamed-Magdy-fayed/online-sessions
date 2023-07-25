import React from "react";
import Typography from "./ui/Typography";
import Link from "next/link";

export default function Copyright(props: any) {
  return (
    <Typography>
      {"Copyright © "}
      <Link target="_blank" href="https://portfolio-2-iota-brown.vercel.app/">
        Megz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
