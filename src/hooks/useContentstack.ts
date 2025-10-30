import { useQuery } from '@tanstack/react-query';
import { contentstackService, HeroContent, FeatureContent, VideoSectionContent, UseCaseContent, AboutPageContent, CareerPageContent, PricingPlansContent } from '../lib/contentstackService';

// Custom hooks for Contentstack data
export const useHeroContent = () => {
  return useQuery<HeroContent | null>({
    queryKey: ['contentstack', 'hero'],
    queryFn: () => contentstackService.getHeroContent(),
    staleTime: 1 * 60 * 1000, // 1 minute for faster updates
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

export const useFeaturesContent = () => {
  return useQuery<FeatureContent | null>({
    queryKey: ['contentstack', 'features'],
    queryFn: () => contentstackService.getFeaturesContent(),
    staleTime: 1 * 60 * 1000, // 1 minute for faster updates
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

export const useVideoSectionsContent = () => {
  return useQuery<VideoSectionContent[]>({
    queryKey: ['contentstack', 'videoSections'],
    queryFn: () => contentstackService.getVideoSectionsContent(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useUseCasesContent = () => {
  return useQuery<UseCaseContent | null>({
    queryKey: ['contentstack', 'useCases'],
    queryFn: () => contentstackService.getUseCasesContent(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useHomepageContent = () => {
  return useQuery({
    queryKey: ['contentstack', 'homepage'],
    queryFn: () => contentstackService.getHomepageContent(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useAboutPageContent = () => {
  return useQuery<AboutPageContent | null>({
    queryKey: ['contentstack', 'about'],
    queryFn: () => contentstackService.getAboutPageContent(),
    staleTime: 1 * 60 * 1000, // 1 minute for faster updates
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

export const useCareerPageContent = () => {
  return useQuery<CareerPageContent | null>({
    queryKey: ['contentstack', 'career'],
    queryFn: () => contentstackService.getCareerPageContent(),
    staleTime: 1 * 60 * 1000, // 1 minute for faster updates
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

export const usePricingPlansContent = () => {
  return useQuery<PricingPlansContent | null>({
    queryKey: ['contentstack', 'pricing'],
    queryFn: () => contentstackService.getPricingPlansContent(),
    staleTime: 1 * 60 * 1000, // 1 minute for faster updates
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

export const useTrustIndicators = () => {
  return useQuery<Array<{ metric_value: string; label: string }>>({
    queryKey: ['contentstack', 'trustIndicators'],
    queryFn: () => contentstackService.getTrustIndicators(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
