<template>
  <div v-if="show" class="animate-pulse">
    <table class="w-full table table-auto" >
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class=" ">
                    <tr v-for="note in rows"  class="hover:bg-slate-900 opacity-35">
                        <td>
                           <div :style="{ width: Math.random() * 100 + '%' }" class="h-3 my-2 bg-slate-800 rounded-sm"></div>
                        </td>
                        <td class="w-8/12 cursor-pointer" >
                          <div :style="{ width: Math.random() * 100 + '%' }" class="h-3 my-2 w-1/2 bg-slate-800 rounded-sm"></div>
                        </td>
                        <td>
                          <div :style="{ width: Math.random() * 100 + '%' }" class="h-3 my-2 w-1/2 bg-slate-800 rounded-sm"></div>
                        </td>
                        <td>
                          <div class="h-3 my-2 w-1/5 bg-slate-800 rounded-sm"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  show: Boolean,
  rows: {
    type: Number,
    default: 5
  }
});
</script>


