import Image from "next/image";

export default function Header() {
  return (
    <section className="grid grid-cols-3">
      <div className="w-160 h-19">
        <Image src="/vivologo2.png" alt="Vivo Logo" width={1280} height={152} className="object-cover object-center mx-auto" />
      </div>
      <div>
        <Image src="/xaviesta.png" alt="Xaviesta Logo" width={3840} height={640} className="w-90 py-2 mx-auto" />
      </div>
      <div className="w-160 h-19">
        <Image src="/vivologo1.png" alt="Evereadylogo Logo" width={1280} height={152} className="object-cover object-center mx-auto" />
      </div>
    </section>
  );
}
