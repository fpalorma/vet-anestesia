'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  useEffect(()=>{
    router.push('/drugs-wizard/step1')
  })

  return <></>;
}
