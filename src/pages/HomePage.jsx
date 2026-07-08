import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import QuickCards from '@/components/home/QuickCards';
import TalimClassesPreview from '@/components/home/TalimClassesPreview';
import HufaazPreview from '@/components/home/HufaazPreview';
import MadrasatuTahfizPreview from '@/components/home/MadrasatuTahfizPreview';
import WaqfPreview from '@/components/home/WaqfPreview';
import ResourcesPreview from '@/components/home/ResourcesPreview';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <QuickCards />
      <TalimClassesPreview />
      <HufaazPreview />
      <MadrasatuTahfizPreview />
      <WaqfPreview />
      <ResourcesPreview />
    </>
  );
};

export default HomePage;