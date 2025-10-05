import React from 'react';

/**
 * SkeletonLoader Component
 *
 * Provides visual loading feedback with animated skeleton screens
 * for different content types (cards, stats, lists, forms)
 *
 * @param {string} type - Type of skeleton: 'card', 'stat', 'list', 'form'
 * @param {number} count - Number of skeleton items to render (default: 1)
 */
const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => index);

  const CardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      {/* Avatar/Icon */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Content lines */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Action button */}
      <div className="mt-4">
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );

  const StatSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="ml-4 flex-1">
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="bg-white border-b border-gray-200 p-4 animate-pulse">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const FormSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      {/* Form field */}
      <div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  const ProfileSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="text-center">
        {/* Profile image */}
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
        {/* Name */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
        {/* Job title */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
        {/* Company */}
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
      </div>
    </div>
  );

  const InfoCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      {/* Header */}
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>

      {/* Info items */}
      <div className="space-y-4">
        <div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  const DealHeaderSkeleton = () => (
    <div className="mb-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Deal name */}
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          {/* Stage and amount */}
          <div className="flex items-center space-x-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
        {/* Edit button */}
        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

  const ChartCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      {/* Chart title */}
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>

      {/* Chart bars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex items-center space-x-3 flex-1 ml-4">
            <div className="h-2 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex items-center space-x-3 flex-1 ml-4">
            <div className="h-2 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex items-center space-x-3 flex-1 ml-4">
            <div className="h-2 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <CardSkeleton />;
      case 'stat':
        return <StatSkeleton />;
      case 'list':
        return <ListSkeleton />;
      case 'form':
        return <FormSkeleton />;
      case 'profile':
        return <ProfileSkeleton />;
      case 'info-card':
        return <InfoCardSkeleton />;
      case 'deal-header':
        return <DealHeaderSkeleton />;
      case 'chart':
        return <ChartCardSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  return (
    <>
      {skeletons.map((index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
