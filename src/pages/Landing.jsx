import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ProblemSolution from '../components/landing/ProblemSolution';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Screens from '../components/landing/Screens';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import { useEffect } from 'react'; // Removed unused import

export default function Landing() {
    // Add page title
    useEffect(() => {
        document.title = "DoIT | A daily productivity app focused on Today";
    }, []);

    const version = '1.0';

    return (
        <div className="min-h-screen bg-white font-poppins selection:bg-brand-100 selection:text-brand-900">
            <Navbar />
            <main>
                <Hero version={version} />
                <ProblemSolution />
                <Features />
                <HowItWorks />
                <Screens version={version} />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
