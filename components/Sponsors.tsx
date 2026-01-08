import Image from "next/image";

export default function SponsorsSection() {
  return (
    <section className="px-10 flex justify-between">
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/amullogo.png" alt="Amul Logo" width={1200} height={748} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/unibiclogo.png" alt="Unibic Logo" width={500} height={222} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/popskilogo.jpg" alt="Popski Logo" width={200} height={200} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/friendsfmlogo.png" alt="FriendsFM Logo" width={1200} height={748} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/lakmelogo.png" alt="Lakme Logo" width={1200} height={748} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/unstoplogo.jpg" alt="Unstop Logo" width={1200} height={748} className="w-17 h-17 object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/impaktologo.png" alt="Impakto Logo" width={354} height={130} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/arenterpriselogo.png" alt="AREnterprise Logo" width={1200} height={748} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/bellelogo.jpg" alt="Belle Logo" width={400} height={161} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/cocacolalogo.png" alt="Cocacola Logo" width={1024} height={322} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/hulladeklogo.png" alt="Hulladek Logo" width={980} height={435} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/renbenlogo.png" alt="Renben Logo" width={1200} height={748} className="object-cover object-center mx-auto" />
      </div>
      <div className="w-24 h-21 flex items-center justify-center overflow-hidden">
        <Image src="/captainlogo.png" alt="Captain Logo" width={1200} height={748} className="object-cover object-center mx-auto" />
      </div>
    </section>
  );
}
