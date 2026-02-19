import { memo } from 'react'
import Icon from '@components/atoms/Icon'
import { NAV_LINKS } from '@data/constants'

function NavBar({ navSolid, theme, onToggleTheme }) {
  return (
    <nav className={`siteNav ${navSolid ? 'navSolid' : ''}`} aria-label="Main navigation">
      <a href="#hero" className="navLogo" aria-label="edp — Back to top">
        edp
      </a>
      <div className="navLinks">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} className="navLink">
            {label}
          </a>
        ))}
      </div>
      <button
        className="themeToggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} className="themeIcon" />
      </button>
    </nav>
  )
}

export default memo(NavBar)
