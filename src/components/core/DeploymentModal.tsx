import React from 'react';
import { Apple, Smartphone, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface DeploymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeployClick: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose, onDeployClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-4">Choose Your Deployment</h2>
                <div className="flex justify-around mb-4">
                    <button onClick={onDeployClick} className="flex flex-col items-center p-4 border border-transparent hover:border-ion-blue rounded-lg">
                        <Apple size={48} />
                        <span className="mt-2">App Store</span>
                    </button>
                    <button onClick={onDeployClick} className="flex flex-col items-center p-4 border border-transparent hover:border-ion-blue rounded-lg">
                        <Smartphone size={48} />
                        <span className="mt-2">Play Store</span>
                    </button>
                    <button onClick={onDeployClick} className="flex flex-col items-center p-4 border border-ion-blue rounded-lg">
                        <Zap size={48} />
                        <span className="mt-2">Applause</span>
                    </button>
                </div>
                <p className="text-center text-gray-400 mb-4">"Don't worry, you can always choose to deploy to the other stores later."</p>
                <button onClick={onClose} className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded">Close</button>
            </Card>
        </div>
    );
};
