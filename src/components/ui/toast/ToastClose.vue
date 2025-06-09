<script setup lang="ts">
import { ToastClose } from 'radix-vue'
import { XIcon } from 'lucide-vue-next'
import { cn } from '@/utils/'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <ToastClose v-bind="props" :class="cn('absolute right-2 top-2 rounded-md p-1 text-slate-950/50 opacity-0 transition-opacity hover:text-slate-950 focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 hover:group-[.destructive]:text-red-50 focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600 dark:text-slate-50/50 dark:hover:text-slate-50', props.class)">
    <XIcon class="h-4 w-4" />
  </ToastClose>
</template>
