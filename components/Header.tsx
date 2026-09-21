import { currentUser } from "@clerk/nextjs/server";
import CartButton from "./CartButton";
import Container from "./Container";
import FavoriteButton from "./FavoriteButton";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import { UserButton } from "@clerk/nextjs";
import SignIn from "./Signin";

const Header = async () => {
  const user = await currentUser();
  return (
    <header className="bg-white/70 py-5 sticky top-0 z-50 backdrop-blur-md">
      <Container className="flex items-center justify-between text-light-color">
        {/* Logo */}
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        {/* NavButtons */}
        <HeaderMenu />
        {/* ActionButtons */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartButton />
          <FavoriteButton />
          {user ? <UserButton /> : <SignIn />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
