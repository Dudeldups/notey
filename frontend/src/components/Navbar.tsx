// type Props = {};
const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4 sticky top-0 shadow-lg border-y-2 border-t-0 border-gray-500">
      <div className="flex gap-4 px-4 sm:px-8 max-w-7xl mx-auto text-white">
        <p className="mr-auto text-3xl font-bold">
          <span className="text-transparent bg-gradient-to-r from-red-300 to-red-500 bg-clip-text">
            Notey
          </span>
        </p>

        <button className="rounded-lg bg-white text-red-600 py-2 px-3 hover:scale-105 transition-transform font-semibold">
          Register
        </button>
        <button className="rounded-lg bg-white text-red-600 py-2 px-3 hover:scale-105 transition-transform font-semibold">
          Login
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
