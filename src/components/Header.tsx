import { signOut } from 'next-auth/react';

const Header = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to the home page after sign-out
  };

  return (
    <div className="z-50 sticky top-0 bg-gray-800 text-center p-5 text-white flex items-center justify-between">
      <button data-state="closed">
        <a href="/home">
          <span className="text-2xl font-bold text-white">HEHE</span>
        </a>
      </button>
      <p>Dashboard</p>
      <div className="flex flex-col items-center justify-end gap-4">
        <div className="text-center text-2xl text-white">
          <div>
            <button
              type="button"
              id="radix-:r2:"
              aria-haspopup="menu"
              aria-expanded="true"
              data-state="open"
              aria-controls="radix-:r3:"
            >
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  className="aspect-square h-full w-full"
                  src="https://lh3.googleusercontent.com/a/ACg8ocI7eL1PblThRwDNCrfJB2ENQMV8xCDqOVbrltMuj40vlGY=s96-c"
                  alt="Profile"
                />
              </span>
            </button>
          </div>
          <div>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
