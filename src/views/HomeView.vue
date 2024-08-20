<template>
  <div class="container mx-auto">
      <div class="w-4/5 mx-auto py-12 my-5">
          <h1 class="text-white mb-4 text-2xl font-bold sm:text-4xl text-center">
              PayShare
          </h1>

          <div class="mb-3">
              <a href="#" class="border px-3 py-1"><i class="fa-solid fa-plus"></i> Add group</a>
          </div>
          
          <div class="relative overflow-x-auto rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                          <th scope="col" class="px-6 py-3">
                              PayShare Group Name
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="go-to-url cursor-pointer bg-white border-b">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                              Group Name
                          </th>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</template>

<script setup>
</script>
