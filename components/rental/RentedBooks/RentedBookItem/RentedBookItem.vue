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

        <div class="space-y-2">
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="flex items-center gap-1">
              <LucideUser class="w-4 h-4 text-muted-foreground" />
              <span class="font-medium">{{
                t("rental.rentedBooks.details.name")
              }}</span>
              <span class="truncate">{{ rentalItem.personalData.name }}</span>
            </div>
            <div class="flex items-center gap-1">
              <LucideMail class="w-4 h-4 text-muted-foreground" />
              <span class="font-medium">{{
                t("rental.rentedBooks.details.email")
              }}</span>
              <span class="truncate">{{ rentalItem.personalData.email }}</span>
            </div>
            <div class="flex items-center gap-1">
              <LucideMapPin class="w-4 h-4 text-muted-foreground" />
              <span class="font-medium">{{
                t("rental.rentedBooks.details.address")
              }}</span>
              <span class="truncate">{{
                rentalItem.personalData.address
              }}</span>
            </div>
            <div class="flex items-center gap-1">
              <LucideClock class="w-4 h-4 text-muted-foreground" />
              <span class="font-medium">{{
                t("rental.rentedBooks.details.duration")
              }}</span>
              <span
                >{{ rentalItem.rentalDetails.duration }}
                {{ t("rental.rentedBooks.details.days") }}</span
              >
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-sm">
              <span class="font-medium">{{
                t("rental.rentedBooks.details.total")
              }}</span>
              <span class="text-primary ml-1">
                {{ formatPrice(rentalItem.rentalDetails.totalPrice) }}
              </span>
            </div>
            <div class="flex flex-col md:flex-row gap-2 mt-3">
              <Button variant="default" @click="renewRental">
                {{ t("rental.rentedBooks.details.renew") }}
              </Button>
              <Button variant="outline" @click="cancelRental">
                {{ t("rental.rentedBooks.details.cancel") }}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import type { RentalData } from "@/types/rental";
import { useRental } from "@/composables/useRental";

const { t } = useI18n();
const { formatPrice } = useRental();

const props = defineProps<{
  rentalItem: RentalData;
}>();

const rentalItem = props.rentalItem;

const emit = defineEmits(["cancel-rental", "renew-rental"]);

const renewRental = () => {
  if (
    confirm(
      "Tem certeza que deseja renovar o aluguel por mais 7 dias? (sem custo adicional)"
    )
  ) {
    emit("renew-rental", rentalItem.book.id);
  }
};

const cancelRental = () => {
  if (confirm("Tem certeza que deseja cancelar o aluguel?")) {
    emit("cancel-rental", rentalItem.book.id);
  }
};
</script>
