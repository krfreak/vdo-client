<script setup lang="ts">
import { ToastAction, type ToastActionProps } from 'radix-vue'
import { cn } from '@/utils/'

const props = defineProps<ToastActionProps & { class?: string }>()
</script>

<template>
  <ToastAction v-bind="props" :class="cn('inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-slate-100/40 hover:group-[.destructive]:border-red-500/30 hover:group-[.destructive]:bg-red-500 hover:group-[.destructive]:text-slate-50 focus:group-[.destructive]:ring-red-500 dark:border-slate-800 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:focus:ring-slate-300 dark:group-[.destructive]:border-slate-800/40 dark:hover:group-[.destructive]:border-red-900/30 dark:hover:group-[.destructive]:bg-red-900 dark:hover:group-[.destructive]:text-slate-50 dark:focus:group-[.destructive]:ring-red-900', props.class)">
    <slot />
  </ToastAction>
</template>
