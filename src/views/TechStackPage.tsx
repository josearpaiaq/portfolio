import SnappingPage from '@/components/SnappingPage';
import TechStack from '@/components/TechStack';
import { sectionsConfig } from '@/constants';
import React from 'react';

export default function TechStackPage() {
  return (
    <SnappingPage id={sectionsConfig.techStack.id}>
      <h3 className="w-full pt-6 text-center text-3xl text-teal-100">{'Teck Stack'}</h3>

      <TechStack />
    </SnappingPage>
  );
}
