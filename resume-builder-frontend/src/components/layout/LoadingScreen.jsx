const LoadingScreen = () => (
  <div className="min-h-screen bg-paper flex items-center justify-center">
    <div
      className="w-6 h-6 border-2 border-rule border-t-ink rounded-full animate-spin"
      role="status"
      aria-label="Loading"
    />
  </div>
);

export default LoadingScreen;
