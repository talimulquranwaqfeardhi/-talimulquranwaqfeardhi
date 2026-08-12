import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import QuickCards from '@/components/home/QuickCards';
import ConnectionFlow from '@/components/home/ConnectionFlow';
import MadrasatuTahfizPreview from '@/components/home/MadrasatuTahfizPreview';
import TeacherDirectoryPreview from '@/components/home/TeacherDirectoryPreview';
import LearningOpportunities from '@/components/home/LearningOpportunities';
import HufaazPreview from '@/components/home/HufaazPreview';
import WaqfPreview from '@/components/home/WaqfPreview';
import ResourcesPreview from '@/components/home/ResourcesPreview';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <QuickCards />
      <ConnectionFlow />
      <MadrasatuTahfizPreview />
      <TeacherDirectoryPreview />
      <LearningOpportunities />
      <HufaazPreview />
      <WaqfPreview />
      <ResourcesPreview />
    </>
  );
};

export default HomePage;