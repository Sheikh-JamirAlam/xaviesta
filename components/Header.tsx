import Image from "next/image";

export default function Header() {
  return (
    <section className="py-2 grid grid-cols-3">
      <div>
        <h1 className="w-fit mx-auto text-5xl font-mono">VIVO</h1>
      </div>
      <div>
        <Image src="/xaviesta.png" alt="Xaviesta Logo" width={3840} height={640} className="w-90 mx-auto" />
      </div>
      <div>
        <h1 className="w-fit mx-auto text-5xl font-mono">VIVO</h1>
      </div>
    </section>
  );
}
