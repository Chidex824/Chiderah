const effectiveDate = "November 3, 2026";
const contactEmail = "ugwuchiderahwilliams@gmail.com";

const Policies = () => (
  <main className="content mx-auto max-w-4xl px-4 py-16 text-gray-700">
    <header className="mb-12">
      <p className="section-title">Site policies</p>
      <p className="mt-4">
        These policy drafts describe how this portfolio currently works. They are
        not legal advice or a guarantee of compliance; have them reviewed for
        your business and the places where your visitors live.
      </p>
      <p className="mt-2 text-sm text-gray-500">Effective date: {effectiveDate}</p>
      <nav aria-label="Policies" className="mt-6 flex flex-wrap gap-4">
        <a className="underline" href="#privacy-policy">Privacy</a>
        <a className="underline" href="#cookie-policy">Cookies</a>
        <a className="underline" href="#terms-of-use">Terms</a>
      </nav>
    </header>

    <section id="privacy-policy" className="scroll-mt-24 border-t border-gray-200 py-10">
      <h1 className="text-3xl font-semibold text-gray-900">Privacy Policy</h1>
      <p className="mt-4">
        Ugwu Chiderah, based in Enugu, Nigeria, operates this portfolio website.
        For privacy questions or requests, email{" "}
        <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">Information you provide</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>
          Contact inquiries: your name, email address, location, budget, subject,
          message, and the time the inquiry was submitted.
        </li>
        <li>
          Reviews: your name, review, optional role and company, and your
          permission to publish those details. Reviews are held for moderation;
          approved reviews may appear publicly.
        </li>
        <li>
          Technical information may be processed by the hosting and service
          providers needed to deliver the site.
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">How information is used and shared</h2>
      <p className="mt-3">
        Inquiry details are used to respond to you and manage the inquiry.
        Review details are used to moderate submissions and, if approved, display
        the review. The site does not sell personal information.
      </p>
      <p className="mt-3">
        The site is hosted by Vercel; inquiry and review records are stored in
        the configured Neon database; portfolio and blog images are stored with
        Cloudinary when configured. Google Fonts and unpkg deliver fonts and
        frontend resources. Those providers may process connection data when
        your browser requests their services, under their own privacy terms.
        Provider infrastructure may process data in other countries.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">Retention and your choices</h2>
      <p className="mt-3">
        There is currently no automatic deletion schedule for inquiries or
        reviews. They are retained until they are no longer needed, deletion is
        requested, or retention is required for a legitimate legal purpose.
        Approved reviews remain public until approval is withdrawn or removal is
        requested. You may request access, correction, or deletion, or withdraw
        permission for a review to be published, by emailing the address above.
        Rights and response time depend on applicable law.
      </p>
      <p className="mt-3">
        Do not include passwords, payment details, health information, or other
        sensitive information in a contact message or review.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">Security</h2>
      <p className="mt-3">
        Reasonable safeguards are used, including restricted administration and
        managed hosting services. No internet transmission or storage method
        can be guaranteed completely secure.
      </p>
    </section>

    <section id="cookie-policy" className="scroll-mt-24 border-t border-gray-200 py-10">
      <h1 className="text-3xl font-semibold text-gray-900">Cookie Policy</h1>
      <p className="mt-4">
        The public portfolio does not intentionally use advertising or analytics
        cookies. Django may use strictly necessary session and CSRF cookies for
        protected administration and request security.
      </p>
      <p className="mt-3">
        The frontend checks browser local storage for an existing authentication
        token to attach to API requests; local storage is not a cookie, and this
        site does not create that token or provide public account sign-in.
      </p>
      <p className="mt-3">
        Google Fonts and unpkg are third-party resources. Their providers may
        receive technical information when your browser loads those resources;
        see their policies for their own practices. Browser settings can block
        cookies, though doing so may affect administrative features.
      </p>
      <p className="mt-3">
        If optional analytics or advertising cookies are introduced later, this
        policy and the consent controls will be updated before they are enabled.
      </p>
    </section>

    <section id="terms-of-use" className="scroll-mt-24 border-t border-gray-200 py-10">
      <h1 className="text-3xl font-semibold text-gray-900">Terms of Use</h1>
      <p className="mt-4">
        You may use this site to view portfolio work, read posts, send a genuine
        project inquiry, and submit an honest review. Do not misuse the site,
        attempt unauthorized access, disrupt its services, submit unlawful or
        harmful content, or send spam.
      </p>
      <p className="mt-3">
        Portfolio materials and site content belong to their respective owners.
        Do not copy or reuse work without permission. Reviews must reflect your
        own experience; by submitting one, you confirm that you have permission
        to share it and agree that it may be published after approval. Reviews
        may be declined or removed.
      </p>
      <p className="mt-3">
        This site is provided for general information and may change or become
        temporarily unavailable. External links and third-party services are
        provided for convenience; their content and services are controlled by
        their operators. Nothing on this site is a professional or project
        service agreement; project terms should be agreed separately in writing.
      </p>
      <p className="mt-3">
        These terms are subject to applicable law. If you have a question or
        wish to request removal of a review, contact{" "}
        <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </section>
  </main>
);

export default Policies;
