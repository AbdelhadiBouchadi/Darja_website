import React from 'react';
import Contact from '../../../components/shared/contact';
import SlidingImages from '@/components/shared/slider';
import ProgramSection from '@/components/shared/ProgramsSection';
import DeriveLanding from '@/components/shared/DeriveLanding';

const DerivePage = () => {
  return (
    <div className="overflow-hidden">
      <DeriveLanding />
      <ProgramSection />
      <SlidingImages />
      <Contact />
    </div>
  );
};

export default DerivePage;
