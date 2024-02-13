import Header from "@/components/custom/header/header";
import CardEmployee from "./_components/card-employee";
import EmployeeActivity from "./_components/employee-activity";
import NewsCarousel from "./_components/news-carousel";
import OnlineCard from "./_components/online-card";
import Footer from "@/components/custom/footer/footer";
import FooterState from "@/components/custom/footer/footer-state";
import NotificationSheet from "./_components/notification-sheet";

export const dummyNews = [
  {
    id: "user_1",
    imageUrl: "",
    fullName: "Albert Einstein",
    createdAt: new Date(),
    report:
      "Investigate relativity theorm,writing the theory to math equation,prepare presentation",
  },
  {
    id: "user_2",
    imageUrl: "",
    fullName: "Nikola Tesla",
    createdAt: new Date(),
    report:
      "Create prototype of tesla coil,prove that AC current was not dengerous,prepare presentation",
  },
  {
    id: "user_2",
    imageUrl: "",
    fullName: "Thomas Alfa Edison",
    createdAt: new Date(),
    report:
      "Create prove that Tesla model is dengerous,create electrical system in the city using DC current,lobby the president",
  },
];

export default async function Home() {
  const today = new Date();
  const curHr = today.getHours();

  const state = () => {
    if (curHr < 12) {
      return "Morning!";
    } else if (curHr < 18) {
      return "Afternoon!";
    } else {
      return "Evening!";
    }
  };

  return (
    <>
      <Header>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-extrabold text-rose-600">KerjaYuk!</h1>
          <NotificationSheet />
        </div>
      </Header>
      <main className="flex h-full flex-col gap-3 bg-white p-6">
        <h2 className="text-sm font-medium text-slate-900">
          Hi, Good {state()}
        </h2>
        <CardEmployee />
        <EmployeeActivity />
        <NewsCarousel />
        <OnlineCard />
      </main>
      <Footer>
        <FooterState />
      </Footer>
    </>
  );
}
