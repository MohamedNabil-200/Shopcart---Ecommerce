import NoAccess from "@/components/NoAccess";
import WishlistProducts from "@/components/WishlistProducts";
import { currentUser } from "@clerk/nextjs/server";

const WishlistPage = async () => {
  const user = await currentUser();

  return (
    <>
      {user ? (
        <WishlistProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don't miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishlistPage;
