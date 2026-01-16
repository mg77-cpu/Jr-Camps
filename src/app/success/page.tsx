import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl max-w-md w-full shadow-xl">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your enrollment. You will receive a confirmation email shortly with all the details.
        </p>
        <Link href="/">
          <Button className="w-full h-12 text-lg font-semibold rounded-full">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
