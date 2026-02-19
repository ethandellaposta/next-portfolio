import { memo } from 'react'
import SectionHeader from '@components/atoms/SectionHeader'
import ContactCard from '@components/molecules/ContactCard'
import { CONTACT_LINKS } from '@data/constants'

function ContactSection() {
  return (
    <section className="region contactRegion" data-reveal id="contact">
      <SectionHeader
        number="05"
        title="Get in Touch"
        description="Want to hire me? Have a simulation idea? Let's talk."
      />
      <div className="contactGrid">
        {CONTACT_LINKS.map((link) => (
          <ContactCard key={link.label} {...link} />
        ))}
      </div>
    </section>
  )
}

export default memo(ContactSection)
