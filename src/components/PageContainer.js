// Shared Components
const PageContainer = ({ children, className = "" }) => (
  <div className={`min-h-screen pt-20 ${className}`}>
    {children}
  </div>
);

export default PageContainer