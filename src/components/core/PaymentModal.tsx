import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import paymentService from '../../services/paymentService'; // Assuming you create this service

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: number;
}

interface Pricing {
    currency: string;
    prices: {
        ONETIME: string;
        MONTHLY: string;
        YEARLY: string;
    };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, projectId }) => {
    const [pricing, setPricing] = useState<Pricing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            // This is a simplified geolocation approach.
            // A more robust solution might use a third-party service.
            const fetchPricing = async () => {
                try {
                    // Using a placeholder for country detection
                    const country = "US"; // Replace with actual geo-detection
                    const data = await paymentService.getLocalizedPricing(country);
                    setPricing(data);
                } catch (error) {
                    console.error("Failed to fetch localized pricing", error);
                    // Fallback to USD
                    setPricing({ currency: 'USD', prices: { ONETIME: '50.00', MONTHLY: '15.00', YEARLY: '150.00' } });
                } finally {
                    setLoading(false);
                }
            };
            fetchPricing();
        }
    }, [isOpen]);


    const handlePayment = async (planType: 'ONETIME' | 'MONTHLY' | 'YEARLY') => {
        if (!pricing) return;
        try {
            const response = await paymentService.initializePayment(projectId, planType, pricing.currency);
            window.location.href = response.authorization_url;
        } catch (error) {
            console.error('Payment initialization failed', error);
            alert('Could not start the payment process. Please try again.');
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl p-8 bg-white text-black">
                <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
                {loading ? (
                    <div className="text-center">Loading pricing...</div>
                ) : pricing ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                       <Card className="p-6 text-center border">
                           <h3 className="text-xl font-bold mb-2">One-Time</h3>
                           <p className="text-3xl font-bold mb-4">{pricing.currency} {pricing.prices.ONETIME}</p>
                           <ul className="text-gray-600 mb-4">
                               <li>Single App Build</li>
                               <li>Lifetime Access to Code</li>
                           </ul>
                           <Button onClick={() => handlePayment('ONETIME')}>Select Plan</Button>
                       </Card>
                       <Card className="p-6 text-center border-2 border-fusion-pink">
                           <h3 className="text-xl font-bold mb-2">Monthly</h3>
                           <p className="text-3xl font-bold mb-4">{pricing.currency} {pricing.prices.MONTHLY}/mo</p>
                           <ul className="text-gray-600 mb-4">
                               <li>Unlimited App Builds</li>
                               <li>Continuous Updates</li>
                               <li>Priority Support</li>
                           </ul>
                           <Button onClick={() => handlePayment('MONTHLY')}>Select Plan</Button>
                       </Card>
                       <Card className="p-6 text-center border">
                           <h3 className="text-xl font-bold mb-2">Yearly</h3>
                           <p className="text-3xl font-bold mb-4">{pricing.currency} {pricing.prices.YEARLY}/yr</p>
                           <ul className="text-gray-600 mb-4">
                                <li>All Monthly Features</li>
                                <li>2 Months Free</li>
                           </ul>
                           <Button onClick={() => handlePayment('YEARLY')}>Select Plan</Button>
                       </Card>
                    </div>
                ) : (
                   <div className="text-center text-red-500">Could not load pricing information.</div>
                )}
                <button onClick={onClose} className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded">Close</button>
            </Card>
        </div>
    );
};

export default PaymentModal;
