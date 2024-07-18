import FindDoctor from "@/components/guest/landing/findDoctor";
import Footer from "@/components/guest/landing/footer";
import Hero from "@/components/guest/landing/hero";
import MemberResults from "@/components/guest/landing/memberResults";
import ProvidedServices from "@/components/guest/landing/providedServices";
import TeamMembers from "@/components/guest/landing/teamMembers";
import Testimonials from "@/components/guest/landing/testimonials";
import Navbar from "@/components/guest/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="px-12 max-w-[1200px] mx-auto font-medium">
        <Navbar />
        <Hero />
        <FindDoctor />
        <MemberResults />
        <ProvidedServices />
        <TeamMembers />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
