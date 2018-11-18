<template>
  <v-toolbar dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Puzzle Tracker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat class="hidden-sm-and-down">Quests</v-btn>
      <v-btn icon left class="pr-2">
        <v-badge
        overlap
          v-model="show"
          color="purple"
        >
          <span slot="badge">6</span>
          <v-icon large color="grey">mail</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon left class="pr-2">
        <v-icon
          large
          color="grey darken-1"
        >
          account_box
        </v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data: () => ({
    show: true
  })
}
</script>