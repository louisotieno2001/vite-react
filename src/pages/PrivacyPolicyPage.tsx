// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';

const PrivacyPolicyPage = () => {
    return (
        <div className="bg-white">
            {/* <Header /> */}
            <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 prose lg:prose-xl">
                <h1>Privacy Policy for Applaude</h1>
                <p><strong>Last Updated:</strong> July 16, 2025</p>

                <h2>1. Introduction</h2>
                <p>Welcome to Applaude ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (the "Services").</p>

                <h2>2. Information We Collect</h2>
                <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
                <ul>
                    <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and payment information, that you voluntarily give to us when you register for the Services or when you choose to participate in various activities related to the Services.</li>
                    <li><strong>Project Data:</strong> Information you provide for the purpose of creating a mobile application, such as website URLs, text prompts, and brand assets. We analyze this data to generate your application but do not claim ownership over it.</li>
                    <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Services, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Services.</li>
                </ul>

                <h2>3. Use of Your Information</h2>
                <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Services to:</p>
                <ul>
                    <li>Create and manage your account.</li>
                    <li>Process your payments and subscriptions.</li>
                    <li>Generate and deliver the mobile application source code as requested.</li>
                    <li>Email you regarding your account or order.</li>
                    <li>Monitor and analyze usage and trends to improve your experience with the Services.</li>
                    <li>Notify you of updates to the Services.</li>
                </ul>

                <h2>4. Disclosure of Your Information</h2>
                <p>We do not share your Personal Data with third parties except as described in this Privacy Policy. We may share information we have collected about you in certain situations:</p>
                <ul>
                    <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                    <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing (e.g., Paystack), data analysis, and hosting services.</li>
                    <li><strong>AI Sub-processors:</strong> The project data you provide is processed by third-party AI service providers (e.g., Google's Gemini API) for the sole purpose of generating your application.</li>
                </ul>

                <h2>5. Security of Your Information</h2>
                <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

                <h2>6. Your Rights</h2>
                <p>You have the right to review, change, or terminate your account at any time. If you wish to do so, please contact us using the contact information provided below.</p>

                <h2>7. Contact Us</h2>
                <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@applaude.ai">privacy@applaude.ai</a></p>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default PrivacyPolicyPage;
