import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-4xl font-bold text-center text-red-600">Unfortunately that seems to be a 404.</h2>

                    <div className="text-center mt-4">
                        <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Click Here to go back.</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}