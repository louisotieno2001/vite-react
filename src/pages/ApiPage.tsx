import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import CodeBlock from '@/components/ui/CodeBlock';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/useAuth';
import { toast } from 'sonner';

const ApiPage: React.FC = () => {
    const { user } = useAuthStore();
    const apiKey = user ? "your-api-key-here" : "log-in-to-get-your-api-key"; // Placeholder

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const pythonCode = `import requests

api_key = "${apiKey}"
headers = {"Authorization": f"Bearer {api_key}"}
response = requests.get("https://api.applaude.com/v1/projects", headers=headers)

print(response.json())`;

    const jsCode = `const apiKey = "${apiKey}";
const headers = { "Authorization": \`Bearer \${apiKey}\` };
fetch("https://api.applaude.com/v1/projects", { headers })
  .then(response => response.json())
  .then(data => console.log(data));`;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">Applaude API</h1>
            <p className="text-lg text-gray-600 text-center mb-10">
                Integrate your applications with our powerful API to automate your workflow.
            </p>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Your API Key</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <code className="text-sm bg-gray-100 p-2 rounded">{apiKey}</code>
                    <Button variant="outline" onClick={() => handleCopy(apiKey)}>Copy Key</Button>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Example: Fetch Projects (Python)</CardTitle>
                </CardHeader>
                <CardContent>
                    <CodeBlock htmlContent={pythonCode} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Example: Fetch Projects (JavaScript)</CardTitle>
                </CardHeader>
                <CardContent>
                    <CodeBlock htmlContent={jsCode} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ApiPage;
