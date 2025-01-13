<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="w-max px-3 gap-2">
        <img :src="currentFlag" :width="20" :height="20" alt="flag" />
        <span class="font-medium">{{ locale.toUpperCase() }}</span>
        <LucideChevronDown class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuItem :disabled="locale === 'br'" @click="setLocale('br')">
        <span class="flex items-center gap-2">
          <img :src="brazilFlag" width="20" height="20" alt="Brazil flag" />
          Português
          <LucideCheck v-if="locale === 'br'" class="h-4 w-4" />
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem :disabled="locale === 'en'" @click="setLocale('en')">
        <span class="flex items-center gap-2">
          <img :src="usaFlag" width="20" height="20" alt="USA flag" />
          English
          <LucideCheck v-if="locale === 'en'" class="h-4 w-4" />
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import brazilFlag from "@/assets/flags/brazil.svg";
import usaFlag from "@/assets/flags/usa.svg";
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();

const currentFlag = computed(() =>
  locale.value === "br" ? brazilFlag : usaFlag
);
</script>
