import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ArrowLeft, Check, Download, Loader2 } from 'lucide-react';
import api from '../services/api';
import LoadingScreen from '../components/layout/LoadingScreen';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import ProjectForm from '../components/editor/ProjectForm';
import EducationForm from '../components/editor/EducationForm';
import CertificationForm from '../components/editor/CertificationForm';
import SkillsForm from '../components/editor/SkillsForm';
import ResumePreview from '../components/preview/ResumePreview';
import TemplatePicker from '../components/preview/TemplatePicker';

const EMPTY_PERSONAL_INFO = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  website: '',
  summary: '',
};

// Defensive normalization applied every time a resume comes back from the
// API — covers both a genuinely missing field (shouldn't happen given the
// backend's schema defaults, but costs nothing to guard) and keeps this
// logic in one place now that there are 6 fields to default instead of 1.
const normalizeResume = (data) => ({
  ...data,
  personalInfo: { ...EMPTY_PERSONAL_INFO, ...data.personalInfo },
  experience: data.experience || [],
  education: data.education || [],
  projects: data.projects || [],
  certifications: data.certifications || [],
  skills: data.skills || [],
});

const ResumeEditor = () => {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // '' | 'saved' | 'error'
  const [saveMessage, setSaveMessage] = useState('');
  const [activeView, setActiveView] = useState('edit'); // 'edit' | 'preview' — mobile/tablet only

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: resume?.title || 'Resume',
  });

  useEffect(() => {
    let isMounted = true;
    const fetchResume = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const { data } = await api.get(`/resumes/${id}`);
        if (isMounted) {
          setResume(normalizeResume(data));
        }
      } catch (err) {
        if (isMounted) {
          setLoadError(
            err.response?.status === 404
              ? "This resume doesn't exist or isn't yours."
              : 'Could not load this resume. Try refreshing the page.'
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchResume();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('');
    try {
      const { title, templateId, personalInfo, experience, education, projects, certifications, skills } =
        resume;
      // Strip client-only `key` fields before sending — the backend doesn't know about them
      const payload = {
        title,
        templateId,
        personalInfo,
        experience: experience.map(({ key: _key, ...rest }) => rest),
        education: education.map(({ key: _key, ...rest }) => rest),
        projects: projects.map(({ key: _key, ...rest }) => rest),
        certifications: certifications.map(({ key: _key, ...rest }) => rest),
        skills,
      };
      const { data } = await api.put(`/resumes/${id}`, payload);
      setResume(normalizeResume(data));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2500);
    } catch (err) {
      setSaveStatus('error');
      setSaveMessage(err.response?.data?.message || 'Could not save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingScreen />;

  if (loadError) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-danger mb-4">{loadError}</p>
        <Link to="/dashboard" className="text-signal underline underline-offset-4">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <div className="flex items-start justify-between gap-4 mb-2">
        <input
          value={resume.title}
          onChange={(e) => setResume({ ...resume, title: e.target.value })}
          placeholder="Untitled Resume"
          className="font-display text-3xl text-ink bg-transparent border-0 focus:outline-none w-full"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 font-medium hover:bg-signal transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed shrink-0"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          {isSaving ? 'Saving…' : 'Save'}
        </button>
      </div>

      <div className="h-5 mb-6">
        {saveStatus === 'saved' && <p className="text-sm text-signal">Saved.</p>}
        {saveStatus === 'error' && <p className="text-sm text-danger">{saveMessage}</p>}
      </div>

      {/* Edit/Preview toggle — only shown below the split-screen breakpoint */}
      <div className="lg:hidden flex border border-rule mb-6 w-fit">
        <button
          type="button"
          onClick={() => setActiveView('edit')}
          className={`px-4 py-1.5 text-sm cursor-pointer transition-colors ${
            activeView === 'edit' ? 'bg-ink text-paper' : 'text-ink-muted'
          }`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setActiveView('preview')}
          className={`px-4 py-1.5 text-sm cursor-pointer transition-colors ${
            activeView === 'preview' ? 'bg-ink text-paper' : 'text-ink-muted'
          }`}
        >
          Preview
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className={activeView === 'edit' ? 'block' : 'hidden lg:block'}>
          <PersonalInfoForm
            personalInfo={resume.personalInfo}
            onChange={(personalInfo) => setResume({ ...resume, personalInfo })}
          />
          <ExperienceForm
            experience={resume.experience}
            onChange={(experience) => setResume({ ...resume, experience })}
          />
          <ProjectForm
            projects={resume.projects}
            onChange={(projects) => setResume({ ...resume, projects })}
          />
          <EducationForm
            education={resume.education}
            onChange={(education) => setResume({ ...resume, education })}
          />
          <CertificationForm
            certifications={resume.certifications}
            onChange={(certifications) => setResume({ ...resume, certifications })}
          />
          <SkillsForm skills={resume.skills} onChange={(skills) => setResume({ ...resume, skills })} />
        </div>

        <div className={`${activeView === 'preview' ? 'block' : 'hidden lg:block'} lg:sticky lg:top-8`}>
          <div className="flex items-center justify-between gap-4 mb-4">
            <TemplatePicker
              value={resume.templateId}
              onChange={(templateId) => setResume({ ...resume, templateId })}
            />
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 border border-ink text-ink px-4 py-1.5 text-sm font-medium hover:bg-ink hover:text-paper transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
          <p className="text-xs text-ink-muted mb-4">
            Opens your browser's print dialog — choose "Save as PDF" as the destination.
          </p>

          <div className="bg-canvas border border-rule p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
            <div ref={printRef}>
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
