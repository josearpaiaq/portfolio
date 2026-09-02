'use client';

import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { sectionsConfig } from '@/constants';

export default function Contact() {
  return (
    <SnappingPage id={sectionsConfig.contact.id}>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto my-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-10">
          <FadeIn>
            <SectionHeading kicker="Contact" title="Send me a message" />
          </FadeIn>
          <FadeIn delay={0.15}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>

      <Footer />
    </SnappingPage>
  );
}
