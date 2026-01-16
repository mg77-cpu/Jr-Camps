import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl max-w-md w-full shadow-xl">
        <div className="flex justify-center mb-6">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The payment process was cancelled. No charges were made. If you had trouble, please try again or contact support.
        </p>
        <div className="space-y-4">
          <Link href="/coming-soon">
            <Button variant="outline" className="w-full h-12 text-lg font-semibold rounded-full">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full h-12 text-lg font-semibold rounded-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
