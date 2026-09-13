import CartButton from "./CartButton";
import Container from "./Container";
import FavoriteButton from "./FavoriteButton";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import Signin from "./Signin";

const Header = () => {
  return (
    <header className="bg-white py-5">
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
          <Signin />
        </div>
      </Container>
    </header>
  );
};

export default Header;
