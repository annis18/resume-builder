import ResumePage from './ResumePage';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import TechTemplate from './templates/TechTemplate';

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  tech: TechTemplate,
};

const ResumePreview = ({ resume }) => {
  const Template = TEMPLATES[resume.templateId] || ModernTemplate;

  return (
    <ResumePage>
      <Template resume={resume} />
    </ResumePage>
  );
};

export default ResumePreview;
