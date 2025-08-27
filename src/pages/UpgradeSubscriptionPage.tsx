import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const UpgradeSubscriptionPage = () => {
  const plans = [
    { name: 'Monthly', price: '$15/mo', features: ['Unlimited App Builds', 'Continuous Updates', 'Priority Support'], cta: 'Upgrade to Monthly' },
    { name: 'Yearly', price: '$150/yr', features: ['All Monthly Features', '2 Months Free', 'Annual Strategic Review'], cta: 'Upgrade to Yearly' },
  ];

  return (
    <div className="min-h-screen bg-quantum-black text-soft-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Upgrade Your Subscription</h1>
      <p className="text-lg text-gray-400 mb-12 text-center">Unlock the full potential of Applause with a recurring subscription.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {plans.map(plan => (
          <Card key={plan.name} className="p-8 text-center flex flex-col">
            <h2 className="text-2xl font-bold text-ion-blue mb-2">{plan.name}</h2>
            <p className="text-4xl font-bold mb-4">{plan.price}</p>
            <ul className="text-gray-300 mb-6 text-left space-y-2 flex-grow">
              {plan.features.map(feature => <li key={feature} className="flex items-center"><span className="text-fusion-pink mr-2">&#10003;</span> {feature}</li>)}
            </ul>
            <Button variant="primary">{plan.cta}</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpgradeSubscriptionPage;
