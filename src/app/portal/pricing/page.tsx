import { PortalPricing } from "../components/PortalPricing";

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Programs & Pricing</h1>
        <p className="text-slate-500">Select a membership plan for your child</p>
      </div>
      
      <PortalPricing />
    </div>
  );
}
