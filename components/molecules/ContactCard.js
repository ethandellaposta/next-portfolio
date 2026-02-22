import { memo } from 'react';
import Icon from '@components/atoms/Icon';

function ContactCard({ href, label, value, icon, external }) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a className="contactCard" href={href} {...linkProps}>
      <span className="contactIcon" aria-hidden="true">
        <Icon name={icon} size={24} />
      </span>
      <span className="contactLabel">{label}</span>
      <span className="contactValue">{value}</span>
    </a>
  );
}

export default memo(ContactCard);
