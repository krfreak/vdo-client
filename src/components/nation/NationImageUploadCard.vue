<template>
  <div
    class="shadow-md rounded-xl p-6 space-y-4 border flex flex-col items-center"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <!-- Dropzone -->
    <div
      class="w-full border-2 border-dashed rounded-xl p-6 cursor-pointer transition text-center"
      :class="{
        'border-blue-500': isDragging,
        'border-gray-300': !isDragging
      }"
      @click="openFileDialog"
    >
      <p class="text-sm text-gray-600">
        Ziehe ein Bild hierher oder klicke zum Hochladen
      </p>
      <p class="text-xs mt-2 text-gray-400">
        Erlaubte Formate: .jpg, .jpeg, .png, .gif – Max: 5 MB
      </p>
    </div>

    <!-- Preview -->
    <div v-if="previewUrl" class="mt-4">
      <img :src="previewUrl" alt="Vorschau" class="max-h-40 rounded shadow-md" />
    </div>

    <!-- Error message -->
    <p v-if="errorMessage" class="text-sm text-red-500 mt-2 text-center">
      {{ errorMessage }}
    </p>

    <!-- hidden file select field -->
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/gif"
      class="hidden"
      @change="handleFileSelect"
    />

    <!-- Buttons -->
    <div v-if="selectedFile || nation.imageUri" class="flex gap-4 mt-4">
      <button
        v-if="nation.imageUri"
        class="px-4 py-2 text-white rounded bg-red-600 hover:bg-red-800 cursor-pointer"
        @click="deleteNationImage"
      >
        Bild entfernen
      </button>
      
      <button
        v-if="selectedFile"
        class="px-4 py-2 text-white rounded bg-green-600 hover:bg-green-800 cursor-pointer"
        @click="uploadNationImage"
      >
        {{ nation.imageUri == null ? 'Bild hochladen' : 'Bild ersetzen' }}
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchFromApi, fetchFileFromApi } from '@/utils/fetch'
import router from '@/router'

const props = defineProps<{
  nation: Nation
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isDragging = ref(false)
const errorMessage = ref<string | null>(null)

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif']

function openFileDialog() {
  fileInput.value?.click()
}

const selectedFile = ref<File | null>(null)

function handleFile(file: File) {
  errorMessage.value = null

  if (!ALLOWED_TYPES.includes(file.type)) {
    errorMessage.value = 'Ungültiges Dateiformat.'
    selectedFile.value = null
    previewUrl.value = null
    return
  }

  if (file.size > MAX_SIZE_BYTES) {
    errorMessage.value = 'Die Datei darf maximal 1 MB groß sein.'
    selectedFile.value = null
    previewUrl.value = null
    return
  }

  let oldObjectUrl: string | null = null

  watch(previewUrl, (newUrl) => {
    if (oldObjectUrl) {
      URL.revokeObjectURL(oldObjectUrl)
    }
    oldObjectUrl = newUrl
  })

  selectedFile.value = file

  const reader = new FileReader()
  reader.onload = () => {
    previewUrl.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

onMounted(async () => {
  try {
    if (!props.nation.imageUri) {
      previewUrl.value = null
      return
    } 
    const blob = await fetchFileFromApi(`/nations/${props.nation.id}/image`)
    previewUrl.value = URL.createObjectURL(blob)
  } catch (err) {
    errorMessage.value = 'Fehler beim Laden des Bildes.'
    previewUrl.value = null
  }
})

async function uploadNationImage() {
  if (!props.nation || !selectedFile.value) {
    errorMessage.value = 'Keine Datei ausgewählt.'
    return
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const fileBuffer = await selectedFile.value.arrayBuffer()
    const mimeType = selectedFile.value.type

    await fetchFromApi(`/nations/${props.nation.id}/image`, {
      method: 'POST',
      body: fileBuffer,
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Mime-Type': mimeType,
      },
    })
    router.push(`/nation`)
  } catch (error) {
    errorMessage.value = 'Fehler beim Hochladen.'
  }
}

async function deleteNationImage() {
  try {

    await fetchFromApi(`/nations/${props.nation.id}/image`, {
      method: 'DELETE',
    })
    
    props.nation.imageUri = null
    selectedFile.value = null
    previewUrl.value = null
  } catch (error) {
    
  }
}

</script>
