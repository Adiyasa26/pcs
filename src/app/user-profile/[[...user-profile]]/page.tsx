import Footer from "@/components/custom/footer/footer";
import FooterState from "@/components/custom/footer/footer-state";
import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <>
    <UserProfile path="/user-profile" routing="path" />
    <Footer>
      <FooterState />
    </Footer>
  </>
);

export default UserProfilePage;
