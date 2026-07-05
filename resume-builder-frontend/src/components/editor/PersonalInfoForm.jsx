import FormField from './FormField';
import EditorSection from './EditorSection';

const PersonalInfoForm = ({ personalInfo, onChange }) => {
  const update = (field) => (e) => {
    onChange({ ...personalInfo, [field]: e.target.value });
  };

  return (
    <EditorSection title="Personal Info">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
      <FormField
        label="Full name"
        value={personalInfo.fullName}
        onChange={update('fullName')}
        placeholder="Jordan Lee"
      />
      <FormField
        label="Professional headline"
        value={personalInfo.jobTitle}
        onChange={update('jobTitle')}
        placeholder="Senior Product Designer"
      />
      <FormField
        label="Email"
        type="email"
        value={personalInfo.email}
        onChange={update('email')}
        placeholder="you@example.com"
      />
      <FormField
        label="Phone"
        value={personalInfo.phone}
        onChange={update('phone')}
        placeholder="+1 555 123 4567"
      />
      <FormField
        label="Location"
        value={personalInfo.address}
        onChange={update('address')}
        placeholder="San Francisco, CA"
      />
      <FormField
        label="LinkedIn"
        value={personalInfo.linkedin}
        onChange={update('linkedin')}
        placeholder="linkedin.com/in/jordanlee"
      />
      <FormField
        label="Website / Portfolio"
        value={personalInfo.website}
        onChange={update('website')}
        placeholder="jordanlee.dev"
        className="sm:col-span-2"
      />
      <FormField
        label="Professional summary"
        textarea
        rows={3}
        value={personalInfo.summary}
        onChange={update('summary')}
        placeholder="A brief, confident overview of who you are and what you're looking for."
        className="sm:col-span-2"
      />
    </div>
    </EditorSection>
  );
};

export default PersonalInfoForm;
