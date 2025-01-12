<template>
  <Card class="overflow-hidden">
    <div class="flex">
      <div class="relative w-1/3 aspect-[3/4]">
        <img
          :src="rentalItem.book.coverImage"
          :alt="rentalItem.book.title"
          class="object-cover h-full w-full"
          loading="lazy"
        />
      </div>

      <CardContent class="w-2/3 p-4 flex flex-col gap-4">
        <div class="space-y-2">
          <CardTitle class="line-clamp-1" :title="rentalItem.book.title">
            {{ rentalItem.book.title }}
          </CardTitle>

          <CardDescription
            v-if="rentalItem.book.subtitle"
            class="line-clamp-1"
            :title="rentalItem.book.subtitle"
          >
            {{ rentalItem.book.subtitle }}
          </CardDescription>

          <div class="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div class="flex items-center gap-1">
              <LucideUser class="w-4 h-4" />
              <span class="truncate" :title="rentalItem.book.author">
                {{ rentalItem.book.author }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <LucideLayers class="w-4 h-4" />
              <span class="truncate" :title="rentalItem.book.categories">
                {{ rentalItem.book.categories || "N/A" }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <LucideBook class="w-4 h-4" />
              <span>{{ rentalItem.book.pageCount || "N/A" }} páginas</span>
            </div>
            <div class="flex items-center gap-1">
              <LucideGlobe class="w-4 h-4" />
              <span>{{
                rentalItem.book.language?.toUpperCase() || "N/A"
              }}</span>
            </div>
          </div>

          <p
            class="text-sm text-muted-foreground line-clamp-2"
            :title="rentalItem.book.description"
          >
            {{ rentalItem.book.description }}
          </p>
        </div>

        <Separator />

        <div class="space-y-2">
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="flex items-center gap-1">
              <LucideUser class="w-4 h-4 text-muted-foreground" />
              <span class="font-medium">Nome:</span>
              <span class="truncate">{{ rentalItem.personalData.name }}</span>
            </div>
            <div class="flex items-center gap-1">
              <LucideMail class="w-4 h-4 text-muted-foreground" />
              <span class="font-medium">Email:</span>
              <span class="truncate">{{ rentalItem.personalData.email }}</span>
            </div>
            <div class="flex items-center gap-1">
              <LucideMapPin class="w-4 h-4 text-muted-foreground" />
              <span class="font-medium">Endereço:</span>
              <span class="truncate">{{
                rentalItem.personalData.address
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <LucideClock class="w-4 h-4 text-muted-foreground" />
              <span class="font-medium">Duração:</span>
              <span>{{ rentalItem.rentalDetails.duration }} dias</span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <span class="font-medium">Total:</span>
              <span class="text-primary ml-1">
                {{ formatPrice(rentalItem.rentalDetails.totalPrice) }}
              </span>
            </div>
            <Button variant="default" @click="renewRental"> Renovar </Button>
          </div>
        </div>
      </CardContent>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import type { RentalData } from "@/types/rental";
import { useRental } from "@/composables/useRental";

defineProps<{
  rentalItem: RentalData;
}>();

const renewRental = () => {
  alert("Renovando aluguel...");
};

const { formatPrice } = useRental();
</script>
