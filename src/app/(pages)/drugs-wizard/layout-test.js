export default function DrugsWizardLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav>WIZARD</nav>
   
        {children}
      </section>
    )
  }