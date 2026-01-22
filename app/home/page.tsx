import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
    return (
        <Card>
            <CardContent>
                <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
                    <h1 className="text-5xl font-bold mb-4">Welcome to the Home Page</h1>
                    <p className="text-lg text-gray-700">This is the main landing page of the application.</p>
                </div>
            </CardContent>
        </Card>
    );
}