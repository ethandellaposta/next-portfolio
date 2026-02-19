import { memo } from 'react'
import { FOOTER_LINKS } from '@data/constants'

function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <span className="footerLogo">edp</span>
        <div className="footerLinks">
          {FOOTER_LINKS.map(({ href, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
            </a>
          ))}
        </div>
        <p className="footerCopy">
          © {new Date().getFullYear()} Ethan Della Posta. Built with Next.js.
        </p>
      </div>
    </footer>
  )
}

export default memo(SiteFooter)
