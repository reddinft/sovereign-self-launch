import { PostHog } from 'posthog-node';

let _posthog: PostHog | null = null;

export function getPostHogServer(): PostHog {
  if (!_posthog) {
    _posthog = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_placeholder',
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        flushAt: 1,
        flushInterval: 0,
      }
    );
  }
  return _posthog;
}

export type PricingVariant = 'variant-a' | 'variant-b' | 'variant-c';

export async function getPricingVariant(distinctId: string): Promise<PricingVariant> {
  try {
    const posthog = getPostHogServer();
    const flag = await posthog.getFeatureFlag('pricing-variant', distinctId);
    if (flag === 'variant-a' || flag === 'variant-b' || flag === 'variant-c') {
      return flag as PricingVariant;
    }
  } catch {
    // PostHog not configured yet — fall through to default
  }
  // Default to variant-c (Founder tier — per research brief recommendation)
  return 'variant-c';
}
