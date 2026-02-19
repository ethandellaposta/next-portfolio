import { memo } from 'react'

function SectionHeader({ number, title, description }) {
  return (
    <div className="sectionHeaderSticky">
      {number && <span className="sectionNumber">{number}</span>}
      <h2 className="sectionTitle">{title}</h2>
      {description && <p className="regionDesc">{description}</p>}
    </div>
  )
}

export default memo(SectionHeader)
