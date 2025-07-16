export function Footer() {
  return (
    <footer className=" mx-auto border-1 border-gray-700 bg-black  footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside className="text-white p-2  text-center flex flex-col items-center justify-center">
        <div className="w-15 h-15 bg-gradient-to-br from-[#2616df] to-[#1c193e] rounded-lg flex items-center justify-center shadow-md shadow-[#1c193e]/30 ">
          <span className="text-white font-bold text-xl">K</span>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Kuantum Games Ltd. <br />
          123 Kota Bogor, Indonesia, 12345
           <br />
        </p>
      </aside>
    </footer>
  );
}