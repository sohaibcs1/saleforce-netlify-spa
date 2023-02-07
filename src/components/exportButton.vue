<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      split
      size="10px"
      class="glossy"
      color="secondary"
      label="Export"
      @click="onMainClick"
    >
      <q-list dense>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section avatar>
            <q-avatar icon="style" size="25px" color="secondary" text-color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Excel</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section avatar>
            <q-avatar icon="font_download" size="25px" color="secondary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>PDF</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>
    <!-- <q-btn size="10px" color="blue" icon="print" class="on-right">Print </q-btn> -->
  </div>``
  
</template>

<script>
export default {
  setup () {
    return {
      onMainClick () {
        // console.log('Clicked on main button')
      },

      onItemClick () {
        // console.log('Clicked on an Item')
      }
    }
  }
}
</script>
