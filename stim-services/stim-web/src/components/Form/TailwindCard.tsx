import Image from "next/image";

export default async function Card() {
  return (
    <div className="min-w-screen relative flex min-h-screen items-center overflow-hidden bg-yellow-300 p-5 lg:p-10">
      <div className="relative mx-auto w-full max-w-6xl rounded bg-white p-10 text-gray-800 shadow-xl md:text-left lg:p-20">
        <div className="-mx-10 items-center md:flex">
          <div className="mb-10 w-full px-10 md:mb-0 md:w-1/2">
            <div className="relative">
              <Image
                src="https://pngimg.com/uploads/raincoat/raincoat_PNG53.png"
                className="relative z-10 w-full"
                alt=""
              />
              <div className="absolute bottom-10 left-10 right-10 top-10 z-0 border-4 border-yellow-200"></div>
            </div>
          </div>
          <div className="w-full px-10 md:w-1/2">
            <div className="mb-10">
              <h1 className="mb-5 text-2xl font-bold uppercase"></h1>
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos,
                voluptatum dolorum! Laborum blanditiis consequatur, voluptates,
                sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas
                id quo porro dolorum facilis...{" "}
                <a
                  href="#"
                  className="inline-block border-b border-gray-900 text-xs leading-none text-gray-900 opacity-50 hover:opacity-100"
                ></a>
              </p>
            </div>
            <div>
              <div className="mr-5 inline-block align-bottom">
                <span className="align-baseline text-2xl leading-none">$</span>
                <span className="align-baseline text-5xl font-bold leading-none">
                  59
                </span>
                <span className="align-baseline text-2xl leading-none">
                  .99
                </span>
              </div>
              <div className="inline-block align-bottom">
                <button className="rounded-full bg-yellow-300 px-10 py-2 font-semibold text-yellow-900 opacity-75 hover:text-gray-900 hover:opacity-100"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
