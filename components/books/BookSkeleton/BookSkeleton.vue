<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="n in 8"
        :key="n"
        class="flex flex-col shadow-lg rounded-lg overflow-hidden bg-white"
      >
        <div class="relative bg-gray-200 aspect-[2/3] animate-pulse"></div>
        <div class="p-4">
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          </div>
          <div class="space-y-3 mt-4">
            <div class="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div class="p-4 border-t mt-auto">
          <div class="flex justify-between items-center">
            <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div class="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
