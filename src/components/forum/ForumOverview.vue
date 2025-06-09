<template>
  <div class="container">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/forum">Startseite</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Forum</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="forum-overview">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Foren</TableHeader>
            <TableHeader>Themen</TableHeader>
            <TableHeader>Letzter Beitrag</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow v-for="forum in forums" :key="forum.id">
            <TableCell>
              <a :href="`/viewforum/${forum.id}`">{{ forum.name }}</a>
            </TableCell>
            <TableCell>{{ forum.topics }}</TableCell>
            <TableCell>{{ forum.lastEntry }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <a :href="`/viewguide/forum`">Forum Hilfe</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Forum } from './typings'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
const props = defineProps({
  forums: {
    type: Array as PropType<Forum[]>,
    default: () => []
  }
})
</script>
