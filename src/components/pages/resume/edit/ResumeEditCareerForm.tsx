import { ResumeCareer } from "../../../../types/resumeTypes";
import ResumeEditCareerExperience from "./ResumeEditCareerExperience";
import ResumeEditCareerEducation from "./ResumeEditCareerEducation";
import ResumeEditCareerLinks from "./ResumeEditCareerLinks";

interface Props {
  career: ResumeCareer;
  onChange: (data: ResumeCareer) => void;
}

export default function ResumeEditCareerForm({ career, onChange }: Props) {
  return (
    <div className="space-y-12">
      <ResumeEditCareerExperience
        experience={career.experience}
        onChange={(updated) => onChange({ ...career, experience: updated })}
      />
      <ResumeEditCareerEducation
        education={career.education}
        onChange={(updated) => onChange({ ...career, education: updated })}
      />
      <ResumeEditCareerLinks
        links={career.links}
        onChange={(updated) => onChange({ ...career, links: updated })}
      />
    </div>
  );
}
