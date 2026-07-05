// The physical "page" — sized in real mm so it maps directly to A4 both on
// screen and when printed. On screen it's capped to a comfortable preview
// width; the print media query (in index.css) switches it to the true
// 210mm/297mm page size with print margins.
const ResumePage = ({ children }) => (
  <div className="resume-page bg-white text-ink mx-auto w-full max-w-[640px] p-8 sm:p-10 shadow-sm">
    {children}
  </div>
);

export default ResumePage;
