export const NotificationLoading = () => {
  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-3/4"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
