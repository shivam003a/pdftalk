import Link from "next/link";
import Image from 'next/image'

function Navbar() {
  return (
    <>
      <div className="bg-primary backdrop-blur-md sticky top-0 left-0 z-50">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 p-3">
          <div>
            <Link href={"/"}>
              <Image
                src='/pdftalk.png'
                alt="pdftalk"
                className="h-12"
                width={96}
                height={48}
              />
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
