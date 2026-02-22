import { memo } from 'react';
import SkillChip from '@components/atoms/SkillChip';

function SkillsGrid({ skills }) {
  return (
    <div className="skillsGrid">
      {skills.map((skill, i) => (
        <SkillChip
          key={skill.label}
          label={skill.label}
          icon={skill.icon}
          index={i}
        />
      ))}
    </div>
  );
}

export default memo(SkillsGrid);
