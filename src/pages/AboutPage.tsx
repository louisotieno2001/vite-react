import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card } from '@/components/ui/Card';


// Corrected: Import images from their location inside the 'src' directory
import mugambiJohnNdeke from '../assets/images/mugambi_john_ndeke.jpg.jpg';
import tsionTamirat from '../assets/images/tsion_tamirat.jpg.jpg';

const AboutPage = () => {
    const foundingTeam = [
        {
            name: 'Mugambi (John) Ndeke',
            role: 'co-founder & AI Lead',
            bio: "As the visionary behind Uplas, John combines deep technical expertise with a powerful drive to solve real-world problems. He is a full-stack AI Software Engineer who builds cutting-edge AI agentic systems and possesses a rare blend of skills in Python/Django, MySQL, and modern frontend development. But John is more than a coder; his foundation as an award-winning Digital Strategist gives him a unique lens on building a brand that resonates and a product that sells. He doesn't just deliver technical excellence; he builds with a strategic business perspective, ensuring Uplas is not only innovative but also impactful.",
            image: mugambiJohnNdeke
        },
        {
            name: 'Tsion Tamirat',
            role: 'Co-Founder & Software Engineer',
            bio: "Tsion is a motivated and versatile Software Engineer, driven by a passion for creating impactful, user-focused applications with clean, efficient code. With a strong foundation from Arba Minch University and practical experience at NGCS, she brings a robust skill set in both backend and frontend technologies. Her expertise spans C# (.NET Core), Python (Django), and modern frontend frameworks like React, ensuring our platform is not just powerful but also responsive and intuitive. A critical thinker and natural collaborator, Tsion is committed to continuous learning and plays a vital role in shaping the technical architecture and user experience of Applaude.",
            image: tsionTamirat
        }
    ]

    return (
        <div className="min-h-screen bg-quantum-black text-soft-white">
            {/* <Header /> */}
            <main className="pt-32 pb-16 px-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-ion-blue to-fusion-pink">
                    Empowering Your Vision
                </h1>
                <p className="text-xl text-center text-gray-300 mb-16">
                    Applaude is built on the belief that a great idea shouldn't be limited by technology. We are a passionate team of AI engineers and product visionaries dedicated to creating a platform that empowers you to bring your mobile app ideas to life with unprecedented speed and simplicity.
                </p>
                <Card className="p-8 mb-16">
                    <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
                    <p className="text-gray-400">
                        At the heart of Applaude is a sophisticated swarm of AI agents, each an expert in its domain. From market analysis and brand identity to native code generation and quality assurance, our AI team works in concert to transform your vision into a polished, production-ready mobile application.
                    </p>
                </Card>

                <h2 className="text-4xl font-bold text-center mb-8">Founding Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {foundingTeam.map(member => (
                        <Card key={member.name} className="p-6">
                            <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-center">{member.name}</h3>
                            <p className="text-lg text-center text-ion-blue mb-4">{member.role}</p>
                            <p className="text-gray-400">{member.bio}</p>
                        </Card>
                    ))}
                </div>

                <h2 className="text-4xl font-bold text-center mb-8">Behind the Scenes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-800 h-48 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default AboutPage;
