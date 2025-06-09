<template>
  <Card>
    <form @submit="onSubmit" class="w-2/3 space-y-6">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" placeholder="user@example.com" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Passwort</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" placeholder="***********" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit"> Login </Button>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2).max(120).email(),
    password: z.string().min(8)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})
import { toast } from 'vue-sonner'

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values.email, values.password)
  if (authStore.isLoggedIn) {
    await userStore.getMe()
    toast('Erfolgreich eingeloggt!', {
      description: 'blablabla'
    })
    router.push('/main')
  }
})
</script>
